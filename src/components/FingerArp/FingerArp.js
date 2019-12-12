import React,{useRef,useState,useEffect} from 'react';
import Tone from 'tone';


const synth = new Tone.Synth();
const gain = new Tone.Gain(0.6);
synth.oscillator.type = 'sine';
gain.toMaster();
synth.connect(gain);

var pattern = new Tone.Pattern(function(time, note){
	synth.triggerAttackRelease(note, 0.25);
}, ["C4", "D4", "E4", "G4", "A4"],"upDown");

let chords = [["C4", "D4", "E4", "G4", "A4"],["C4", "F4", "F#4", "G4", "A4"],["Db4", "F4", "G4", "Bb4", "C5"]];


export const FingerArp =(props)=>{
    let canvasRef = useRef(null);
    const [ctx,setCtx] = useState(null);
    const [width,setWidth] = useState(window.innerWidth);
    const [height,setHeight] = useState(window.innerHeight);



    const sizeCanvas =(ref)=>{
        let canvasNew = ref.current;
        let width = window.innerWidth;
        let height = window.innerHeight;
        setWidth(width);
        setHeight(height);
        // setCurrentSize([width,height]);
        let ctxNew = canvasNew.getContext("2d");
        setCtx(ctxNew);
        // let ratio = getPixelRatio(ctxNew);
        // pixelRatio = ratio;
        canvasNew.width = width*2;
        canvasNew.height = height*2;
        canvasNew.style.width = `${width}px`;
        canvasNew.style.height = `${height}px`;
        // setCanvas(canvasNew);
        
    };


    useEffect(()=>{
        sizeCanvas(canvasRef);
        
    },[])

    

    const changeChord = (chord) =>{
        pattern.stop();
        pattern = new Tone.Pattern(function(time, note){
            synth.triggerAttackRelease(note, 0.25);
        }, chord,"upDown");
        pattern.start(0);
    }

    const onClick=(e)=>{
        let touches = e.touches;
        ctx.clearRect(0,0,width*2,height*2);
        for(let i=0;i<touches.length;i++){
            drawCircle(touches[i].clientX,touches[i].clientY);
        };
        // pattern.start(0);
        // console.log(chords[Math.round(Math.random()*2)]);
        let notes = touches.length;
        let newChord = chords[Math.round(Math.random()*2)]
        newChord = [...newChord].slice(5-notes)
        changeChord(newChord);
        Tone.Transport.start();
    };

    const handleMove=(e)=>{
        let touches = e.touches;
        ctx.clearRect(0,0,width*2,height*2);
        for(let i=0;i<touches.length;i++){
            drawCircle(touches[i].clientX,touches[i].clientY);
        };
        Tone.Transport.bpm.value= (e.touches[0].clientY/height*1000+100);
    }

    const onRelease=(e)=>{
        let touches = e.touches;
        ctx.clearRect(0,0,width*2,height*2);
        for(let i=0;i<touches.length;i++){
            drawCircle(touches[i].clientX,touches[i].clientY);
        };
        let notes = touches.length;
        let newChord = chords[Math.round(Math.random()*2)];
        newChord = [...newChord].slice(5-notes);
        changeChord(newChord);
        if(e.touches[0]=== undefined){
            pattern.stop();
            // ctx.clearRect(0,0,width*2,height*2);
        }
    }

    const drawCircle =(x,y)=>{
        ctx.beginPath();
        ctx.arc(x*2, y*2, 100, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    return (
        <div style={{position: 'fixed' , backgroundColor:'white',height: '100%',userSelect: 'none',WebkitTapHighlightColor:'rgb(0,0,0,0)',WebkitUserSelect:'none',WebkitTouchCallout:'none',outline: 'none'}}>
            <canvas
            style={{backgroundColor:'white',height: '100%',userSelect: 'none',WebkitTapHighlightColor:'rgb(0,0,0,0)',WebkitUserSelect:'none',WebkitTouchCallout:'none',outline: 'none'}}
            onTouchStart={e=>{onClick(e)}}
            onTouchMove={e=>{handleMove(e)}}
            onTouchEnd={e=>{onRelease(e)}}
            ref={canvasRef}
            id="canvas"
            />
        </div>    
    );
}

