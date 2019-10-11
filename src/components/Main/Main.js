import React from 'react';
import './Main.css';
import {NavBar} from '../NavBar/NavBar';




export const Main=(props)=>{
  return( 
    <div className="main">
          <header>
            <NavBar setPage={props.setPage}/>
          </header>
          <div className='title'>
            <h1>THE</h1><h1>OMRI <br/>NURI</h1><h1>PROJECT</h1>
          </div>
          <button className="button" onClick={()=>{
            props.setPage('play');
            }}>Play!</button>
          <p>An interactive music project by musician, composer and programmer Omri Nuri.</p>
          {/* <button className='button'onClick={()=>{props.setPage('fournotes')}}>INTERCORP BITCHES</button> */}
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