const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timeToNextGhost = 0;
let ghostInterval = 500;
let lastTime=0;

let ghosts = [];
class Ghost{
    constructor(){
        this.width = 100;
        this.height = 50;
        this.x =canvas.width;
        this.y = Math.random() *( canvas.height - this.height);
        this.directionX = Math.random()*5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDelete = false;
     }
     update(){
        this.x -= this.directionX;
        if(this.x < 0 - this.width) this.markedForDelete = true

     }
     draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
     }
}

const ghost = new Ghost();

function animate(timestamp){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextGhost += deltaTime;
    if(timeToNextGhost > ghostInterval){
        ghosts.push(new Ghost());
        timeToNextGhost = 0;
    };
    [...ghosts].forEach(object => object.update());
    [...ghosts].forEach(object => object.draw());
    ghosts = ghosts.filter(object => !object.markedForDelete)
    
    requestAnimationFrame(animate);
}
animate(0);