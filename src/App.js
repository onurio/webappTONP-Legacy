import React,{useState,useEffect} from 'react';
import {Sampler} from './components/sampler/Sampler';
import './App.css';
import {Main} from './components/Main/Main';
import {Info} from './components/Info/Info';
import {Works} from './components/Works/Works';
import {FourNotes} from './components/FourNotes/FourNotes';
import Tone from 'tone';
import e1 from '../src/audio/1.wav';
import kick from '../src/audio/Kick.mp3';
import rim from '../src/audio/rim.mp3';
import tom from '../src/audio/tom.mp3';
import {Play} from './components/Play/Play';
import { FingerArpContainer } from './components/FingerArp/FingerArpContainer';


const effectMapping = {
  play: 'C3',
  main: 'D3',
  works: 'E3',
  info: 'F3'
}


export let isMobile = (window.screen.width < 780);
export let isIphone = navigator.userAgent.indexOf("iPhone") !== -1 ;


var autoPanner = new Tone.AutoPanner(1).toMaster();
    autoPanner.depth.value = 0.5;
    autoPanner.start();
    var autoWah = new Tone.AutoWah(15, 6, -25).chain(autoPanner);
    autoWah.Q.value = 5;
    let chillSynth = new Tone.PolySynth(6, Tone.FMSynth, {
      oscillator : {
            type : "sine"
        },
    }).connect(autoWah);
    chillSynth.volume.value = -10;
    chillSynth.set({
      "envelope" : {
        "attack" : 0.3,
        decay : 0.4 ,
        sustain : 1 ,
        release : 1

      }
    });


function App() {
  const [page,setPage] = useState('main');
  const [soundEffects,setSoundEffects] = useState(undefined);
  const [areEffectsLoaded,setAreEffectsLoaded] = useState(false);

  const preventZoom=(e)=>{
    e.preventDefault();
    document.body.style.zoom = 0.999999;
  }

  useEffect(()=>{
    const newSoundEffects = new Tone.Sampler({
      "C3" : e1,
      "D3" : kick,
      "E3" : rim,
      "F3" : tom
    }, function(){
      setAreEffectsLoaded(true);
    }).toMaster();
    setSoundEffects(newSoundEffects);
    document.addEventListener('gesturestart', (e)=>preventZoom(e));
    document.addEventListener('gesturechange', (e)=>preventZoom(e));
    document.addEventListener('gestureend', (e)=>preventZoom(e));
    return (()=>{
      document.removeEventListener('gestureend',(e)=>preventZoom(e));
      document.removeEventListener('gesturechange', (e)=>preventZoom(e));
      document.removeEventListener('gestureend', (e)=>preventZoom(e));
    });
  },[])


  const playChord=()=>{
    chillSynth.triggerAttack(['F#4','A4','C#5','E4'],undefined,0.4);
  }

  const stopChord=()=>{
    chillSynth.triggerRelease(['F#4','A4','C#5','E4']);
  }


  const handlePageChange=(page)=>{
    setPage(page);
    if (areEffectsLoaded && effectMapping[page] !== undefined)
    {
      soundEffects.triggerAttack(effectMapping[page])
    }
  }

  switch(page) {
    default:
        return (
          <div className="App" style={{}}>
            <Main setPage={handlePageChange}/>
          </div>
        );
    case 'play':
      return (
        <div className="App" >
          <Play setPage={handlePageChange}/>
        </div>
      );
    case 'main':
      return (
        <div className="App">
          <Main setPage={handlePageChange} playChord={playChord} stopChord={stopChord} />
        </div>
      );
    case 'five':
      console.log('asdf'+isMobile);
      return (
        <div className="App">
          <FingerArpContainer setPage={handlePageChange} />
        </div>
      );
    case 'sampler':
      return (
        <div className="App">
          <Sampler setPage={handlePageChange} />
        </div>
      );
    case 'info':
      return (
        <div className="App">
          <Info setPage={handlePageChange}/>
        </div>
      );
    case 'works':
      return(
        <div className="App">
          <Works setPage={handlePageChange}/>
        </div>
      );
    case 'fournotes':
      return(
        <div className="App">
          <FourNotes setPage={handlePageChange}/>
        </div>
      );
  }

}

export default App;
