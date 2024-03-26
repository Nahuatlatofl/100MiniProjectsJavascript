const div = document.getElementById('container');

let documentWidth = document.body.clientWidth;
let documentHeight = document.body.clientHeight;

const sound1 = document.createElement('audio');
const sound2 = document.createElement('audio');
sound1.src = 'audio1.mp3';
sound1.src = 'src/hit.mp3';

/* Objects */
const getPaddle = (context, x = 0, y = 0, color = '#FFF') => ({
    x,
    y,
    w: 10,
    h: 50,
    color,
    speed: 10,
    
    draw(){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    },
    moveUp() {
        if(this.y < 1){ return; }
        this.y -= this.speed;
    },
    moveDown(){
        if(this.y > canvas.height - this.h) { return; }
        this.y += this.speed;
    },
    contains(b){
        return (this.x < b.x +b.w) &&
                (this.x + this.w > b.x) &&
                (this.y < b.y + b.h) &&
                (this.y + this.h > b.y);
    }
});

const getBall = (context, x = 0, y = 0, color = '#FFF') => ({
    x,
    y,
    w: 10,
    h: 10,
    color,
    directionX: 'right',
    directionY: 'up',
    friction: .4,
    speedX : 1,
    speedY : 1,
    isMoving: false,

    handleMovement(){
        if(!this.isMoving) {return}

        if(this.x < 0){
            this.directionX = 'right';
        }else if(this.x > canvas.width - this.w){
            this.directionX = 'left'
        }
        
        this.directionX === 'right' ? this.x++ : this.x--;
        
        this.speedX *= this.friction;
        this.x += this.speedX;
        
        if(this.y < 0){
            this.directionY = 'down';
        } else if (this.y > canvas.height - this.h) {
            this.directionY = 'up';
        }
        
        this.directionY === 'up' ? this.y-- : this.y++;

        this.speedY *= this.friction;
        this.y += this.speedY;
    },
    draw(){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    }
});

const score = {
    left: 0,
    right: 0
}

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

canvas.width = documentWidth - (documentWidth *  0.5);
canvas.height = 300;

let canvasW2 = Math.floor(canvas.width/2);
let canvasH2 = Math.floor(canvas.height/2);

div.appendChild(canvas);

const paddleLeft = getPaddle(context, 8, canvasH2);
const paddleRight = getPaddle(context, canvas.width - 18, canvasH2)

paddleRight.draw();
paddleLeft.draw();

const ball = getBall(context, (canvas.width/2) - 5 , canvas.height/2);
ball.draw();

const update = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    drawCourt();
    drawScore();
    
    ball.handleMovement();
    ball.draw();
    paddleLeft.draw();
    paddleRight.draw();
    checkCollision();
    
    requestAnimationFrame(update);
}

addEventListener('keydown', event =>{
    switch(event.key){
        case 'ArrowUp':
            paddleRight.moveUp()
            if(!ball.isMoving) ball.isMoving = true;
            break;
        case 'ArrowDown':
            paddleRight.moveDown();
            if(!ball.isMoving) ball.isMoving = true;
            break;
            case 'w':
                paddleLeft.moveUp();
                if(!ball.isMoving) ball.isMoving = true;
                break;
                case 's':
                    paddleLeft.moveDown();
            if(!ball.isMoving) ball.isMoving = true;
            break;
    }
})

window.addEventListener('resize', function () {
    documentWidth = document.body.clientWidth;
    documentHeight = document.body.clientHeight;

    canvas.width = documentWidth - (documentWidth * 0.5);
    canvas.height = 300;

    canvasW2 = Math.floor(canvas.width / 2);
    canvasH2 = Math.floor(canvas.height / 2);

    paddleRight.y = canvasH2;
    paddleLeft.y = canvasH2;

    paddleRight.x = canvas.width - 18;

    ball.x = canvas.width/2 - 5;
})

/* Aux Fuction */
const drawCourt = () =>{
    context.strokeStyle = 'white';
    context.lineWidth = 1;
    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.moveTo(canvas.width/2, 0);
    context.lineTo(canvas.width/2,canvas.height);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.arc(canvas.width/2,canvas.height/2, 50, 0, 2*Math.PI,false);
    context.stroke();
    context.closePath();
}

const checkCollision = () => {
    if(paddleLeft.contains(ball)){
        ball.directionX = 'right';
        sound1.play();
    }else if(paddleRight.contains(ball)){
        ball.directionX = 'left';
        sound1.play();
    }
    
    if(ball.x < 0){
        score.left++;
        ball.x = canvas.width/2 - ball.w/2;
        ball.y = canvas.height/2;
        ball.isMoving = false;
        sound2.play();
    }else if(ball.x > canvas.width - ball.w){
        score.right++;
        ball.x = canvas.width/2 - ball.w/2;
        ball.y = canvas.height/2;
        ball.isMoving = false;
        sound2.play();
    }
}

const drawScore = () => {
    context.fillStyle =  '#ccc';
    context.font = '24px "Press Start 2P"';
    context.fillText(score.left, 10, 35);
    context.fillText(score.right, canvas.width - 30, 35)
}

requestAnimationFrame(update);
update();
