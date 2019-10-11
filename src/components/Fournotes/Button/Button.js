import React from 'react';
import './Button.css';



export const Button = (props) =>
{
    return(
    <div className={`note-button `} onTouchStart={(e)=>{props.onTouchStart(e)}} style={{backgroundColor: props.className}}/>
    );
}