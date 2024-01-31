//console.log('hi testing')

//define  game variables
const min=0;
const max =20;
const gridSize = 20;
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted= false;
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
//const max_food =10;
//const min_food = 21;
let snake = [{x:10,y:10}];
//let snake = [{x:arbitrary_int(min,max),y:arbitrary_int(min,max)}];// use arbitrary location later using random
//let food = {x:arbitrary_int(min,max),y:arbitrary_int(min,max)};
let direction = 'right';
//
let food = generateFood();
//Define html variables
//console.log(snake,food);
const board = document.getElementById('game-board');
const highScoreText = document.getElementById('highScore') 
let highScore = 0;





//console.log(board);
/*
function arbitrary_int(min,max)
{    
    return Math.floor(Math.random() * (max - min)); 
}
*/
function draw()
{
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

function drawSnake()
{
snake.forEach((segment) => {
    const snakeElement = createGameElement('div','snake');
    SetPosition(snakeElement,segment);
    board.appendChild(snakeElement);
});
}

// Create an snake funct or food cube function

function createGameElement(tag, className)
{
    const element = document.createElement(tag);
    element.className  = className;
    return element;
}

function SetPosition(element, position)
{
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;    
}

function drawFood()
{
    if(gameStarted){
    const foodElement= createGameElement('div','food');
    SetPosition(foodElement,food);
    board.appendChild(foodElement);
    }
}


// Generate Food

function generateFood()
{
    const x = Math.floor(Math.random() * (gridSize) + 1);
    const y = Math.floor(Math.random() * (gridSize) + 1);
    return {x,y};
}


// snake motion

function moveSnake()
{
    const head = {...snake[0]};
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;  
    }
    snake.unshift(head);

    //snake.pop();
    if(head.x === food.x && head.y === food.y )
    {
       food = generateFood();
       increaseSpeed();
       //console.log(head); 
       clearInterval(gameInterval);
       gameInterval = setInterval(() => {
            moveSnake();
            checkCollision();
            draw();
       },gameSpeedDelay);
    }
    else
    {
        snake.pop();
    }

}

function startGame()
{
gameStarted=true; // keep track to see if the game is running
instructionText.style.display = 'none'; 
logo.style.display = 'none';
gameInterval = setInterval(() => {
    moveSnake();
   checkCollision();
    draw();
},gameSpeedDelay);
}

//Key Press Event Listener

function handleKeyPress(event)
{
    if((!gameStarted && event.code === 'Space')||(!gameStarted && event.key === ' '))
    {
        startGame();
    }
    else
    {
        switch(event.key)
        {
            case 'ArrowUp':
                direction ='up';
                break;
            case 'ArrowDown':
                direction ='down';
                break;
            case 'ArrowLeft':
                direction ='left';
                break;
            case 'ArrowRight':
                direction ='right';
                break;

        }
    }
}
//Testing
//draw();
/*
setInterval(() => {
    moveSnake();
    draw();
},200);
*/
document.addEventListener('keydown',handleKeyPress);

function increaseSpeed()
{
   // console.log(gameSpeedDelay);
    if(gameSpeedDelay >150)
    {
        gameSpeedDelay -= 5;
    }
    else if(gameSpeedDelay>100)
    {
        gameSpeedDelay -= 3;
    }
    else if(gameSpeedDelay>50)
    {
        gameSpeedDelay -= 2;
    }
    else if(gameSpeedDelay>25)
    {
        gameSpeedDelay -= 1;
    }
}

function checkCollision()
    {
        const head = snake[0];

        if(head.x < 1 || head.x >gridSize || head.y < 1 || head.y > gridSize)
        {
            resetGame();
        }
        for(let i = 1; i < snake.length;i++)
        {
            if(head.x === snake[i].x && head.y === snake[i].y) 
            {
resetGame();
            }
            
        }
    }


    function resetGame()
    {
        updateHighScore();
        stopGame();
        snake = [{x:10,y:10}];
        food = generateFood();
        direction='right';
        gameSpeedDelay=200;
        updateScore();
    }

    function updateScore()
    {
        const currentScore = snake.length - 1;
        score.textContent  = currentScore.toString().padStart(3,'0');

    }

    function stopGame()
    {
clearInterval(gameInterval);
gameStarted=false;
instructionText.style.display="block";
logo.style.display="block";
    }

    function updateHighScore()
    {
    const currentScore = snake.length - 1;
    if (currentScore>highScore )
    {
        highScore =currentScore;
        highScoreText.textContent = highScore.toString().padStart(3,'0');
    }
    highScoreText.style.display = 'block';
    }
