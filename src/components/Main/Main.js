import React,{useEffect,useState} from 'react';
import './Main.css';
import {NavBar} from '../NavBar/NavBar';
import {HeadAnimation} from '../HeadAnimation/HeadAnimation';
import {Heading} from '../Heading/Heading';
import {pixelRatio} from '../HeadAnimation/HeadAnimation';
import { isMobile } from '../../App';
import Tone from 'tone';





var panner = new Tone.AutoPanner(1).toMaster();
panner.depth.value = 0.5;
// panner.gain = 0.3;
panner.start();
var autoWah = new Tone.AutoWah(15, 6, -25).chain(panner);
autoWah.Q.value = 5;

//a polysynth composed of 6 Voices of Synth

let synth = new Tone.PolySynth(6, Tone.FMSynth, {
  oscillator : {
        type : "sine"
    },
}).connect(autoWah);
synth.volume.value = -10;
//set the attributes using the set interface
synth.set({
	"envelope" : {
    "attack" : 0.3,
    decay : 0.4 ,
    sustain : 1 ,
    release : 1

	}
});



let heading = <HeadAnimation/>;

export const Main=(props)=>{
  const [chordCount,setChordCount] = useState(0);

  useEffect(()=>{
    if(pixelRatio <= 2 && isMobile)
    {
      heading = <Heading onClick={playChord} onRelease={stopChord} />;
    }
    else
    {
      heading= <HeadAnimation onClick={playChord} onRelease={stopChord} height={300} width={600}/>
    }
  });

  const playChord=()=>{
    synth.triggerAttack(['C4','G4','Eb5','Bb4'],undefined,0.4);
  }

  const stopChord=()=>{
    synth.triggerRelease(['C4','G4','Eb5','Bb4']);
  }

  return( 
    <div className="main">
          <header>
            <NavBar setPage={props.setPage}/>
          </header>
          {heading}
          <button className="button" onClick={()=>{
            props.setPage('play');
            }}>Play!</button>
          <p>An interactive music project by musician, composer and programmer Omri Nuri.</p>
          {/* <button className='button'onClick={()=>{props.setPage('fournotes')}}>New game</button> */}
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