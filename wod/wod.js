const targetWord = "library".toUpperCase(); // The word to guess
const maxGuesses = 6;
let currentGuess = "";
let guesses = [];

const wodGame = document.getElementById('wod-game');

// Generate grid
function initGame() {
    for (let i = 0; i < maxGuesses; i++) {
        for (let j = 0; j < targetWord.length; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.index = `${i}-${j}`;
            wodGame.appendChild(tile);
        }
    }
}

function evaluateGuess(guess) {
    return guess.split('').map((char, index) => {
        if (char === targetWord[index]) return 'correct';
        if (targetWord.includes(char)) return 'partial';
        return 'incorrect';
    });
}

document.addEventListener('keydown', (e) => {
    if (guesses.length >= maxGuesses) return;
    const key = e.key.toUpperCase();

    if (key === 'ENTER' && currentGuess.length === targetWord.length) {
        const results = evaluateGuess(currentGuess);
        guesses.push(currentGuess);

        for (let i = 0; i < results.length; i++) {
            const tile = document.querySelector(`.tile[data-index="${guesses.length - 1}-${i}"]`);
            tile.textContent = currentGuess[i];
            tile.classList.add(results[i]);
        }

        if (currentGuess === targetWord) {
            alert('You Win!');
        } else if (guesses.length === maxGuesses) {
            alert(`Game Over! The word was ${targetWord}`);
        }

        currentGuess = '';
    } else if (key === 'BACKSPACE') {
        currentGuess = currentGuess.slice(0, -1);
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < targetWord.length) {
        currentGuess += key;
    }

    const rowIndex = guesses.length;
    for (let i = 0; i < targetWord.length; i++) {
        const tile = document.querySelector(`.tile[data-index="${rowIndex}-${i}"]`);
        tile.textContent = currentGuess[i] || '';
    }
});

initGame();
