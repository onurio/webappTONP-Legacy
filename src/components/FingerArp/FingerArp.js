import React,{useState,useEffect} from 'react';
import Tone from 'tone';
import Two from 'two.js';
import {easeInOut,findDistance} from '../../utils/utils';


const synth = new Tone.Synth();
const gain = new Tone.Gain(0.6);
synth.oscillator.type = 'sine';
gain.toMaster();
synth.connect(gain);

var pattern = new Tone.Pattern(function(time, note){
	synth.triggerAttackRelease(note, 0.25);
}, ["C4", "D4", "E4", "G4", "A4"],"upDown");
pattern.interval = "16n";

// let chords = [["C4", "D4", "E4", "G4", "A4"],["C4", "F4", "B5", "G4", "D5"],["Db4", "F4", "G4", "Bb4", "C5"]];
let circles = [];



  




const progGenerator =()=>{
    let options = ["C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4"];
    let prog=[];
    for (let i=0;i<50;i++){
        let chord =[]
        for (let j=0;j<5;j++){
            chord.push(options[Math.round(Math.random()*11)]);
        }
        prog.push(chord);
    }
    return prog;
}

const levelGenerator =()=>{
    let levels = [];
    for(let i=0;i<50;i++){
        levels.push([Math.floor(Math.random()*4)+2,Math.round(Math.random()*200+50)]);
    }
    return levels;
}

let levels = levelGenerator();
let prog = progGenerator();
let winning = false;
let interval = null;
// let loaded = false;

export const FingerArp =(props)=>{
    const [two,setTwo] = useState(null);
    const [currentChord,setCurrentChord] = useState(prog[0]);
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
        let text2 = two.makeText(`${levels[currentLevel][0]} fingers, at ${levels[currentLevel][1]} bpm`, width/2, height/5);
        text2.size = '5vmin';
        text2.family = 'Alef';
        setText2(text2)
        let objective = two.makeText('Objective:',leftInfoX,height/14);
        objective.size = '5vmin';
        objective.family = 'Alef';
        objective.alignment = 'left';
        objective.weight = 'bold';
        
        let levelBpm = two.makeText(`Tempo: ${levels[currentLevel][1]}`,width/15,height/6);
        setLevelBpm(levelBpm);
        let levelNotes = two.makeText(`Notes: ${levels[currentLevel][0]}`,width/15,height/8);
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
        checkmark.translation.set(leftInfoX+ 75,height/8-10);
        checkmark2.translation.set(leftInfoX + 95,height/6-10);
        checkmark.scale = 0.5
        checkmark2.scale = 0.5;
        setCheck1(checkmark);
        setCheck2(checkmark2);
        setLevelNotes(levelNotes);
        setTwo(two);
        setLoaded(true);
        // console.log('loaded');
        two.update();
        // loaded = true;
    }

    const handleMotion = (e) =>{
        // console.log(loaded);
        if(loaded){
            let gama  = Math.abs(e.accelerationIncludingGravity.x);
            // text2.value = gama;
            two.update();
        }
        // setBeta(Math.abs(e.accelerationIncludingGravity.y)*20);
        // setGamma(Math.abs(e.accelerationIncludingGravity.z)*20);
      };

    const changeChord = (chord) =>{
        pattern.stop();
        pattern = new Tone.Pattern(function(time, note){
            synth.triggerAttackRelease(note, 0.25);
        }, chord,"upDown");
        pattern.interval = "12n";
        pattern.start(0);
        text2.value = `${chord}`;
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
        text.value = `Tempo:${Math.round(max)}`;
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
            // text2.fill = 'green';
            check1.opacity = 1;
        }else{
            // text2.fill = 'black';
            check1.opacity = 0;
        };
        if(currentBpm <= (bpm+5)&& currentBpm >= (bpm-5)){
            rightTempo = true;
            // text.fill = 'green';
            check2.opacity = 1;
        }else{
            // text.fill = 'black';
            check2.opacity = 0;
        };
        if(rightTempo&&rightNotes){
            if(!winning){
                winning = true;
                text2.value = `next chord in 3`;
                function endCountdown() {
                    // logic to finish the countdown here
                    setCurrentLevel(currentLevel+1);
                    levelBpm.value = `Tempo: ${levels[currentLevel+1][1]}`;
                    levelNotes.value = `Notes: ${levels[currentLevel+1][0]}`;
                    text2.value = '';
                    setCurrentChord(prog[Math.round(Math.random()*prog.length)]);
                  }
                  
                function handleTimer() {
                    if(count === 0) {
                      clearInterval(interval);
                      endCountdown();
                    } else {
                      text2.value = `next chord in ${count}`;
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
        
        // console.log(DeviceOrientationEvent);
        let touches = e.touches;
        let newChord;
        let notes;
        newChord = currentChord;     
        drawCircles(touches);
        notes = touches.length;
        setFingers(notes);
        newChord = [...newChord].slice(5-notes);
        changeChord(newChord);
        Tone.Transport.start(); 
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
        updateSize();
        window.addEventListener('resize',(e)=>{updateSize();console.log(e)});
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
            onTouchStart={e=>{onClick(e);}}
            onTouchMove={e=>{handleMove(e)}}
            onTouchEnd={e=>{onRelease(e)}}
            />
        </div>
        
    );
}

