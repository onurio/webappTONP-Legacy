import React from 'react';
import {NavBar} from '../NavBar/NavBar';
import './Play.css';



export const Play =(props)=>{

    return (
        <div className='main'>
            <header>
                <NavBar setPage={props.setPage}/>
            </header>
            <div className="gameContainer">
                <div onClick={(e)=>props.setPage('sampler')} className="game sampGame"><h1 className="gameName" >Drum Sampler</h1></div>
                <div onClick={(e)=>props.setPage('five')} className="game fiveGame"><h1 style={{fontSize:'16vmin'}} className="gameName" >5</h1></div>
            </div>
        </div>
    );
}