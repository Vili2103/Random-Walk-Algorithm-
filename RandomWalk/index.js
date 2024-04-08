const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d'); 
let ms = 0;
let lineColor = 0;
let backgroundColor = 0;
let agentsTimeouts = [];
let randomStart = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();


function startRandomWalk() {

    const button = document.querySelector('.button');
    const toggleSwitch = document.querySelector('.toggle-switch');
    const randomWalkText = document.querySelector('h1');
   // const inputContainters = document.querySelector(".input-container");

    button.style.display = 'none';
    toggleSwitch.style.display = 'none';
    randomWalkText.style.display = 'none';
   // inputContainter.style.display = 'none';

    randomStart = document.getElementById("randomPos");
    ms = document.getElementById("speed").value;
    lineColor = document.getElementById("lineColor").value;
    backgroundColor = document.getElementById("bgColor").value;

    agentsTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    agentsTimeouts = [];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let agents = document.getElementById("agents").value;

    if (agents <= 0 || isNaN(agents) || agents > 25) {
        alert("Please enter a valid number of agents.");
        return;
    } else if (ms <= 0 || isNaN(ms)) {
        alert("Please enter a valid speed.");
        return;
    }
    colorBackground();

    for (let i = 0; i < agents; i++) {
        if (!randomStart)
            agentsTimeouts.push(setTimeout(drawLine, ms));
        else agentsTimeouts.push(setTimeout(() => {
            drawLine(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));
        }, ms));
    }
}


function colorBackground(){
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fill();    
}

function drawLine(x=canvas.width/2,y=canvas.height/2){

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x,y);
   let nextPos =  getRandomDir(x,y);
    ctx.lineTo(nextPos.posX,nextPos.posY);
    ctx.stroke();
    agentsTimeouts.push(setTimeout(() => {
        drawLine(nextPos.posX, nextPos.posY);}, ms));
}


function getRandomDir(x,y,stepSize = 5){
    let dir = Math.floor(Math.random()*4);
    switch(dir){
        case 0: // 0 -> UP
            y+=stepSize;
            if(y>canvas.height)
            return(getRandomDir(x,y-stepSize,stepSize));
            break;
        case 1: // 1 -> RIGHT
            x+=stepSize;
            if(x>canvas.width)
            return(getRandomDir(x-stepSize,y,stepSize));
            break;
        case 2: // 2-> DOWN
            y-=stepSize;
            if(y<0)
            return(getRandomDir(x,y+stepSize,stepSize));
            break;
        case 3: // 3-> LEFT
            x-=stepSize;
            if(x<0)
            return(getRandomDir(x+stepSize,y,stepSize));
            break;
        default:
            break;
    }
    let pos = {posX: x, posY: y};
    return pos;
}
