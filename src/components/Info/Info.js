import React from 'react'
import {NavBar} from '../NavBar/NavBar'
import './Info.css';
import facebookIcon from '../../images/facebook.svg'
import youtubeIcon from '../../images/youtube.svg';
import instagramIcon from '../../images/instagram.svg';
import githubIcon from '../../images/github.svg';

export const Info = (props)=>{
    return(
        <div className='main'>
            <header>
                <NavBar setPage={props.setPage}/>
            </header>
            <div className='spacer'/>
            <p>The Omri Nuri Project, explores interactive music from differents perspectives.</p>
            <h3>Bio</h3>
            <p>Omri, was born in Israel, where at an early age he began to get involved in jazz and improvisation. He was very interested in the interaction he shared with other musicians when he improvised and was fascinated by the idea that music acts as a language.
            Years later, he moved to New York in order to continue his studies for a period of two years. It is in that city when he begins to investigate this new idea using the tools that technology offers.
            </p>
            <h3>Contact</h3>
            <p>For booking, concerts, custom interactive music experiences (for companies, schools, galleries and more)</p>
            <h4>Presskit</h4>
            <div style={{marginBottom:'5vmin'}} >
                <a style={{marginRight: '2vmin'}} href='./Presskit-English.pdf' download>English</a>
                <a href='./Presskit-Español.pdf' download>Español</a>
            </div>
            <a href="mailto:theomrinuriproject@gmail.com">email</a>
            <div className='socialmedia_icons2'>
                <ul>
                    <li><a href='http://www.instagram.com/omrinuri' rel="noopener noreferrer" target="_blank" ><img className="social_icon"  alt='instagram' src={instagramIcon}/></a></li>
                    <li><a href="https://www.facebook.com/theomrinuriproject" rel="noopener noreferrer" target="_blank" ><img className="social_icon" alt='facebook' src={facebookIcon} /></a></li>
                    <li><a href="https://www.youtube.com/channel/UCWTtkU868XGUQy0uMJt71kA" rel="noopener noreferrer" target="_blank" ><img className="social_icon" alt='youtube' src={youtubeIcon} /></a></li>
                    <li><a href="https://github.com/onurio" rel="noopener noreferrer" target="_blank" ><img className="social_icon" alt='github' src={githubIcon} /></a></li>
                </ul>
            </div>
            <div className="space"/>
        </div>
    );
}