import React from 'react';
import {InstaPost} from './InstaPost/InstaPost';
import { NavBar } from '../NavBar/NavBar';
import './Works.css';

export const Works=(props)=>{

    return (
        <div className='main'>
            <header>
                <NavBar setPage={props.setPage}/>
            </header>
            <div/>
                <div className='spacer'/>
                <h3>The Interactive Concert</h3>
                <p>Using their smartphones, the public can play audiovisual instruments made for their phones, allowing them to improvise and play with the band.</p> 
                <InstaPost url="https://www.instagram.com/p/BzgX41IhgmB/"/>
                <InstaPost url="https://www.instagram.com/p/By64eY4BuWd/"/> 
                <InstaPost url="https://www.instagram.com/p/Byp51e0BWbi/"/> 
                <h3>The Interactive Plant</h3>
                <p>Using a special sensor, the plant allows people to play interactive music compositions written for it. It accompanied by LED lights for visual effect</p> 
                <InstaPost url="https://www.instagram.com/p/B0etT2mBFvz/"/> 
                <InstaPost url="https://www.instagram.com/p/Bpn3sfyFosm/"/> 
        </div>
    );
}