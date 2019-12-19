import React from 'react'
import {FingerArp} from './FingerArp';
import {isMobile} from '../../App';
import {NavBar} from '../NavBar/NavBar';


export const FingerArpContainer=(props)=>{
    switch (isMobile){
        case true:
            return(
                <FingerArp setPage={props.setPage}/>
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
                        <a href='#otherGame' style={{color:'aqua',textDecoration:'underline',cursor:'pointer'}} onClick={(e)=>props.setPage('sampler')}>other game!</a>
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