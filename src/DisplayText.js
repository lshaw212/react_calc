import React from 'react';

const Display =({logic, align}) => (
  <div id="display" style={{textAlign: align}}><bdo dir="ltr">{logic}</bdo></div>
)


export default Display;