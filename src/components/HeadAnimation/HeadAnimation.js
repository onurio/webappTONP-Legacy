
import React, { useState, useRef, useEffect } from "react";
import {triangles} from './triangles';
import './HeadAnimation.css';
import {isMobile} from '../../App';
import {easeInOut,getPixelRatio} from '../../utils/utils';






export let pixelRatio = null;



export const HeadAnimation=(props)=> {
  let canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [shapeSize,setShapeSize] = useState(14);


  useEffect(() => {
    sizeCanvas(canvasRef);
    window.addEventListener('resize',sizeCanvas(canvasRef));
    return (()=>{window.removeEventListener('resize',sizeCanvas)});
    // eslint-disable-next-line
  },[]);

  
  const sizeCanvas =(ref)=>{
    let canvasNew = ref.current;
    let width = 1600 ;
    let height = 800 ;
    setShapeSize(14);
    let ctxNew = canvasNew.getContext("2d");
    setCtx(ctxNew);
    let ratio = getPixelRatio(ctxNew);
    pixelRatio = ratio;
    canvasNew.width = width;
    canvasNew.height = height;
    drawLogo(ctxNew,width,height);
  }

  //draws a polygon
  const drawPolygon = (ctx,centerX,centerY,sideCount,size,strokeWidth,strokeColor,fillColor,rotationDegrees) => {
    var radians = (rotationDegrees * Math.PI) / 180;
    ctx.translate(centerX, centerY);
    ctx.rotate(radians);
    ctx.beginPath();
    ctx.moveTo(size * Math.cos(0), size * Math.sin(0));
    for (var i = 1; i <= sideCount; i += 1) {
      ctx.lineTo(
        size * Math.cos((i * 2 * Math.PI) / sideCount),
        size * Math.sin((i * 2 * Math.PI) / sideCount)
      );
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
    ctx.fill();
    ctx.rotate(-radians);
    ctx.translate(-centerX, -centerY);
  };

  const drawLogo=(ctx,currentW,currentH)=>{
    triangles.forEach((triangle)=>{
      drawPolygon(ctx,triangle.x, triangle.y, 3, shapeSize, 1, "white", "white", triangle.rot);
    });
  };

  

  const onClick = e => {
    setPressed(true);
    props.onClick();
  };

  const onRelease = () => {
    setPressed(false);
    props.onRelease();
  };

  //calculate animation position
  const calcPosition =(x,x2,y,y2,stage)=>{
    let calcX = (x-(x-x2)*easeInOut(stage/100));
    let calcY = (y-(y-y2)*easeInOut(stage/100));
    return {x: calcX,y: calcY};
  }

  //callback for finishing animation
  const finishAnim = (released,finishPos)=>{
    let animatingEnd = released;
    let requestId;
    let currentRot = rotation;
    let move = finishPos;
    const renderReturn=()=>{
      if (animatingEnd  && ctx !== null)
      {
        if (move > 0)
        {
          move -= 7;
          currentRot -= 10;
        }
        else
        {
          currentRot = 0;
          animatingEnd = false;
        }
        
        ctx.clearRect(0, 0, 3200, 1600);
        triangles.forEach((triangle)=>{
          let position = calcPosition(triangle.x,triangle.x2,triangle.y,triangle.y2,move);
          drawPolygon(ctx,position.x, position.y, 3, shapeSize, 1, "white", "white", triangle.rot + currentRot);
        });
        requestId = requestAnimationFrame(renderReturn);
      }
    };
    renderReturn();
    return () => {
      cancelAnimationFrame(requestId);
    };
    // eslint-disable-next-line
  }




  //animation
  useEffect(() => {
    let requestId;
    let move = 0;
    let currentRot = rotation;
    const renderMove = () => {
      if (pressed) {
        if (move < 100)
        {
          move += 7;
        }
        currentRot += 2;
        ctx.clearRect(0, 0, 3200, 1600);
        triangles.forEach((triangle)=>{
          let position = calcPosition(triangle.x,triangle.x2,triangle.y,triangle.y2,move);
          drawPolygon(ctx,position.x, position.y, 3, shapeSize, 1, "white", "white", triangle.rot2 + currentRot);
        });
        requestId = requestAnimationFrame(renderMove);
      }
    };
    renderMove();
    return () => {
      finishAnim(true,move);
      setRotation(currentRot);
      cancelAnimationFrame(requestId);
    };
    // eslint-disable-next-line
  },[pressed,ctx]);

  return (
    <div className='title' style={{height: '100%',width: '100%',justifyContent: 'center',alignItems: 'center'}}>
      <canvas
        onMouseUp={e => {
          if(!isMobile)
          {
            onRelease();
          }
        }}
        onMouseDown={e => {
          if(!isMobile)
          {
            onClick(e)
          }
        }}
        onTouchStart={e=>{onClick()}}
        onTouchEnd={e=>{onRelease()}}
        ref={canvasRef}
        id="canvas"
      />
    </div>
  );
}
