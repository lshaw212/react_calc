import React from 'react';

const Display =({text, logic, align}) => (
  <div id="display" style={{textAlign: align}}>{text}{logic}</div>
)


export default Display;