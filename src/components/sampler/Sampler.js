import React,{ useState, useEffect,useRef} from 'react';
import './Sampler.css';
import Tone from 'tone';
import {PlayDiv} from './PlayDiv';
import nateSmith from '../../audio/nate_smith.mp3'
import {isMobile} from '../../App';
import {Instructions} from './Instructions/Instructions';


const loadingStyle = {
  pointerEvents: 'none',
  backgroundColor:'white',
  borderRadius:15,opacity: 0.7,
  padding: '2vmin 4vmin'
}






const times = {
  1: [47.3,50.7],
  2: [0.45,3.77],
  3: [42.33,45.68],
  4: [148.68,151.94]
}

const pitchShift  = new Tone.PitchShift();


export function Sampler(props){

  const [isPlaying,setIsPlaying] = useState(false);
  const [mouseX,setMouseX] = useState(0);
  const [currentColor,setCurrentColor] = useState('');
  const [currentBackground,setCurrentBackground] = useState('bg1');
  const [width,setWidth] = useState(0);
  const [isLoaded,setIsLoaded] = useState(false);
  const [transition,setTransition] = useState('0.1s');
  const [player,setPlayer] = useState(undefined)
  const [loading,setLoading] = useState('flex');
  const [bgStrokes,setBgStrokes] = useState({bg1: '20',bg2: '7',bg3: '8',bg4: '7'});
  const [position,setPosition] = useState(0);
  const genDiv = useRef(null);
  const [instOpacity,setInstOpacity] = useState(0);
  const [showDeskInst,setShowDeskInst] = useState('none'); 


  let bg1 = {
    color: '#5f7ca6',
    url: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='108' height='108' viewBox='0 0 90 90'%3E%3Ccircle fill='%23000000' cx='45' cy='45' r='${bgStrokes.bg1}'/%3E%3Cg fill='%233e246e' fill-opacity='1'%3E%3Ccircle cx='0' cy='90' r='${bgStrokes.bg1}'/%3E%3Ccircle cx='90' cy='90' r='${bgStrokes.bg1}'/%3E%3Ccircle cx='90' cy='0' r='${bgStrokes.bg1}'/%3E%3Ccircle cx='0' cy='0' r='${bgStrokes.bg1}'/%3E%3C/g%3E%3C/svg%3E")`
  }

  let bg2 = {
    color: '#330033',
    url: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='84' height='84' viewBox='0 0 90 90'%3E%3Ccircle fill='%2306B' cx='45' cy='45' r='10'/%3E%3Cg fill='%23800' fill-opacity='1'%3E%3Ccircle cx='0' cy='90' r='${bgStrokes.bg2}'/%3E%3Ccircle cx='90' cy='90' r='${bgStrokes.bg2}'/%3E%3Ccircle cx='90' cy='0' r='${bgStrokes.bg2}'/%3E%3Ccircle cx='0' cy='0' r='${bgStrokes.bg2}'/%3E%3C/g%3E%3C/svg%3E")`
  }

  let bg3 = {
    color: '#0d1a0c',
    url: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='49' height='49' viewBox='0 0 90 90'%3E%3Ccircle fill='%2338bb64' cx='45' cy='45' r='10'/%3E%3Cg fill='%2323401e' fill-opacity='1'%3E%3Ccircle cx='0' cy='90' r='${bgStrokes.bg3}'/%3E%3Ccircle cx='90' cy='90' r='${bgStrokes.bg3}'/%3E%3Ccircle cx='90' cy='0' r='${bgStrokes.bg3}'/%3E%3Ccircle cx='0' cy='0' r='${bgStrokes.bg3}'/%3E%3C/g%3E%3C/svg%3E")`
  }

  let bg4 = {
    color: '#000000',
    url: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'%3E%3Ccircle fill='%2345bb5d' cx='45' cy='45' r='${bgStrokes.bg4}'/%3E%3Cg fill='%231d1788' fill-opacity='1'%3E%3Ccircle cx='0' cy='90' r='34'/%3E%3Ccircle cx='90' cy='90' r='34'/%3E%3Ccircle cx='90' cy='0' r='34'/%3E%3Ccircle cx='0' cy='0' r='34'/%3E%3C/g%3E%3C/svg%3E")`
  }

  const backgrounds = {
    bg1: bg1,
    bg2: bg2,
    bg3: bg3,
    bg4: bg4
  }

  const keys = {
    a: '1',
    A: '1',
    s: '2',
    S: '2',
    d: '3',
    D: '3',
    f: '4',
    F: '4'
  }

  useEffect(()=>{
    pitchShift.pitch = 5;
    pitchShift.windowSize = 0.02;
    const newPlayer = new Tone.Player(nateSmith,()=>{setTimeout(function(){setIsLoaded(true)},500)}).chain(pitchShift,Tone.Master);
    newPlayer.loop = true;
    newPlayer.fadeOut = 0.015;
    newPlayer.fadeIn = 0.01;
    setPlayer(newPlayer);
    genDiv.current.focus();
    setBgStrokes({bg1: `${Math.round(Math.random()*40 + 10)}`,bg2: `${Math.round(Math.random()*30 + 5)}`,bg3: `${Math.round(Math.random()*40 + 5)}`,bg4: `${Math.round(Math.random()*30 + 5)}`});
    if(!isMobile)
    {
      setShowDeskInst('flex');
    }
  },[]);

  const effect=()=>{
    pitchShift.wet.value = position;
    player.playbackRate = (position*0.75 + 0.75);
  };

  const handleKeyDown=(num)=>{
    onClick(num,`bg${num}`,mouseX);
  }



  //UI Rendering
  

  useEffect(()=>{
    if (isPlaying)
    {
      setPosition(mouseX/window.innerWidth);
      setWidth(mouseX);
      setTransition('0s');
      // setStroke(position*60); for reactive visuals
      // setBgStrokes({[currentBackground]: stroke});
      pitchShift.wet.value = position;
      player.playbackRate = (position*0.75 + 0.75);
    }
    else
    {
      setWidth(0); 
      setTransition('0.2s');
    }
  },[isPlaying,mouseX,width,transition,player,bgStrokes,position,currentBackground])

  useEffect(()=>{
    if(!isPlaying && player !== undefined)
    {
      player.stop();
    }
  },[isPlaying,player]);

 
  const onClick = (sampleNumber,bg,width) =>{
    if (isLoaded && !isPlaying)
    {
      setIsPlaying(true);
      setCurrentColor(backgrounds[bg].color);
      setCurrentBackground(bg);
      setMouseX(width);
      effect();
      player.loopStart = times[sampleNumber][0];
      player.loopEnd = times[sampleNumber][1];
      player.start();
    }
  };


  const onRelease = () =>{
    setIsPlaying(false);
    setWidth(0);
  };

  useEffect(()=>{
    if(isLoaded)
    {
      setLoading('none');
      setInstOpacity(0.7);
      setTimeout(()=>{setInstOpacity(0)},10000)
    }
  },[isLoaded]);

  return (
    <div style={{height: '100%',userSelect: 'none',WebkitTapHighlightColor:'rgb(0,0,0,0)',WebkitUserSelect:'none',WebkitTouchCallout:'none',outline: 'none'}}  tabIndex={0} onKeyUp={(e)=>{onRelease()}} onKeyDown={(e)=>{if(!e.repeat && keys[e.key]!==undefined){handleKeyDown(keys[e.key])}}} ref={genDiv}
      onTouchMove={(e)=>{
        if(isMobile)
        {
          setMouseX(e.touches[0].clientX);
        }
      }} 
      onMouseMove={(e)=>{
        if(!isMobile)
        {
          setMouseX(e.clientX);
        }
      }}>
      <div style={{display:showDeskInst,borderRadius:'15px 0 0 0',justifyContent:'center',position: 'absolute',bottom:0,right:0,backgroundColor:'white',opacity:0.7,width: '15vw'}}>
        <h4 style={{marginBlockStart:'0',marginBlockEnd:'0'}}>click or press A/S/D/F</h4>
      </div>
      <div style={{display: loading,justifyContent: 'center',flexDirection:'column',alignItems: 'center',position: 'absolute' ,width: '100%',height: '100%'}}>
        <h1 style={loadingStyle}>Loading...</h1>
        <h3 style={loadingStyle}>Turn off silent mode!</h3>
      </div>
      <img className='left-arrow' src='./left-arrow.svg' onClick={(e)=>{props.setPage('main')}} alt='back'  />
      <div style={{zIndex:'10',position: 'absolute',height: '100%',left: (width-window.innerWidth),width: '100%',display: 'flex',boxShadow: '  3px 0px 14px 0px rgba(0,0,0,0.38)',backgroundImage: backgrounds[currentBackground].url,backgroundColor:currentColor,justifyContent: 'center',alignItems: 'center',pointerEvents:'none',transition: transition}}>
        <img style={{height: '40vh',zIndex: '100',userSelect:'none',WebkitTapHighlightColor:'rgb(0,0,0,0)',WebkitUserSelect:'none',WebkitTouchCallout:'none',animationName:'spin',animationDuration: `${2000-position*500}ms`,animationIterationCount: 'infinite',animationTimingFunction: 'linear'}} alt="logo" src='./logo.svg'/> 
      </div>
      <a style={{position:"absolute",bottom: '0',margin:'0 1vmin',left: '0',zIndex: '200'}} href="https://github.com/onurio/webappTONP" rel="noopener noreferrer" target="_blank" ><img className="github_link" alt='github' src='./github.svg' /></a>
      <Instructions opacity={instOpacity}/>
      <PlayDiv sampleNumber={'1'} keyP={'A'} backgrounds={backgrounds} bg={'bg1'}   onClick={onClick} onRelease={onRelease} />
      <PlayDiv sampleNumber={'2'} keyP={'S'} backgrounds={backgrounds} bg={'bg2'}  onClick={onClick} onRelease={onRelease}/>
      <PlayDiv sampleNumber={'3'} keyP={'D'} backgrounds={backgrounds} bg={'bg3'}  onClick={onClick} onRelease={onRelease} />
      <PlayDiv sampleNumber={'4'} keyP={'F'} backgrounds={backgrounds} bg={'bg4'}  onClick={onClick} onRelease={onRelease} />
    </div>
  )
};





