import React from 'react';
import {InstaPost} from './InstaPost/InstaPost';
import { NavBar } from '../NavBar/NavBar';
import './Works.css';
import {firebase} from '../../App';
import text from '../../utils/text';
import {isMobile} from '../../App';

export const Works=(props)=>{

    return (
        <div className='main mainwrapper'>
            {firebase.analytics().logEvent('entered_works')}
            <header>
                <NavBar setLang={props.setLang} lang={props.lang} setPage={props.setPage}/>
            </header>
            <div/>
                <div className='spacer'/>
                <h3>{text.works.concerthead[props.lang]}</h3>
                <p>{text.works.concert[props.lang]}</p> 
                <InstaPost url="https://www.instagram.com/p/BzgX41IhgmB/"/>
                <InstaPost url="https://www.instagram.com/p/By64eY4BuWd/"/> 
                <InstaPost url="https://www.instagram.com/p/Byp51e0BWbi/"/> 
                <h3>{text.works.planthead[props.lang]}</h3>
                <p>{text.works.plant[props.lang]}</p> 
                <iframe title='plant-video-1' width={isMobile?window.innerWidth:window.innerWidth*0.6} height={isMobile?window.innerHeight*0.5:window.innerWidth*0.3} src="https://www.youtube.com/embed/ew1s5GP1vwo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                {/* <InstaPost url="https://www.instagram.com/p/B-GH7ARh8Et/"/>  */}
                <InstaPost url="https://www.instagram.com/p/B0etT2mBFvz/"/> 
                
        </div>
    );
}