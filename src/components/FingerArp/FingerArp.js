import React,{useState,useEffect} from 'react';
import Tone from 'tone';
import Two from 'two.js';
import {easeInOut,easeOutQuad,findDistance,streamSmoother} from '../../utils/utils';
import {firebase} from '../../App';
import {Link} from 'react-router-dom';
import text from '../../utils/text'; 
let dynamictext = text;

Tone.context.latencyHint = 'interactive';

const limiter = new Tone.Limiter(-3).toMaster();
const filter = new Tone.Filter(2000, "lowpass");
const filter2 = new Tone.Filter(200, "highpass");
const pingPong = new Tone.PingPongDelay("16n", 0.06);
pingPong.wet.value = 0.1;




const makeChords=(chordProg,times,startingPoint)=>{
    let newChords=[];
    for (let i=0;i<times;i++){
        chordProg.forEach((chord)=>{
            let newChord =[];
            chord.forEach((note)=>{
                let newNote = note+i*2+startingPoint;
                newChord.unshift(Tone.Frequency(newNote, "midi").toNote());
            });
            newChords.push(newChord);
        });
    };
    return newChords;
};


let winningSynth = new Tone.PolySynth(6, Tone.Synth, {
    oscillator  : {
        type  : 'triangle'
        }  ,
        envelope  : {
        attack  : 0.2 ,
        decay  : 0.2 ,
        sustain  : 0.1 ,
        release  : 0.1
        }        
  }).chain(pingPong,limiter);
winningSynth.volume.value = -18;

const synth = new Tone.FMSynth().chain(filter,filter2,pingPong,limiter);
synth.modulation.type = 'sine';
synth.oscillator.type = 'triangle';
synth.envelope.attack = 0.2;
synth.envelope.release = 0.04;
synth.volume.value = 10;

let pattern = new Tone.Pattern(function(time, note){
    synth.triggerAttack(note);
}, [],);

const levelGenerator =()=>{
    let levels = [];
    for(let i=0;i<50;i++){
        levels.push([Math.floor(Math.random()*4)+2,Math.round(Math.random()*230+70)]);
    }
    return levels;
}

let levels = levelGenerator();
let winning = false;
let interval = null;
let stream = [];
let circles = [];
let oneDominanteProg = [[1,8,15,17,22],[1,6,10,16,20],[3,8,12,17,22],[1,8,11,17,22]];
let chords = makeChords(oneDominanteProg,20,47);


