import React from 'react';


export const Instructions = (props) =>(
    <div style={{opacity: props.opacity,transition: '1s',fontSize: 'calc(10px + 1.5vmin)',zIndex: '200'}}>
        <div className="instructions1">
          <ul >
            <li>
              <img src="./left-arrow.svg" style={{height:'6vmin'}} alt="int1"/>
            </li>
            <li>
              <h1 className="bolder">EFFECT</h1>
            </li>
            <li>
              <img src="./left-arrow.svg" style={{height:'6vmin',transform: 'scaleX(-1)'}} alt="int2"/>
            </li>
          </ul>
        </div>
        <div className="instructions2">
          <ul>
            <li>
              <img src="./left-arrow.svg" style={{height:'6vmin',transform: 'rotate(90deg)'}} alt="int3"/>
            </li>
            <li>
              <h1 className="bolder">S<br/>O<br/>U<br/>N<br/>D<br/>S</h1>
            </li>
            <li>
              <img src="./left-arrow.svg" style={{height:'6vmin',transform: 'rotate(270deg)'}} alt="int4"/>
            </li>
          </ul>
        </div>
      </div>
);