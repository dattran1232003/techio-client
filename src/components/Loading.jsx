import React from 'react'
import { Segment, Loader, Dimmer } from 'semantic-ui-react'

const Loading = () =>
  <Segment style={{ width: '100%', border: 'none' }}>
    <Dimmer active inverted>
      <Loader size='medium'>Loading</Loader>
    </Dimmer>

    <div style={{ flexGrow: '3', width: '100%', height: '30vh', border: 'none' }}></div>
  </Segment>

export default Loading
