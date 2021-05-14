import React from "react"
import { act } from "react-dom/test-utils"
import { render, unmountComponentAtNode } from "react-dom"
import Responsive, { Mobile, Tablet, Laptop } from "./"

let container = null

beforeAll(() => {
  // make window width is rewriteable
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: 1024,
  })
})
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

function resizeWindow(size) {
  window.innerWidth = size
  window.dispatchEvent(new Event("resize"))
}

const resizeWindowThenMount = wdSize => component => {
  act(() => {
    resizeWindow(wdSize)
    render(component, container)
  })
}

it("should show only one text on differences screen width", () => {
  resizeWindowThenMount(320)(
    <Responsive>
      <Responsive.Mobile only>Mobile screen</Responsive.Mobile>
    </Responsive>
  )
  expect(container.textContent).toBe("Mobile screen")

  resizeWindowThenMount(768)(
      <Responsive>
        <Tablet only>Tablet screen</Tablet>
      </Responsive>
  )
  expect(container.textContent).toBe("Tablet screen")

  resizeWindowThenMount(1024)(
      <Responsive>
        <Laptop only>Laptop screen</Laptop>
      </Responsive>
  )
  expect(container.textContent).toBe("Laptop screen")

  resizeWindowThenMount(Infinity)(
    <Responsive>Any screen</Responsive>
  )
  expect(container.textContent).toBe("Any screen")
})

it("should render 2 differences breakpoint at the same screen when not provide 'only' prop", () => {
  resizeWindowThenMount(320)(
    <Responsive>
      <Mobile>Mobile screen</Mobile>
      <Tablet>Tablet screen</Tablet>
    </Responsive>
  )
  expect(container.textContent).toBe('Mobile screen'+'Tablet screen')

  resizeWindowThenMount(768)(
    <Responsive>
      <Tablet>Tablet screen</Tablet>
      <Laptop>Laptop screen</Laptop>
    </Responsive>
  )
  expect(container.textContent).toBe('Tablet screen'+'Laptop screen')

  resizeWindowThenMount(360)(
    <Responsive>
      <Mobile>Mobile screen</Mobile>
      <Tablet only>Tablet screen</Tablet>
      <Laptop>Laptop screen</Laptop>
    </Responsive>
  )
  expect(container.textContent).toBe('Mobile screen'+'Laptop screen')
})

it('should render even screen width gte breakpoint',() => {
  resizeWindowThenMount(720)( // larger than mobile breakpoint
      <Mobile andUp>Mobile and up</Mobile>
  )
  // but it still render
  expect(container.textContent).toBe('Mobile and up')
})
