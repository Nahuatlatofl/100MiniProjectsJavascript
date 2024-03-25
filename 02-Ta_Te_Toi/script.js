let gridElements = document.getElementsByClassName('grid__el');
let h1 = document.getElementById('title');
let main = document.getElementById('main')

let elementsArray = []; 
let turn = 1;
let winner = false;

let grid = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

document.addEventListener("DOMContentLoaded", function() {    
    Array.from(gridElements).forEach((element, index) => {
        elementsArray.push({element: element, index: index});
     
        element.addEventListener("click", function() {
            if(winner == false)
                paint(element, index);
        });
    });
});

let paint = function(element, index) {
    if (element.classList.contains('teamX') || element.classList.contains('teamO')) {
        console.log("Se hizo clic en el elemento", index);
    } else {
        let paragraph = document.createElement('p');
        if (turn == 1) {
            element.classList.add('teamO');
            paragraph.textContent = 'o';
            element.appendChild(paragraph);
            turn = 0;

            h1.classList.remove('turnO')
            h1.classList.add('turnX');

            grid[index] = 1;

            checkWinner(grid, 1);
        } else {
            element.classList.add('teamX');
            paragraph.textContent = 'x';
            element.appendChild(paragraph);
            turn = 1;
            
            h1.classList.remove('turnX')
            h1.classList.add('turnO');
            
            grid[index] = 2;
            
            checkWinner(grid, 2);
        }

        console.log(grid);
    }
}

function checkWinner(board, player) {
    for (let combo of winningCombinations) {
        if (combo.every(cell => board[cell] === player)) {
            if(player == 1){
                h1.textContent = 'The Winner is: "O"';

                h1.classList.remove('turnX')
                h1.classList.add('turnO');
            }else{
                h1.textContent = 'The Winner is: "X"'

                h1.classList.remove('turnO')
                h1.classList.add('turnX');
            }

            winner = true;

            createResetButton();

            return; 
        }
    }
    console.log(board);
    console.log(winner);
    if (winner == false && board.every(cell => cell !== 0)) {
        console.log('empate');
        
        h1.textContent = 'Draw'
        h1.classList.remove('turnX')
        h1.classList.remove('turnO');

        createResetButton();
        return;
    }
    console.log('No hay ganador')
}

let createResetButton = function(){
    let button = document.createElement('button');
    button.classList.add('button')
    button.textContent = 'reset';
    button.addEventListener('click', function () {
        reset();
        button.remove();
    })

    main.appendChild(button)
}

let reset = function(){
    for(let i = 0;i <= 8; i++){
        grid[i] = 0;
    }
    
    Array.from(gridElements).forEach((element,index) => {
        if (element.firstChild) {
            element.removeChild(element.firstChild);   

            element.classList.remove('teamO');
            element.classList.remove('teamX');
            
            console.log(gridElements);
        }
    })

    h1.textContent = 'To Ta Toe'
    h1.classList.remove('turnX');
    h1.classList.remove('turnO');

    h1.classList.add('turnO');
    winner = false;

    turn = 1;

}
