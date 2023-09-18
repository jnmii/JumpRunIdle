/**@type {HTMLCanvasElement}*/
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies= 10;
const enemiesArray =[];

const enemyImage = new Image();

let gameFrame = 0;
class Enemy{
    constructor(){
        this.image = new Image();
        this.image.src = "/Background/npc/enemy2(2).png";
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 45.105;
        this.spriteHeight = 45;
        this.width = Math.floor((Math.random() + 0.40) * canvas.width * 0.25);
        this.height= this.width;
        this.x = Math.random() * (canvas.width- this.width);
        this.y= Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random()* 3 +1);
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.6;
        this.curve = Math.random() *10;

    }
    update(){
        this.x -= this.speed;
        this.y += this.curve* Math.sin(this.angle);
        this.angle += 0.1;
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