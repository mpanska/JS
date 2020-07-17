let board;
const playerSign = 'O';
const aiSign = 'X';
const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7], [2,5,8],
    [0,4,8],[6,4,2]
]

const cells = document.querySelectorAll('.cell')

startGame();

function startGame() {
    document.querySelector(".game-result").style.display = "none"
    board = Array.from(Array(9).keys())

    for(let i = 0; i<cells.length; i++){
        cells[i].innerText = ''
        cells[i].addEventListener('click', getClick,false)
    }
}

function getClick(cell) {
    console.log(cell.target.id)
    makeTurn(cell.target.id, playerSign)
}

function makeTurn(cellId, playerSign) {
    board[cellId] = playerSign
    document.getElementById(cellId).innerText = playerSign
    let gameEnd = checkEnd(board, playerSign)
    if(gameEnd)
        gameOver(gameEnd)
}

function checkEnd(board, playerSign) {

}

function gameOver() {

}