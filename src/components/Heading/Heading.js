import React,{useState} from 'react';


export const Heading =(props)=>{
    const [size,setSize] = useState("calc(10vmin)");

    const onClick=()=>{
        setSize("calc(8vmin)")
        props.onClick();
    }

    const onRelease=()=>{
        props.onRelease();
        setSize("calc(9vmin)");
    }

    return (
        <div className='title' style={{height: '18vh'}} onTouchStart={(e)=>{onClick()}} onTouchEnd={(e)=>{onRelease()}}>
            <h1 style={{fontSize: size}}>THE</h1><h1 style={{fontSize: size}}>OMRI <br/>NURI</h1><h1 style={{fontSize: size}}>PROJECT</h1>
        </div>
    );
}