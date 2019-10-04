import React,{useState} from 'react';
import './NavBar.css';

export const NavBar =(props)=> {
    const [logoSize,setLogoSize] = useState(30);
    
    const logoClick =()=>{
        setLogoSize(22);
    }
    
    const logoRelease =()=>{
        setLogoSize(30);
    }


    return (
        <header className='navbar'>
            <nav className='navbar_navigation'>
                <div></div>
                <div className="logo_container" onMouseDown={(e)=>props.setPage('main')} ><img onMouseUp={(e)=>{logoRelease()}} onMouseDown={(e)=>{logoClick()}} style={{width: `calc(${logoSize}px + 2vmin)`}} className="navbar_logo"  alt='logo' src='./logo.svg' /></div>
                {/* <div className="spacer"/> */}
                <div className="navbar_items">
                    <ul>
                        <li className='navItem' onClick={(e)=>{props.setPage('works')}}>Works</li>
                        <li className='navItem' onClick={(e)=>{props.setPage('play')}}>Play</li>
                        <li className='navItem' onClick={(e)=>props.setPage('info')}>Info</li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}


