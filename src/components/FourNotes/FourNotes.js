import React,{useState,useEffect} from 'react';
import {Button} from './Button/Button';
import {isMobile} from '../../App';
import './FourNotes.css';

const divStyle = {
    height: '100%',
    width:'50%',
    userSelect: 'none',
    WebkitTapHighlightColor:'rgb(0,0,0,0)',
    WebkitUserSelect:'none',
    WebkitTouchCallout:'none',
    outline: 'none'
}



export const FourNotes=(props)=>{
    const [touchesInAction,setTouchesInAction] = useState({});
    const [currentTouchX,setCurrentTouchX]=useState(undefined);
    const [currentTouchY,setCurrentTouchY]=useState(undefined);

    function touchStartHandler(event) {
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
        if (touchesInAction[0]!== undefined)
        {
        setCurrentTouchX(touchesInAction[0].pageX);
        setCurrentTouchY(touchesInAction[0].pageY);
        }
    },[touchesInAction]);

    if (isMobile){
        return(
            <div style={{height: '100%',display:'flex',width: '100%'}}>
                <div className='touch' style={{left:currentTouchX,top:currentTouchY}}/>
                <div style={divStyle}>
                    <Button onTouchStart={touchStartHandler} className={'red'}/>
                    <Button onTouchStart={touchStartHandler} className={'blue'}/>
                </div>
                <div style={divStyle}>
                    <Button onTouchStart={touchStartHandler} className={'green'}/>
                    <Button onTouchStart={touchStartHandler} className={'yellow'}/>
                </div>
            </div>
        );
    }
}


