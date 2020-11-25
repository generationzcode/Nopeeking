var x = 600;
var y = 600;
function setup() {
	createCanvas(x, y);
}
var overallq = 100;
var rows = overallq;
var columns = overallq;
var waveQuality = 100;
var canvasArr = Array(rows).fill().map(() => Array(columns).fill(0));
function draw() {
	background(225);
	fill(0);

  loadPixels();
  pixelDensity(1);
  var xdiv = x/columns;
  var ydiv = y/rows;
  var yDivLimCount = 0;
  for (let v = 0; v < rows;v++){
    var xDivLimCount = 0;
    var miny = yDivLimCount;
    yDivLimCount+=ydiv;
    for (let f = 0; f < columns; f++){
      
      var minx = xDivLimCount;
      xDivLimCount+=xdiv;
      for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
          // loop over
          index = 4*(i+j*x);
          if(i<=xDivLimCount && i>=minx){
              if(j<=yDivLimCount && j>=miny){
          
                pixels[index] = canvasArr[f][v]*2;
                pixels[index+1] = canvasArr[f][v]*2;//canvasArr[f][v]*200;
                pixels[index+2] = canvasArr[f][v]*2;//canvasArr[f][v]*200;
                pixels[index+3] =200;
              }
          }
        }
      }
    }
  }
  updatePixels()
}
class wave {
  constructor(xpos,ypos,zpos,bearing,isPoint,intensity,zbearing){
    //something
    this.xpos = xpos;
    this.ypos = ypos;
    this.zpos = zpos;
    this.bearing = bearing;
    this.isPoint = isPoint;
    this.intensity = intensity;
    this.zbearing = zbearing;
    this.used = false;
    this.used2 = false;
  }
  wavelet(){
    if (this.isPoint == true){
      let newWaves = [];
      this.waveAngleDiff = 180/waveQuality;
      newWaves.push(new wave(this.xpos,this.ypos,this.zpos,0,false,1,0))
      for (let i=0;i<waveQuality;i+=1){
        for (let j=0;j<waveQuality;j+=1){
        newWaves.push(new wave(this.xpos,this.ypos,this.zpos,this.waveAngleDiff*i,false,1,this.waveAngleDiff*j))
        }
      }
      return newWaves
    }
    return false
  }
  nonReflect(solidAngle,planeZPos,planeXpos,planeYpos,planeXLim,planeYLim){
    //solid limits
    if(this.used == false){
    let leftlim = planeXpos - planeXLim/2;
    let rightLim = planeXpos + planeXLim/2;
    let topLim = planeYpos + planeYLim/2;
    let bottomLim = planeYpos - planeYLim/2;
    let distance = planeZPos - this.zpos;
    let waveZ = planeZPos; 
    if(this.bearing<=90){
      console.log("workin2g")
      this.angle = 90-this.bearing;
      var waveypos = this.ypos;
      if(this.angle>0){
        waveypos = this.ypos+distance*(Math.tan(this.angle* Math.PI / 180));
      }
      var wavexpos = this.xpos;
      if (this.zbearing <= 90){
        this.zAngle = 90-this.zbearing;
        if((this.zAngle>0)&&(this.zAngle<90)){
          wavexpos = this.xpos+distance*(Math.tan(this.zAngle* Math.PI / 180));
        }
      }
      else if (this.zbearing >90){
        this.zAngle = 180-this.zbearing;
        if((this.zAngle>0)&&(this.zAngle<90)){
          wavexpos = this.xpos-distance*(Math.tan(this.zAngle* Math.PI / 180));
        }
      }
      let isInX = (wavexpos <= rightLim) && (wavexpos>=leftlim);
      let isInY = (waveypos<=topLim) && (waveypos>=bottomLim);
      let isInRange = isInY && isInX;
      console.log(isInRange);
      if (isInRange){
        console.log("work3ing");
          let reflectedBearing = 270+this.angle;
          var reflectedy = waveypos;
          var reflectedx = wavexpos;

          canvasArr[Math.round(reflectedy)-1][Math.round(reflectedx)-1] += this.intensity;
          
          return "poop";
        }
        return false

    }

    else if(this.bearing>90){
      console.log("workin2g")
      this.angle = 180-this.bearing;
      var waveypos = this.ypos;
      if(this.angle>0){
        waveypos = this.ypos-distance*(Math.tan(this.angle* Math.PI / 180));
      }
      var wavexpos = this.xpos;
      if (this.zbearing <= 90){
        this.zAngle = 90-this.zbearing;
        if((this.zAngle>0)&&(this.zAngle<90)){
          wavexpos = this.xpos-distance*(Math.tan(this.zAngle* Math.PI / 180));
        }
      }
      else if (this.zbearing >90){
        this.zAngle = 180-this.zbearing;
        if((this.zAngle>0)&&(this.zAngle<90)){
          wavexpos = this.xpos+distance*(Math.tan(this.zAngle* Math.PI / 180));
        }
      }
      let isInX = (wavexpos <= rightLim) && (wavexpos>=leftlim);
      let isInY = (waveypos<=topLim) && (waveypos>=bottomLim);
      let isInRange = isInY && isInX;
      console.log(isInRange);
      if (isInRange){
        console.log("work3ing");
          var reflectedy = waveypos;
          var reflectedx = wavexpos;

          canvasArr[Math.round(reflectedy)-1][Math.round(reflectedx)-1] += this.intensity;
          
          return "poop";
        }
        return false

    }
    this.used = true;
    }
    else{
      return "used wave";
    }
    }
  renderWave(){
    if (this.isPoint == false){
      // do stuffs here
    }
  }
    reflect(solidAngle,planeZPos,planeXpos,planeYpos,planeXLim,planeYLim){
    //solid limits
    if(this.used2 == false){
    let leftlim = planeXpos - planeXLim/2;
    let rightLim = planeXpos + planeXLim/2;
    let topLim = planeYpos + planeYLim/2;
    let bottomLim = planeYpos - planeYLim/2;
    //console.log("working")
    let distance = planeZPos - this.zpos;// a value such as 5
    let waveZ = planeZPos;
    //let waveypos = this.ypos+distance*(Math.tan(this.angle* Math.PI / 180));
    //this.zAngle = this.zbearing
console.log("working");
    //histay is orfay earingsbay esslay hantay 90 
    if(this.bearing<=90){
      console.log("workin2g")
      this.angle = 90-this.bearing;
      var waveypos = this.ypos;
      if(this.angle>0){
        waveypos = this.ypos+distance*(Math.tan(this.angle* Math.PI / 180));
      }
      var wavexpos = this.xpos;
      if (this.zbearing <= 90){
        this.zAngle = 90-this.zbearing;
        if((this.zAngle>0)&&(this.zAngle<90)){
          wavexpos = this.xpos+distance*(Math.tan(this.zAngle* Math.PI / 180));
        }
      }
      else if (this.zbearing >90){
        this.zAngle = 180-this.zbearing;
        if((this.zAngle>0)&&(this.zAngle<90)){
          wavexpos = this.xpos-distance*(Math.tan(this.zAngle* Math.PI / 180));
        }
      }
      /*ok no more pig latin haha this should be checked whether its correct it defines how big the solid is and which waves reflect off it and which dont,
       Waves that dont hit the solid dont reflect off of it. If you dont understand this comment - ask me*/
      //Please see if I did this right...
      let isInX = (wavexpos <= rightLim) && (wavexpos>=leftlim);
      let isInY = (waveypos<=topLim) && (waveypos>=bottomLim);
      let isInRange = isInY && isInX;
      console.log(isInRange);
      if (isInRange){
        console.log("work3ing");
        //now all action goes here PLEASE
        if ((this.angle+solidAngle)<=90){
          let reflectedBearing = 270+this.angle;
          var reflectedy = waveypos;
          if((this.angle>0)&&(this.angle<90)){
           reflectedy = waveypos+waveZ*(Math.tan(this.angle* Math.PI / 180));
          }
          var reflectedx = wavexpos;
          if((this.zAngle>0)&&(this.zAngle<90)){
          if (this.zbearing>90){
            reflectedx = wavexpos-waveZ*(Math.tan(this.zAngle* Math.PI / 180));
          }
          else if (this.zbearing<=90){
            reflectedx = wavexpos+waveZ*(Math.tan(this.zAngle* Math.PI / 180));
          }
          }
          canvasArr[Math.round(reflectedy)-1][Math.round(reflectedx)-1] += this.intensity;
          return "poop";
        }
        return false

    }
    }

    else if(this.bearing>90){
      console.log("workin2g")
      this.angle = 180-this.bearing;
      var waveypos = this.ypos;
      if(this.angle>0){
        waveypos = this.ypos-distance*(Math.tan(this.angle* Math.PI / 180));
      }
      var wavexpos = this.xpos;
      if (this.zbearing <= 90){
        this.zAngle = 90-this.zbearing;
        if((this.zAngle>0)&&(this.zAngle<90)){
          wavexpos = this.xpos-distance*(Math.tan(this.zAngle* Math.PI / 180));
        }
      }
      else if (this.zbearing >90){
        this.zAngle = 180-this.zbearing;
        if((this.zAngle>0)&&(this.zAngle<90)){
          wavexpos = this.xpos+distance*(Math.tan(this.zAngle* Math.PI / 180));
        }
      }
      let isInX = (wavexpos <= rightLim) && (wavexpos>=leftlim);
      let isInY = (waveypos<=topLim) && (waveypos>=bottomLim);
      let isInRange = isInY && isInX;
      console.log(isInRange);
      if (isInRange){
        console.log("work3ing");
        if ((this.angle+solidAngle)<=90){
          let reflectedBearing = 270+this.angle;
          var reflectedy = waveypos;
          if((this.angle>0)&&(this.angle<90)){
           reflectedy = waveypos-waveZ*(Math.tan(this.angle* Math.PI / 180));
          }
          var reflectedx = wavexpos;
          if((this.zAngle>0)&&(this.zAngle<90)){
          if (this.zbearing>90){
            reflectedx = wavexpos+waveZ*(Math.tan(this.zAngle* Math.PI / 180));
          }
          else if (this.zbearing<=90){
            reflectedx = wavexpos-waveZ*(Math.tan(this.zAngle* Math.PI / 180));
          }
          }

          canvasArr[Math.round(reflectedy)-1][Math.round(reflectedx)-1] += this.intensity;
          
          return "poop";
        }
        return false

    }
    }
    this.used2 = true;
    }
    else{
      return "used wave" 
          }
}
}



