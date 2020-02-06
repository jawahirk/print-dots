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
 * @return Nothing
 */

function printDots(imageArray, canvasId, canvasSize, color = 'red', spacing = 1){
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
  spacing = spacing + 2 * radius; // Adding diameter of dot
  canvasContext.fillStyle = color;

  let printQueue = [];

  for(let i = 0; i < imageArray.length;i++){
    for(let j=0;j< imageArray[i].length;j++){
      if(imageArray[i][j] === '1'){
        printQueue.push([x, y]);
      }
      x += spacing;
    }
    x = radius;
    y += spacing;
  }
  printQueue.sort(()=> (Math.random()-0.5));  //Shuffle list
  let scheduler, pixel;
  scheduler = setInterval(()=>{
    if(pixel = printQueue.pop()){
      canvasContext.beginPath();
      canvasContext.arc(pixel[0], pixel[1], radius, 0, 2 * Math.PI);
      canvasContext.fill();
    } else {
      clearInterval(scheduler);
    }
  }, 0);
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

// export default printDot;