import React from 'react';


export const FingerPos = (props) =>(
    <div className='touch' style={{left:`calc(${props.currentTouchX}px - 7.5vmin)`,top:`calc(${props.currentTouchY}px - 7.5vmin)`}}/>
);