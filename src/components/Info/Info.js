import React from 'react'
import {NavBar} from '../NavBar/NavBar'
import './Info.css';
import facebookIcon from '../../images/facebook.svg'
import youtubeIcon from '../../images/youtube.svg';
import instagramIcon from '../../images/instagram.svg';
import githubIcon from '../../images/github.svg';
import {firebase} from '../../App';
import text from '../../utils/text';


export const Info = (props)=>{
    return(
        <div className='main'>
            {firebase.analytics().logEvent('entered_info')}
            <header>
                <NavBar setLang={props.setLang} lang={props.lang} setPage={props.setPage}/>
            </header>
            <div className='spacer'/>
            <p>{text.info.short[props.lang]}</p>
            <h3>{text.info.biohead[props.lang]}</h3>
            <p>{text.info.bio[props.lang]}</p>
            <h3>{text.info.collabhead[props.lang]}</h3>
            <p>{text.info.collab[props.lang]}</p>
            <h3>{text.info.contacthead[props.lang]}</h3>
            <p>{text.info.contact[props.lang]}</p>
            <h4>{text.info.presskit[props.lang]}</h4>
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