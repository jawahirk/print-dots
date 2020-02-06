/**
 * Function Print Dots
 * @param imageArray  String Array of image with zeros and ones
 *                      eg:- ["0000111","", "001100"]
 * @param canvasId    DOM Canvas Id string
 *                      eg:- "myCanvas"
 * @param canvasSize  Size of Canvas, array with 2 elements, default viewport size
 *                      eg:- [1024, 768]
 * @param color       Color of Dots, String, also accepts canvas gradients, default Green
 *                      eg:- 'pink', 'rgba(255, 255, 255, 1)' or CanvasGradient object
 * @param spacing     Spacing between dots, default 1
 * 
 * @param timer       Timer for scheduler randomization in seconds, default 2
 *                    actual loading time may depends on h/w perfomance
 * @return Nothing
 */

function printDots(imageArray, canvasId, canvasSize, color = 'red', spacing = 1, timer = 2){
  if(!imageArray || imageArray.length < 1){
    console.error("Invalid Image, Please check the image source : ", imageArray);
    return false;
  }
  const myCanvas = document.getElementById(canvasId);
  if(!myCanvas){
    console.error("Invalid CanvasID, Please provide a valid ID : ", canvasId);
    return false;
  }
  const canvasContext = myCanvas.getContext('2d');
  if(!canvasSize || canvasSize.length !== 2 ){
    canvasSize = [window.innerWidth, window.innerHeight];
  }
  const imageSize = getImageDimentions(imageArray);
  const radius = getDotRadius(imageSize, canvasSize, spacing);
  let x = radius, y = radius;
  const printImageDot = printDot.bind({}, canvasContext, radius);
  timer = timer * 1000; //Convert to milliseconds
  spacing = spacing + 2 * radius; // Adding diameter of dot
  canvasContext.fillStyle = color;
  
  for(let i = 0; i < imageArray.length;i++){
    for(let j=0;j< imageArray[i].length;j++){
      if(imageArray[i][j] === '1'){
        let printTime = Math.floor(Math.random()*timer);
        setTimeout(printImageDot, printTime, x, y);
      }
      x += spacing;
    }
    x = radius;
    y += spacing;
  }
}

/**
 * Function to calculate Image Dimentions from Image Array
 * @param {*} imageArray 
 */
function getImageDimentions(imageArray){
  const height = imageArray.length;
  const width = imageArray.reduce((maxWidth, line) => Math.max(line.length, maxWidth), 0);
  return [width, height];
}

/**
 * Fuction to calculate dot size according to the image size and 
 * @param {*} imageSize 
 * @param {*} canvasSize 
 * @param {*} spacing 
 */
function getDotRadius(imageSize, canvasSize, spacing){
  const effectiveWidth = canvasSize[0]-imageSize[0]*spacing;
  const effectiveHeight = canvasSize[1]-imageSize[1]*spacing;
  const dotDiameter = Math.min(effectiveWidth/imageSize[0], effectiveHeight/imageSize[1]);
  return Math.floor(dotDiameter/2);
}

function printDot(context, radius, x, y){
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
};
