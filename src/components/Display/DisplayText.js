import React from 'react';

const Display =({logic, answerLength, displayClass}) => (
  <div className={displayClass} style={{fontSize: (answerLength>18) ? '1.75em' : '2em'}}><bdo dir="ltr">{logic}</bdo></div>
)

export default Display;