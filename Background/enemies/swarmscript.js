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
        // this.speed = Math.random() * 4 - 2;
        this.spriteWidth = 46.259;
        this.spriteHeight = 45;
        this.width = Math.floor((Math.random() + 0.40) * canvas.width * 0.25);
        this.height= this.width;
        this.x = Math.random() * (canvas.width- this.width);
        this.y= Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random()* 3 +1);

    }
    update(){
        this.x += Math.random()*15- 7.5;
        this.y += Math.random()*10-5;
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