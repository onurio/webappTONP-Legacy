

//easing function
export const easeInOut =(t)=> { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 };


//find distance between two points
export const findDistance =(x1,y1,x2,y2)=>{
    let distance = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
    return distance;
};


//get pixel ratio for 2d Canvas
export const getPixelRatio = (ctx) => {
    var backingStore =
      ctx.backingStorePixelRatio ||
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;
    return (window.devicePixelRatio || 1) / backingStore;
  };


//Drum sampler app utils


//object for keystrokes
 export const keys = {
    a: '1',
    A: '1',
    s: '2',
    S: '2',
    d: '3',
    D: '3',
    f: '4',
    F: '4'
  }