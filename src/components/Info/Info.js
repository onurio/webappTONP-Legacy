import React from 'react'
import {NavBar} from '../NavBar/NavBar'
import './Info.css';

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
            Years later, he moved to New York where continue his studies for a period of two years. It is in that city when he begins to investigate this new idea using the tools that technology offers.
            </p>
            <h3>Contact</h3>
            <p>For booking, concerts, custom interactive music experiences (for companies, schools, galleries and more)</p>
            <a href="mailto:theomrinuriproject@gmail.com">email</a>
            <div className='socialmedia_icons2'>
                <ul>
                    <li><a href='http://www.instagram.com/omrinuri' rel="noopener noreferrer" target="_blank" ><img className="social_icon"  alt='instagram' src='./instagram.svg'/></a></li>
                    <li><a href="https://www.facebook.com/theomrinuriproject" ><img className="social_icon" alt='facebook' src='./facebook.svg' /></a></li>
                    <li><a href="https://www.youtube.com/channel/UCWTtkU868XGUQy0uMJt71kA"><img className="social_icon" alt='youtube' src='./youtube.svg' /></a></li>
                </ul>
          </div>
        </div>
    );
}