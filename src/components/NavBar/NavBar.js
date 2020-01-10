import React,{useState} from 'react';
import './NavBar.css';
import {isMobile} from '../../App';
import logo from '../../images/logo.svg';
import {Link} from 'react-router-dom';

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
                <Link className='no_link_decoration' to='/'>
                    <div className="logo_container" >
                        <img 
                        onTouchStart={(e)=>{logoClick()}}
                        onTouchEnd={(e)=>{logoRelease()}}
                        onMouseUp={(e)=>{if(!isMobile){logoRelease()}}} 
                        onMouseDown={(e)=>{if(!isMobile){logoClick()}}} 
                        style={{width: `calc(${logoSize}px + 2vmin)`,userSelect:'none'}} className="navbar_logo"  alt='logo' src={logo} />
                    </div>
                </Link>
                
                {/* <div className="spacer"/> */}
                <div className="navbar_items">
                    <ul>
                        <Link className='no_link_decoration' to='/works'>
                            <li className='navItem' onTouchStart={(e)=>{props.setPage('works')}} onMouseDown={(e)=>{if(!isMobile){props.setPage('works')}}}>Works</li>
                        </Link>
                        <Link className='no_link_decoration' to='/play'>
                            <li className='navItem' onTouchStart={(e)=>{props.setPage('play')}} onMouseDown={(e)=>{if(!isMobile){props.setPage('play')}}}>Play</li>
                        </Link>
                        <Link className='no_link_decoration' to='/info'>
                            <li className='navItem' onTouchStart={(e)=>{props.setPage('info')}} onMouseDown={(e)=>{if(!isMobile){props.setPage('info')}}}>Info</li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </header>
    );
}


