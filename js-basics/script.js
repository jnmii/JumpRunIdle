let currentState = 'idle'; // Initial state
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    currentState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1110;
const CANVAS_HEIGHT = canvas.height = 471;
console.log(ctx);

const playerImage = new Image();
const playerJump = new Image();

playerImage.src = 'animationSheet/fullAnim.png';

const spriteConfig = {
    run: { width: 119, height: 160, adjustX: -25 },
    jump: { width: 112, height: 160, adjustX: 15 },
    idle: { width: 90, height: 160, adjustX: -50 },
};

let gameFrame = 0;
const staggerFrames = 10;


const spriteAnimations = [];
const animationStates = [
    {
        name: 'run',
        frames: 5,
    },
    {
        name: 'jump',
        frames: 8,
    },
    {
        name: 'idle',
        frames: 2,
    }
];

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }

    const { width: spriteWidth, height: spriteHeight, adjustX } = spriteConfig[state.name];

    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimations[state.name] = frames;
});
console.log(animationStates);

function animate() {
    const action = spriteAnimations[currentState];

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % action.loc.length;
    let frameX = action.loc[position].x;
    let frameY = action.loc[position].y;

    const { width: spriteWidth, height: spriteHeight } = spriteConfig[currentState];
    const adjustX = spriteConfig[currentState].adjustX;

    ctx.drawImage(
        playerImage,
        frameX,
        frameY,
        spriteWidth,
        spriteHeight,
        adjustX, // Use the X adjustment based on the current state
        0, // Use 0 as the Y position (you can adjust this if needed)
        CANVAS_WIDTH,
        CANVAS_HEIGHT
    );

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();
