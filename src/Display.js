import React from 'react';
import DisplayText from './DisplayText'

const Display =({equation, answer}) => (
  <div id="display-id">
    <div id="display-screen">
      <DisplayText align='left' logic={equation}/>
      <DisplayText align='right' logic={answer || '0'} />
    </div>
  </div>
)


export default Display;