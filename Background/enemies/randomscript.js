/**@type {HTMLCanvasElement}*/
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies= Math.random() * 30;
const enemiesArray =[];

const enemyImage = new Image();

let gameFrame = 0;
class Enemy{
    constructor(){
        this.image = new Image();
        this.image.src = "/Background/npc/alien.png";
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 25.0556;
        this.spriteHeight = 27;
        this.width = Math.floor((Math.random() + 0.40) * canvas.width * 0.25);
        this.height= this.width;
        this.x = Math.random() * (canvas.width- this.width);
        this.y= Math.random() * (canvas.height - this.height);
        this.newX= Math.random() * (canvas.width- this.width);
        this.newY= Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random()* 3 +1);
        this.interval = Math.floor(Math.random()*200 + 50);
       
    }
    update(){  
        if(gameFrame % this.interval === 0){
            this.newX= Math.random() * (canvas.width - this.width);
            this.newY= Math.random() * (canvas.height - this.height);
        }
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx/70;
        this.y -= dy/70;
        // this.x = 0;
        // this.y = 0;
        if(this.x + this.width< 0) this.x = canvas.width;
        //animate sprites
        if (gameFrame % this.flapSpeed===0){
            this.frame> 6 ? this.frame =0 : this.frame++;
        }
    }
    draw(){
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.frame* this.spriteWidth , 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
};

for (let i = 0; i < numberOfEnemies; i++){
enemiesArray.push(new Enemy());
}
console.log(enemiesArray)


function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
    // enemy1.update();
    // enemy1.draw();
    enemiesArray.forEach(enemy=>{
        enemy.update();
        enemy.draw();
        
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();