export const FingerArp =(props)=>{
    const [two,setTwo] = useState(null);
    const [currentChord,setCurrentChord] = useState(chords[0]);
    const [maxDistance,setMaxDistance] = useState(null);
    const [text,setText] = useState(null);
    const [text2,setText2] = useState(null);
    const [currentBpm,setCurrentBpm] = useState(null);
    const [currentLevel,setCurrentLevel] = useState(0);
    const [fingers,setFingers] = useState(0);
    const [check1,setCheck1] = useState(null);
    const [check2,setCheck2] = useState(null);
    const [levelBpm,setLevelBpm] = useState(null);
    const [levelNotes,setLevelNotes] = useState(null);
    const [loaded,setLoaded] = useState(false);
    const [inst,setInst] = useState('none');

    const updateSize=()=>{
        let elem = document.getElementById('canvas');
        let params = { fullscreen: true};
        let two = new Two(params).appendTo(elem);
        let ratio = window.devicePixelRatio;
        let width = two.width;
        let height = two.height;
        let leftInfoX = width/15;
        setMaxDistance(findDistance(0,two.height,two.width,0));
        let bg = two.makeRectangle(0,0,width*ratio,height*ratio);
        bg.fill = '#ffffff';
        let text = two.makeText('',width-leftInfoX, height/14);
        text.size = '5vmin';
        text.family = 'Alef';
        text.alignment = 'right';
        text.weight = 'bold';
        setText(text);
        let text2 = two.makeText(dynamictext.five.disable_silent[props.lang], width/2, height/4);
        text2.size = '5vmin';
        text2.family = 'Alef';
        setText2(text2)
        let objective = two.makeText(dynamictext.five.next_chord[props.lang],leftInfoX,height/14);
        objective.size = '5vmin';
        objective.family = 'Alef';
        objective.alignment = 'left';
        objective.weight = 'bold';
        let levelBpm = two.makeText(`${dynamictext.five.tempo[props.lang]} ${levels[currentLevel][1]}`,width/15,height/6);
        setLevelBpm(levelBpm);
        let levelNotes = two.makeText(`${dynamictext.five.fingers[props.lang]} ${levels[currentLevel][0]}`,width/15,height/8);
        levelNotes.alignment = 'left';
        levelBpm.alignment = 'left';
        levelNotes.size = '4.5vmin';
        levelNotes.family = 'Alef';
        levelBpm.size = '4.5vmin';
        levelBpm.family = 'Alef';
        let l1 = two.makeLine(10,10,20,30);
        let l2 = two.makeLine(17.5,30,50,0);
        let l3 = l1.clone();
        let l4 = l2.clone();
        let checkmark = two.makeGroup(l1,l2);
        let checkmark2 = two.makeGroup(l3,l4);
        let checkmarks = two.makeGroup(checkmark,checkmark2);
        checkmarks.linewidth = 5;
        checkmark.translation.set(leftInfoX+ 85,height/8-10);
        checkmark2.translation.set(leftInfoX + 95,height/6-10);
        checkmark.scale = 0.5
        checkmark2.scale = 0.5;
        setCheck1(checkmark);
        setCheck2(checkmark2);
        setLevelNotes(levelNotes);
        setTwo(two);
        setLoaded(true);
        two.update();
    }


    const handleMotion = (e) =>{
        let y = Math.abs(e.accelerationIncludingGravity.y);
        if(stream.length<20){
            stream.unshift(y);       
        }else{
            stream.pop();
            stream.unshift(y);
            y = (streamSmoother(stream))/10;
        }
        y=easeOutQuad(y);
        if(loaded){

            synth.modulationIndex.value = y*150;
        }
      };

    const changeChord = (chord) =>{
        // pattern.stop();
        pattern.dispose();
        pattern = new Tone.Pattern(function(time, note){
            synth.triggerAttackRelease(note, 0.04);
        }, chord,"upDown");
        pattern.interval = "8n";
        // pattern.humanize = true;
        // pattern.probability = 0.9;
        pattern.start('+0.05');
        text2.value = `${chord.reverse()}`;
        two.update();
    }


    const getBpm = (touches)=>{
        let current;
        let max=0;
        if(touches.length>1){
            for (let i=0;i<touches.length;i++){
                for (let j=0;j<touches.length;j++){
                    let x1 = touches[i].clientX;
                    let x2 = touches[j].clientX;
                    let y1 = touches[i].clientY;
                    let y2 = touches[j].clientY;
                    current = findDistance(x1,y1,x2,y2);
                    if(findDistance(x1,y1,x2,y2)>max){
                        max=current;
                    };
                };
            };
            max = Math.abs(1-(easeInOut(max/maxDistance)))*350;
            Tone.Transport.bpm.value= max;
            setCurrentBpm(max);
        }
        else{
            max = 120;
            Tone.Transport.bpm.value= max;
            setCurrentBpm(max);
        }
        text.value = `${dynamictext.five.tempo[props.lang]}${Math.round(max)}`;
    }

    useEffect(()=>{
        if(loaded){
            checkLevel(levels[currentLevel],fingers);
        };
    });



    const checkLevel =(level,touches)=>{
        let rightTempo = false;
        let rightNotes = false;
        let notes = level[0];
        let bpm = level[1];
        if(touches===notes){
            rightNotes = true;
            check1.opacity = 1;
        }else{
            check1.opacity = 0;
        };
        if(currentBpm <= (bpm+5)&& currentBpm >= (bpm-5)){
            rightTempo = true;
            check2.opacity = 1;
        }else{
            check2.opacity = 0;
        };
        if(rightTempo&&rightNotes){
            if(!winning){
                winning = true;
                text2.value = `${dynamictext.five.next_chord_in[props.lang]} 3`;
                function endCountdown() {
                    winningSynth.triggerAttackRelease(chords[currentLevel],0.5);
                    setCurrentLevel(currentLevel+1);
                    levelBpm.value = `${dynamictext.five.tempo[props.lang]} ${levels[currentLevel+1][1]}`;
                    levelNotes.value = `${dynamictext.five.fingers[props.lang]} ${levels[currentLevel+1][0]}`;
                    text2.value = '';
                    setCurrentChord(chords[currentLevel+1]);
                    pattern.stop();
                    Tone.Transport.stop();
                  }
                  
                function handleTimer() {
                    if(count === 0) {
                      clearInterval(interval);
                      endCountdown();
                    } else {
                      text2.value = `${dynamictext.five.next_chord_in[props.lang]} ${count}`;
                      two.update();
                      count--;
                    }
                }
                  
                let count = 2;
                interval = setInterval(function() { handleTimer(count); }, 1000);
            }
        }else{
            if(winning){
                winning = false;
                text2.value = ``;
                clearInterval(interval);
            }
        }
        two.update();
    }

    const onClick=(e)=>{
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }
        
        let touches = e.touches;
        let newChord;
        let notes;
        newChord = currentChord;     
        drawCircles(touches);
        notes = touches.length;
        setFingers(notes);
        newChord = [...newChord].slice(5-notes);
        changeChord(newChord);
        Tone.Transport.start('+0.05'); 
        getBpm(touches);       
    };

    const drawCircles = (touches) =>{
        for(let i=0;i<touches.length;i++){
            let x = touches[i].clientX;
            let y = touches[i].clientY;
            two.remove(circles[i]);
            // let newCircle = two.makeCircle(x, y, 50);
            circles[i] = two.makeCircle(x, y, 50);
            circles[i].fill = '#000000';
            circles[i].stroke = 'CornflowerBlue '; // Accepts all valid css color
            circles[i].linewidth = 8;
            
        };
        two.update();
    }

    const moveCircles =(touches)=>{
        for(let i=0;i<touches.length;i++){
            circles[i].translation.set(touches[i].clientX, touches[i].clientY);
        };
        two.update();
    }

    const handleMove=(e)=>{
        let touches = e.touches;
        setFingers(touches.length);
        moveCircles(touches);
        getBpm(touches);  
    }

    const onRelease=(e)=>{
        let touches = e.touches;
        let notes = touches.length;
        setFingers(notes);
        getBpm(touches);
        let newChord = currentChord;
        newChord = [...newChord].slice(5-notes);
        changeChord(newChord);
        if(e.touches[0]=== undefined){
            // newChord = prog[Math.round(Math.random()*(prog.length-1))];
            // setCurrentChord(newChord);
            pattern.stop();
            Tone.Transport.stop();
            Tone.Transport.bpm.value = 120;
        }
        for(let i=circles.length;i>touches.length-1;i--){
            two.remove(circles[i]);
        };        
        two.update();
    }


    useEffect(()=>{
        firebase.analytics().logEvent('entered_five');
        updateSize();
        window.addEventListener('resize',(e)=>{updateSize()});
        return(()=>{
            window.removeEventListener('resize',updateSize());
            window.removeEventListener('devicemotion',(e)=>handleMotion(e));
        });
        // eslint-disable-next-line
    },[]);

    


    return (
        <div style={{position: 'fixed' , backgroundColor:'white',height: '100%',userSelect: 'none',WebkitTapHighlightColor:'rgb(0,0,0,0)',WebkitUserSelect:'none',WebkitTouchCallout:'none',outline: 'none'}}>
            <div 
            style={{position: 'fixed' , backgroundColor:'white',height: '100%',userSelect: 'none',WebkitTapHighlightColor:'rgb(0,0,0,0)',WebkitUserSelect:'none',WebkitTouchCallout:'none',outline: 'none'}}
            id='canvas'
            //acceleration
            onClick={e=>
                {
                if (typeof DeviceMotionEvent.requestPermission === 'function') {
                    DeviceMotionEvent.requestPermission().then(permissionState => {
                        if (permissionState === 'granted') {
                            window.addEventListener('devicemotion', (e) => {handleMotion(e)});
                        }   
                     }).catch(console.error);
                } else {
                    window.addEventListener('devicemotion', (e) => {handleMotion(e)});
                    // handle regular non iOS 13+ devices
                }
                }
                    }
            onTouchStart={e=>{
                onClick(e);
                if (typeof DeviceMotionEvent.requestPermission === 'function') {
                    DeviceMotionEvent.requestPermission().then(permissionState => {
                        if (permissionState === 'granted') {
                            window.addEventListener('devicemotion', (e) => {handleMotion(e)});
                        }   
                     }).catch(console.error);
                } else {
                    window.addEventListener('devicemotion', (e) => {handleMotion(e)});
                    // handle regular non iOS 13+ devices
                }
                }}
            onTouchMove={e=>{handleMove(e)}}
            onTouchEnd={e=>{onRelease(e)}}
            >
            <Link to='/play'>
                <h1 style={{color:'black',position: 'absolute',bottom: 0,left:0,zIndex:800}} onTouchStart={(e)=>{props.setPage('play');setTimeout(()=>{pattern.stop()},100);firebase.analytics().logEvent('five_exit',{level_reached: currentLevel});}}>{dynamictext.five.exit[props.lang]}</h1>
            </Link>
            <h1 style={{position: 'absolute',bottom: 0,right:0,zIndex:800}} onTouchStart={(e)=>{setInst('999');firebase.analytics().logEvent('watched_instructions');}}>?</h1>
            <div style={{zIndex:inst,position:'absolute',height:'100vh',backgroundColor:'white',padding:'0 3vmin'}} onTouchStart={(e)=>{setInst('0')}} className="instructions_five" >
                <h2 style={{textAlign:'center'}}>{dynamictext.five.inst1[props.lang]}<br/><br/>{dynamictext.five.inst2[props.lang]}<br/><br/> {dynamictext.five.inst3[props.lang]}<br/><br/>{dynamictext.five.inst4[props.lang]}<br/><br/></h2>
                <h3>{dynamictext.five.inst5[props.lang]}</h3>
            </div>
            </div>
        </div>
        
    );
}

