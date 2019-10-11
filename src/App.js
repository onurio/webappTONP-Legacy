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


const effectMapping = {
  play: 'C3',
  main: 'D3',
  works: 'E3',
  info: 'F3'
}

export let isMobile = (window.screen.width < 768);


function App() {
  const [page,setPage] = useState('main');
  const [soundEffects,setSoundEffects] = useState(undefined);
  const [areEffectsLoaded,setAreEffectsLoaded] = useState(false);

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
  },[])



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
          <Sampler setPage={handlePageChange}/>
        </div>
      );
    case 'main':
      return (
        <div className="App">
          <Main setPage={handlePageChange}/>
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
    // case 'fournotes':
    //   return(
    //     <div className="App">
    //       <FourNotes setPage={handlePageChange}/>
    //     </div>
    //   );
  }

}

export default App;
