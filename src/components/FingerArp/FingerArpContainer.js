import React from 'react'
import {FingerArp} from './FingerArp';
import {isMobile} from '../../App';
import {NavBar} from '../NavBar/NavBar';
import { Link } from 'react-router-dom';


export const FingerArpContainer=(props)=>{
    switch (isMobile){
        case true:
            return(
                <FingerArp lang={props.lang} setPage={props.setPage}/>
            );
        case false:
            return(
                <div className="sorry">
                    <header>
                        <NavBar setPage={props.setPage}/>
                    </header>
                    <h1>Sorry! This game is for mobile Only 
                        <br/><br/>
                        Use your smartphone or try the<br/>
                        <Link className='no_link_decoration' to='/play/sampler'>
                            <a href='#otherGame' style={{color:'aqua',textDecoration:'underline',cursor:'pointer'}} onClick={(e)=>props.setPage('play')}>other game!</a>
                        </Link>
                    </h1>
                </div>
            );
        default:
            return(
                <div className="sorry">
                    <h1>Sorry! This game is for Mobile Only!</h1>
                </div>
            );
    }
}