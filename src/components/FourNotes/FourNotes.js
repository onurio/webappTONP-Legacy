import React,{useState,useEffect} from 'react';
import {Button} from './Button/Button';
import {isMobile} from '../../App';
import './FourNotes.css';
import {FingerPos} from './FingerPos/FingerPos';

const divStyle = {
    height: '100%',
    width:'50%',
    userSelect: 'none',
    WebkitTapHighlightColor:'rgb(0,0,0,0)',
    WebkitUserSelect:'none',
    WebkitTouchCallout:'none',
    outline: 'none'
}

// let fingers;

export const FourNotes=(props)=>{
    const [touchesInAction,setTouchesInAction] = useState({});
    const [currentTouchX,setCurrentTouchX]=useState(undefined);
    const [currentTouchY,setCurrentTouchY]=useState(undefined);
    const [currentPressed,setCurrentPressed]=useState(undefined);
    const [fingers,setFingers] = useState(undefined);

    const touchStartHandler =(event)=> {
        var touches = event.changedTouches;
        var touchesInActionNew = {};
        for(var j = 0; j < touches.length; j++) {
    
             /* store touch info on touchstart */
             touchesInActionNew[ touches[j].identifier ] = {
    
                identifier : touches[j].identifier,
                pageX : touches[j].pageX,
                pageY : touches[j].pageY
             };
        }
        setTouchesInAction(touchesInActionNew);
    }


    useEffect(()=>{
        // if (touchesInAction[0]!== undefined)
        console.log(fingers);
        setFingers(Object.keys(touchesInAction).map((touch)=>{
            // setCurrentTouchX(touchesInAction[0].pageX);
            // setCurrentTouchY(touchesInAction[0].pageY);
            return (
                <li key={touch.toString()} style={{listStyle: 'none'}} >
                    <FingerPos currentTouchX={touchesInAction[touch].pageX} currentTouchY={touchesInAction[touch].pageY} />
                </li>
            );
            
            
        }));
        // console.log(fingers);
    },[touchesInAction])

    // useEffect(()=>{
    //     if (touchesInAction[0]!== undefined)
    //     {
    //     // console.log(Object.keys(touchesInAction));
    //     setCurrentTouchX(touchesInAction[0].pageX);
    //     setCurrentTouchY(touchesInAction[0].pageY);
    //     let currentElement = document.elementsFromPoint(touchesInAction[0].pageX,touchesInAction[0].pageY)[1];
    //     if(currentElement!==undefined)
    //     {
    //         setCurrentPressed(currentElement.id)
    //     }
    //     }
    // },[touchesInAction,currentTouchX,currentTouchY]);

    if (isMobile){
        return(
            <div style={{height: '100%',display:'flex',width: '100%'}}>
                {fingers}
                {/* <div className='touch' style={{left:`calc(${currentTouchX}px - 7.5vmin)`,top:`calc(${currentTouchY}px - 7.5vmin)`}}/> */}
                <div style={divStyle}>
                    <Button id='1' currentPressed={currentPressed} onTouchMove={touchStartHandler} onTouchStart={touchStartHandler} className={'red'}/>
                    <Button id='2' currentPressed={currentPressed} onTouchMove={touchStartHandler} onTouchStart={touchStartHandler} className={'blue'}/>
                </div>
                <div style={divStyle}>
                    <Button id='3' currentPressed={currentPressed} onTouchMove={touchStartHandler} onTouchStart={touchStartHandler} className={'green'}/>
                    <Button id='4' currentPressed={currentPressed} onTouchMove={touchStartHandler} onTouchStart={touchStartHandler} className={'yellow'}/>
                </div>
            </div>
        );
    }
}


