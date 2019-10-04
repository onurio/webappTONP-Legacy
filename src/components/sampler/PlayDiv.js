import React from 'react';
import {isMobile} from '../../App';



export function PlayDiv(props)
{

    const divStyle = {
        backgroundColor: props.backgrounds[props.bg].color ,
        height: '25%',
        backgroundImage: props.backgrounds[props.bg].url,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        zIndex: '1',
        userSelect: 'none',
        WebkitUserSelect:'none',
        WebkitTouchCallout:'none',
        WebkitTapHighlightColor:'rgb(0,0,0,0)'
    }

    

    const onClick=(e)=>{
        let width;
        if(isMobile)
        {
            width=e.touches[e.touches.length-1].clientX;
        }
        else
        {
            width=e.clientX;
        }
        props.onClick(props.sampleNumber,props.bg,width);
    }

    const handleTouchEnd=(e)=>{
        if(e.touches.length===1)
        {
            return;
        }
        props.onRelease();
    }

    if(isMobile)
    {
        return <div  onTouchStart={(e)=>{onClick(e)}} style={divStyle} onTouchEnd={(e)=>{handleTouchEnd(e)}}/>
    }
    else
    {
        return <div onMouseDown={(e)=>{onClick(e)}}  style={divStyle} onMouseUp={(e)=>{props.onRelease()}}/>
    }

}

