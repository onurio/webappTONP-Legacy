import React,{useState} from 'react';
import './NavBar.css';
import {isMobile} from '../../App';
import logo from '../../images/logo.svg';

export const NavBar =(props)=> {
    const [logoSize,setLogoSize] = useState(30);
    
    const logoClick =()=>{
        setLogoSize(22);
        props.setPage('main')
    }
    
    const logoRelease =()=>{
        setLogoSize(30);
    }


    return (
        <header className='navbar'>
            <nav className='navbar_navigation'>
                <div></div>
                <div className="logo_container" >
                    <img 
                    onTouchStart={(e)=>{logoClick()}}
                    onTouchEnd={(e)=>{logoRelease()}}
                    onMouseUp={(e)=>{if(!isMobile){logoRelease()}}} 
                    onMouseDown={(e)=>{if(!isMobile){logoClick()}}} 
                    style={{width: `calc(${logoSize}px + 2vmin)`,userSelect:'none'}} className="navbar_logo"  alt='logo' src={logo} />
                </div>
                {/* <div className="spacer"/> */}
                <div className="navbar_items">
                    <ul>
                        <li className='navItem' onTouchStart={(e)=>{props.setPage('works')}} onMouseDown={(e)=>{if(!isMobile){props.setPage('works')}}}>Works</li>
                        <li className='navItem' onTouchStart={(e)=>{props.setPage('play')}} onMouseDown={(e)=>{if(!isMobile){props.setPage('play')}}}>Play</li>
                        <li className='navItem' onTouchStart={(e)=>{props.setPage('info')}} onMouseDown={(e)=>{if(!isMobile){props.setPage('info')}}}>Info</li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}


