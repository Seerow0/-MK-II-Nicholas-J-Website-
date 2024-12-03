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

function checkGuess(letter) {
    const result = [];
    for (let i = 0; i < targetWord.length; i++) {
        if (currentGuess[i] === letter) {
            result.push('correct-position');
        } else if (targetWord[i] === letter) {
            result.push('correct');
        } else {
            result.push('incorrect');
        }
    }
    updateGrid(result);
}

function updateGrid(result) {
    const row = document.querySelectorAll(`.tile[data-row="${currentRow}"]`);
    result.forEach((status, i) => {
        const tile = row[i];
        tile.classList.add(status);
        tile.innerText = currentGuess[i];
    });
    currentRow++;
    if (currentRow === maxGuesses || currentGuess.join('') === targetWord.join('')) {
        endGame();
    }
}

function endGame() {
    if (currentGuess.join('') === targetWord.join('')) {
        alert('You Win!');
        playSound('special');
    } else {
        alert(`Game Over! The word was ${targetWord.join('')}`);
    }
}

function useWildcard() {
    if (wildcardsUsed < maxWildcards) {
        const hiddenIndexes = targetWord.map((letter, index) => currentGuess[index] === '' ? index : null).filter(index => index !== null);
        const randomIndex = hiddenIndexes[Math.floor(Math.random() * hiddenIndexes.length)];
        currentGuess[randomIndex] = targetWord[randomIndex];
        wildcardsUsed++;
        updateRow();
        playSound('special');
        document.getElementById('wildcardBtn').disabled = true;
    } else {
        alert("Wildcard already used!");
    }
}

function playSound(type) {
    const sounds = {
        correct: new Audio('chime.mp3'),
        incorrect: new Audio('error.mp3'),
        special: new Audio('special.mp3'),
    };

    sounds[type]?.play();
}
