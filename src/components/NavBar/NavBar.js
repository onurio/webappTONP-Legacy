import React,{useState, useEffect} from 'react';
import './NavBar.css';
import {isMobile} from '../../App';
import logo from '../../images/logo.svg';
import {Link} from 'react-router-dom';
import './Toggle.css';
import text from '../../utils/text';


export const NavBar =(props)=> {
    const [logoSize,setLogoSize] = useState(30);
    
    const logoClick =()=>{
        setLogoSize(22);
        props.setPage('main')
    }
    
    const logoRelease =()=>{
        setLogoSize(30);
    }

    useEffect(()=>{
        switch(props.lang){
            case 'EN':
                document.getElementById("english").checked = true;
                break;
            case 'ES':
                document.getElementById("spanish").checked = true;
                break;
            case 'HE':
                document.getElementById("hebrew").checked = true;
                break;
            default:
                return;
        }
    },[props.lang])


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
                            <li className='navItem' onTouchStart={(e)=>{props.setPage('works')}}  onMouseDown={(e)=>{if(!isMobile){props.setPage('works')}}}>{text.navbar.works[props.lang]}</li>
                        </Link>
                        <Link className='no_link_decoration' to='/play'>
                            <li className='navItem' onTouchStart={(e)=>{props.setPage('play')}} onMouseDown={(e)=>{if(!isMobile){props.setPage('play')}}}>{text.navbar.play[props.lang]}</li>
                        </Link>
                        <Link className='no_link_decoration' to='/info'>
                            <li className='navItem' onTouchStart={(e)=>{props.setPage('info')}} onMouseDown={(e)=>{if(!isMobile){props.setPage('info')}}}>{text.navbar.info[props.lang]}</li>
                        </Link>
                    </ul>
                    

                </div>
                <div id='nav-spacer'  style={{flexGrow:'1'}} />
                <div className="switch-toggle switch-3 switch-candy" style={{width:isMobile?'25vmin':'20vmin'}}>
                        <input  id="english" name="state-d" type="radio"  />
                        <label onClick={e=>props.setLang('EN')} htmlFor="english"  >EN</label>

                        <input id="spanish" name="state-d" type="radio" />
                        <label onClick={e=>props.setLang('ES')} htmlFor="spanish" defaultChecked='checked' >ES</label>

                        <input id="hebrew" name="state-d" type="radio"  />
                        <label onClick={e=>props.setLang('HE')} htmlFor="hebrew" >עב</label>

                        <a href='sadf' style={{backgroundColor:'transparent',border:'1px solid white'}}>{}</a>
            </div>
            </nav>
        </header>
        
    );
}


