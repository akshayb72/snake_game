//Define the elements
const board = document.getElementById('game-board');

console.log(board);

let snake = [{}];

function draw_Map() {
board.innerHTML = '';
draw_Snake();
}

function draw_Snake() {
snake.forEach((segment) =>{
    const snakeElement = createGameElement('div','snake');
});
}

//create snake or food cube

function createGameElement(tag, className)
{
    const element = document.createElement(tag);
}