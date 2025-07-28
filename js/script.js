const cellElements = document.querySelectorAll('[data-cell]');
const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restart-button');
let isPlayerXTurn = true;
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = Array.from(cellElements).indexOf(cell);

    if (boardState[cellIndex] !== '' || !gameActive) {
        return;
    }

    updateCell(cell, cellIndex);
    checkWinner();
};

const updateCell = (cell, index) => {
    boardState[index] = isPlayerXTurn ? 'X' : 'O';
    cell.classList.add(isPlayerXTurn ? 'x' : 'o');
    isPlayerXTurn = !isPlayerXTurn;
    updateStatus();
};

const updateStatus = () => {
    if (!gameActive) return;

    const currentPlayer = isPlayerXTurn ? 'X' : 'O';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
};

const checkWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const winCondition = winningCombinations[i];
        const a = boardState[winCondition[0]];
        const b = boardState[winCondition[1]];
        const c = boardState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        const winner = isPlayerXTurn ? 'O' : 'X';
        statusElement.textContent = `Player ${winner} has won!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        statusElement.textContent = 'Game ended in a draw!';
        gameActive = false;
        return;
    }

    updateStatus();
};

const restartGame = () => {
    boardState = ['', '', '', '', '', '', '', '', ''];
    isPlayerXTurn = true;
    gameActive = true;
    statusElement.textContent = `Player X's turn`;
    cellElements.forEach(cell => {
        cell.classList.remove('x', 'o');
    });
};

cellElements.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

updateStatus();
