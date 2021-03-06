import PropTypes from 'prop-types'
import React, { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import { Menu, Icon, Dropdown, Button } from 'semantic-ui-react'
import { PersistPrevLinkContext } from '../context/persistLinkContext'
import './MenuBar.scss'

function MenuBar() {
  const { pathname } = useLocation()
  // contexts
  const { user, logout } = useContext(AuthContext)
  const { setPrevLink } = useContext(PersistPrevLinkContext) 

  const [activeItem, setActiveItem] = useState('home')
  const handleItemClick = (_, { name }) => setActiveItem(name)

  const RedirectAuthHandle = _ => { 
    !(['login', 'register'].includes(pathname)) && setPrevLink(pathname)
  }  // Memo
  const userAvatarStyle = React.useMemo(() => ({
    padding: 3,
    borderRadius: '50%',
  }), [])

  // Hack to disable warning for Dropdown's text props when passing <img ... /> instead of string
  Object.assign(Dropdown.propTypes, { text: PropTypes.node })

  return (
    <div className='header'>
      <Menu inverted color='black' style={{ height: '4rem', borderRadius: 0 }}>
        <Menu.Item className='header__main-logo' 
          as={Link} to='/posts'
          style={{ cursor: 'pointer' }}
        >
          <span>Techio</span>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item
            as={Link} to='/posts'
            name='home'
            active={activeItem === 'home'} onClick={handleItemClick} 
          >
            <Icon name='home' />
            <span>Home</span>
          </Menu.Item>

          <Menu.Item
            as={Link} to='/posts/new'
            name='write-post'
            active={activeItem === 'write-post'} onClick={handleItemClick} 
          >
            <Icon name='edit' />
            <span>Viết bài</span>
          </Menu.Item>
          <Dropdown item 
            text={ user?.username
              ? <img src={user?.avatarURL} style={userAvatarStyle} /> 
              : 'Menu'
            }>
            <Dropdown.Menu>
              { user.username &&
                <Dropdown.Item 
                  icon='user'
                  as={Link} to={`/profile/${user.username}`}
                  name='profile' text='Trang cá nhân'
                />
              }

              { (!user.username && pathname !== '/register') &&
                <Dropdown.Item className='user-button'
                  icon='signup'
                  as={Link} to='/register' 
                  onClick={RedirectAuthHandle}
                  name='register' text='Đăng ký' 
                />
              }

              { (!user.username && pathname !== '/login') &&
                <Dropdown.Item className='user-button'
                  icon='sign-in alternate' 
                  as={Link} to='/login' 
                  onClick={RedirectAuthHandle}
                  name='login' text='Đăng nhập' 
                />
              }

              { user.username && 
                <Dropdown.Item className='user-button'
                  as={Button} onClick={logout}
                  icon='sign-out alternate' 
                  name='logout' text='Đăng xuất' 
                />
              }
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    </div>
  )
}

export default MenuBar