class plane{
  constructor(xpos,ypos,solidAngle,zpos,rangex,rangey){
    this.xpos = xpos;
    this.ypos = ypos;
    this.zpos = zpos;
    this.solidAngle = solidAngle;
    this.rangex = rangex;
    this.rangey = rangey;
  }
  getReflect(list){
    for ( let i in list){
  if(canvasArr!=undefined){
  list[i].reflect(this.solidAngle,this.zpos,this.xpos,this.ypos,this.rangex,this.rangey);
  //wavelets[i].reflect(0,4,50,50,10,10);
  }
    }
  }
  
  getNonReflect(list){
    for (let i in list){
  if(canvasArr!=undefined){
  list[i].nonReflect(this.solidAngle,this.zpos,this.xpos,this.ypos,this.rangex,this.rangey);
  //wavelets[i].reflect(0,4,50,50,10,10);
  }
    }
  }
}

var lightPointSource = new wave(50,50,2,73,true,5,73);
if(canvasArr[1][1]!=undefined){
lightPointSource.nonReflect(0,9,5,5,10,10)
}
console.log(1)
var wavelets = lightPointSource.wavelet()
var plane1 = new plane(50,50,0,4,20,20);
plane1.getNonReflect(wavelets);

function playIt(lightx,lighty,lightz,planex,planey,planez,planeRange,cubeQ,waveQ){
  waveQuality = waveQ;
  rows = cubeQ;
  columns = cubeQ;
  canvasArr = Array(rows).fill().map(() => Array(columns).fill(0));
  var lightPointSource = new wave(lightx,lighty,lightz,73,true,5,73);
  console.log(1)
  var wavelets = lightPointSource.wavelet()
  var plane1 = new plane(planex,planey,0,planez,planeRange,planeRange);
  plane1.getNonReflect(wavelets);
}
function ignoreerror(){
   return true
}
window.onerror=ignoreerror();
// in case the whole UI thing doesnt work cus the page is running too slow, use this code here - 
//playIt(20,20,2,20,20,4,30,100,100);
// arguments are the light x coord, light y coord, light z coord, plane x coord(the solid paper light sheet thingy), plane y coord, planez coord, plane size, wave quality, pixel quality(higher the quality of both the better the image ig)
// change these at your own risk. If chrome freezes (or any other browser -   I use firefox and chrome) then i cant be liable for whatever lol. 