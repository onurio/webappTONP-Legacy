import React from 'react';
import {NavBar} from '../NavBar/NavBar';
import './Play.css';
import { Link } from 'react-router-dom';



export const Play =(props)=>{

    return (
        <div className='main'>
            <header>
                <NavBar setPage={props.setPage}/>
            </header>
            <div className="gameContainer">
                <Link className='no_link_decoration' to='/play/sampler'>
                    <div onClick={(e)=>props.setPage('play')} className="game sampGame"><h1 className="gameName" >Drum Sampler</h1></div>
                </Link>
                <Link className='no_link_decoration' to='/play/five'>
                    <div onClick={(e)=>props.setPage('play')} className="game fiveGame"><h1 style={{fontSize:'16vmin'}} className="gameName" >5</h1></div>
                </Link>
            </div>
        </div>
    );
}