let targetWord = ['L', 'I', 'B', 'R', 'A', 'R', 'Y'];
let currentGuess = ['', '', '', '', '', '', ''];
let maxGuesses = 6;
let currentRow = 0;
let wildcardsUsed = 0;
const maxWildcards = 1;
let usedLetters = new Set();

document.addEventListener('DOMContentLoaded', () => {
    createGrid();
    createAlphabet();
    addTypingCursor();
});

function createGrid() {
    const grid = document.getElementById('grid');
    for (let i = 0; i < maxGuesses; i++) {
        for (let j = 0; j < targetWord.length; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.row = i;
            tile.dataset.col = j;
            grid.appendChild(tile);
        }
    }
}

function createAlphabet() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabetContainer = document.getElementById('alphabet');
    for (let i = 0; i < alphabet.length; i++) {
        const button = document.createElement('button');
        button.classList.add('letter');
        button.innerText = alphabet[i];
        button.dataset.letter = alphabet[i];
        button.onclick = () => handleGuess(button);
        alphabetContainer.appendChild(button);
    }
}

function handleGuess(button) {
    const letter = button.dataset.letter;
    if (usedLetters.has(letter)) return;
    
    usedLetters.add(letter);
    updateAlphabet();
    updateCurrentGuess(letter);
    checkGuess(letter);
}

function updateAlphabet() {
    const letterButtons = document.querySelectorAll('.letter');
    letterButtons.forEach(button => {
        if (usedLetters.has(button.dataset.letter)) {
            button.classList.add('used');
        }
    });
}

function updateCurrentGuess(letter) {
    // Find the first empty slot in the current row
    for (let i = 0; i < currentGuess.length; i++) {
        if (currentGuess[i] === '') {
            currentGuess[i] = letter;
            break;
        }
    }
    updateGrid();
}

function updateGrid() {
    const row = document.querySelectorAll(`.tile[data-row="${currentRow}"]`);
    for (let i = 0; i < currentGuess.length; i++) {
        const tile = row[i];
        tile.textContent = currentGuess[i];
        tile.classList.remove('correct', 'correct-position', 'incorrect');
        if (currentGuess[i] === targetWord[i]) {
            tile.classList.add('correct-position');
        } else if (targetWord.includes(currentGuess[i])) {
            tile.classList.add('correct');
        } else {
            tile.classList.add('incorrect');
        }
    }
    if (currentGuess.join('') === targetWord.join('')) {
        endGame(true);
    } else if (currentRow === maxGuesses - 1) {
        endGame(false);
    } else {
        currentRow++;
        currentGuess = ['', '', '', '', '', '', ''];
    }
}

function endGame(won) {
    if (won) {
        alert('You win!');
    } else {
        alert(`Game over! The word was ${targetWord.join('')}`);
    }
}

function addTypingCursor() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.innerHTML = '';
    });
    
    const cursorTile = document.querySelector(`.tile[data-row="${currentRow}"][data-col="${currentGuess.length}"]`);
    const cursor = document.createElement('div');
    cursor.classList.add('blinking-cursor');
    cursorTile.appendChild(cursor);
}
