import React,{useState,useRef,useEffect} from 'react';
import './Button.css';



export const Button = (props) =>{
    const [active,setActive] = useState('')
    const button = useRef(null);

    useEffect(()=>{
        if (props.currentPressed === button.current.id)
        {
            setActive('current-button');
        }
        else
        {
            setActive('');
        }
    },[setActive,props.currentPressed]);

    return(
    <div ref={button} id={props.id} className={`note-button ${active}`} onTouchMove={(e)=>{props.onTouchMove(e)}} onTouchStart={(e)=>{props.onTouchStart(e)}} style={{backgroundColor: props.className}}/>
    );
}