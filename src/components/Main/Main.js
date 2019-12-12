import React,{useEffect} from 'react';
import './Main.css';
import {NavBar} from '../NavBar/NavBar';
import {HeadAnimation} from '../HeadAnimation/HeadAnimation';
import {Heading} from '../Heading/Heading';
import {pixelRatio} from '../HeadAnimation/HeadAnimation';
import { isMobile } from '../../App';
import {isIphone} from '../../App';





let heading = <HeadAnimation/>;

export const Main=(props)=>{
  // const [count,setCount] = useState(1);

  useEffect(()=>{  
    if(pixelRatio <= 2 && isMobile && !isIphone)
    {
      heading = <Heading onClick={props.playChord} onRelease={props.stopChord} />;
    }
    else
    {
      heading= <HeadAnimation onClick={props.playChord} onRelease={props.stopChord}/>
    }
  });

  

  return( 
    <div className="main">
          <header>
            <NavBar setPage={props.setPage}/>
          </header>
          {heading}
          <button className="button" onClick={()=>{
            props.setPage('play');
            }}>Play!</button>
          <p>An interactive music project by musician, composer and programmer Omri Nuri.</p>
          <button className='button'onClick={()=>{props.setPage('fingerarp')}}>New game</button>
          <div className='socialmedia_icons'>
                <ul>
                    <li><a href='http://www.instagram.com/omrinuri' rel="noopener noreferrer" target="_blank" ><img className="social_icon"  alt='instagram' src='./instagram.svg'/></a></li>
                    <li><a href="https://www.facebook.com/theomrinuriproject" rel="noopener noreferrer" target="_blank" ><img className="social_icon" alt='facebook' src='./facebook.svg' /></a></li>
                    <li><a href="https://www.youtube.com/channel/UCWTtkU868XGUQy0uMJt71kA" rel="noopener noreferrer" target="_blank"><img className="social_icon" alt='youtube' src='./youtube.svg' /></a></li>
                    <li><a href="https://github.com/onurio" rel="noopener noreferrer" target="_blank" ><img className="social_icon"  alt='github' src='./github.svg' /></a></li>
                </ul>
          </div>
    </div>  
    
  );
}