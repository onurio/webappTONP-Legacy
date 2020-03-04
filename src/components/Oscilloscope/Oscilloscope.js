import React, { useRef, useEffect } from 'react';
import Tone from 'tone';
import { useState } from 'react';
import './Oscilloscope.css';
import {easeOutQuad,streamSmoother} from '../../utils/utils';
import {isMobile} from '../../App';
import {Link} from 'react-router-dom';
import {firebase} from '../../App';

var waveform = new Tone.Analyser('waveform',512);

var reverb = new Tone.JCReverb(0.8).chain(waveform).toMaster();
var delay = new Tone.FeedbackDelay(0.4).connect(reverb);
delay.maxDelay  = 5;
delay.wet.value = 0.5;
reverb.wet.value = 0.1;


let startTime;
var omniOsc = new Tone.OmniOscillator("C#4", "amsine").connect(delay);;
omniOsc.volume.value = -10;
omniOsc.modulationType = 'triangle';



// synth.oscillator.type = 'sine';
let canvasCtx;
let streamY = [];
export const  Oscilloscope=(props)=> {
  const canvas = useRef(null);
  const [synth,setSynth] = useState(1);
  const [inst,setInst] = useState(999);
  const [motionState,setMotionState] = useState(false);

  useEffect(()=>{
    canvasCtx = canvas.current.getContext("2d");
    draw();
  });





  useEffect(()=>{
    window.addEventListener('devicemotion',(e)=>{handleMotion(e)});
    startTime = Date.now();
  },[]);

  function draw() {
    requestAnimationFrame(draw);
    var waveArray = waveform.getValue();
    canvasCtx.fillStyle = "#000000";
    canvasCtx.lineWidth = 1.5;
    canvasCtx.clearRect(0, 0, window.innerWidth*2, window.innerHeight*2);
    canvasCtx.beginPath();
    for (var i = 0; i < waveArray.length; i++) {
      let x= (i/waveArray.length)*(window.innerWidth*2);
      if (i === 0) {
        canvasCtx.moveTo(0,(window.innerHeight)+ waveArray[i]);
      } else {
        canvasCtx.lineTo(x, (window.innerHeight)+waveArray[i]*400);
      }
    }
    canvasCtx.stroke();
  }

  const handleMove=e=>{
    let x,y;
    if(isMobile){
      x=(e.touches[0].clientX/window.innerWidth);
      y=100+(e.touches[0].clientY/window.innerHeight)*1000;
      
    }else{
      x = (e.clientX/window.innerWidth);
      y = 100+(e.clientY/window.innerHeight)*1000;
    }
    switch(synth){
      case 1:
        if(!motionState){
            omniOsc.harmonicity.value = x*0.1;
            omniOsc.frequency.value = y;
        }
        break;
      case 2:
        if(!motionState){
            omniOsc.harmonicity.value = x*2;
            omniOsc.frequency.value = y;
        }
        break;
      default:
        return;
    }
  }

  const handleStart=e=>{
    let x,y;
    if(isMobile){
      x=(e.touches[0].clientX/window.innerWidth);
      y=100+(e.touches[0].clientY/window.innerHeight)*1000;
      
    }else{
      x = (e.clientX/window.innerWidth);
      y = 100+(e.clientY/window.innerHeight)*1000;
    }
    switch(synth){
      case 1:
        if(!motionState){
            omniOsc.harmonicity.value = x*0.1;
            omniOsc.frequency.value = y;
        }
        
        break;
      case 2:
        if(!motionState){
            omniOsc.harmonicity.value = x*2;
            omniOsc.frequency.value = y;
        }
        break;
      default:
        return;
    }
    
    omniOsc.start();
  }

  const handleEnd=e=>{

    if(isMobile){
      if(e.touches.length===0&&omniOsc.state==='started'){
        
        omniOsc.stop();
      } 
    } else {
      if(omniOsc.state==='started'){
        omniOsc.stop();

      }
    }
  }

  const handleDelayChange=e=>{
    delay.feedback.value = e.target.value/100;
  }

  const handleMotion = (e) =>{
    let y = Math.abs(e.accelerationIncludingGravity.y);
    let x = Math.abs(e.accelerationIncludingGravity.x);
    // console.log(x);
    
    if(streamY.length<20){
        streamY.unshift(y);       
        // streamX.unshift(x);  
    }else{
        streamY.pop();
        streamY.unshift(y);
        y = (streamSmoother(streamY))/10;

    }
    y=easeOutQuad(y);
    x = easeOutQuad(x);
    omniOsc.harmonicity.value = x*0.01;
    omniOsc.frequency.value = 200+y*2000;

  };


  return (
    <div className="main" 

    style={{backgroundColor:'white'}}
                onTouchStart={e=>{
                if (typeof DeviceMotionEvent.requestPermission === 'function') {
                    DeviceMotionEvent.requestPermission().then(permissionState => {
                        if (permissionState === 'granted') {
                            window.addEventListener('devicemotion', (e) => {handleMotion(e)});
                            setMotionState(true);
                        }   
                     }).catch(console.error);
                } else {
                    window.addEventListener('devicemotion', (e) => {handleMotion(e)});
                    // handle regular non iOS 13+ devices
                }
                }}
    
    >
      <div style={{position:'absolute',top:20,left:20,display:'flex',alignItems:'center',flexDirection:'row'}}>
      <button onClick={e=>{setSynth(1);omniOsc.type='amsine';omniOsc.modulationType='triangle'}} style={{borderRadius:6,border: '1px solid black',padding:5,marginLeft:5,fontSize:25,backgroundColor: synth===1 ?'#4CAF50':'white'}}>
        AM
      </button>
      <button onClick={e=>{setSynth(2);omniOsc.type='fmtriangle'}} style={{borderRadius:6,border: '1px solid black',padding:5,marginLeft:5,fontSize:25,backgroundColor:synth=== 2? '#4CAF50':'white'}}>
        FM
      </button>
      <input onChange={e=>handleDelayChange(e)} id='slider' type="range" min="0" max="100" defaultValue="0.5" ></input>
      <h4 style={{color:'black'}}>DELAY</h4>
      </div>
      <h5 style={{position:'absolute',color:'black',top:100}}>{motionState ? 'Device Motion Enabled!' : null}</h5>
      <canvas 
      onTouchStart={e=>{handleStart(e)}}  
      onTouchMove={e=>handleMove(e)} 
      onTouchEnd={e=>handleEnd(e)}
      onMouseMove={e=>!isMobile ? handleMove(e) : null} 
      onMouseDown={e=>!isMobile ? handleStart(e):null} 
      onMouseUp={e=>!isMobile ? handleEnd():null}
      
      ref={canvas}  style={{width:window.innerWidth,height:window.innerHeight-20}} width={window.innerWidth*2} height={window.innerHeight*2} id='oscilloscope'/>
      <Link to='/play'>
          <h1 style={{color:'black',position: 'absolute',bottom: 20,left:0,zIndex:800}} onTouchStart={(e)=>{props.setPage('play');setTimeout(()=>{omniOsc.stop();delay.feedback.value=0},0);firebase.analytics().logEvent('oscilloscope_time_played',Date.now()-startTime)}}>exit</h1>
      </Link>
      <h1 style={{position: 'absolute',bottom: 20,right:0,zIndex:800,color:'black',border: '1px solid',borderColor:'black',padding: '0 15px',borderRadius:'100%'}} onClick={(e)=>{setInst('999');firebase.analytics().logEvent('watched_instructions')}}>?</h1>
      <div style={{zIndex:inst,position:'absolute',height:'100vh',backgroundColor:'white',padding:'0 3vmin',color:'black'}} onClick={(e)=>{setInst('-1')}} className="instructions_five" >
                <h2 style={{textAlign:'center'}}>No sound? Disable silent mode<br/><br/>{isMobile ? 'Touch the screen to enable the motion sensor!': null }<br/><br/>Touch the screen to play sounds, {motionState ? 'move your device to change the sounds' : 'move your finger on the screen to change the sounds'} <br/><br/>Use the controls on the top left side to change the sound and effect</h2>
      </div>
    </div>
  );
}