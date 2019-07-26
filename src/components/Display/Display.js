import React from 'react';
import DisplayText from './DisplayText'

const Display =({equation, answer}) => (
  <div id="display-id">
    <div id="calc-name">CASIO</div>
    <div id="display-screen">
      <DisplayText align='left' logic={equation} answerLength="0" displayClass="display display_equation"/>
      <DisplayText align='right' logic={answer || '0'} answerLength={answer.toString().length} displayClass="display display_value"/>
    </div>
  </div>
)


export default Display;