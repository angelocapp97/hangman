import { Hangman } from './hangman'
import getPuzzle from './requests'

const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')

let game

window.addEventListener('keypress', (e) => {
    game.makeGuess(String.fromCharCode(e.charCode))
    render()
})

const render = () => {
    puzzleEl.innerHTML = ''
    guessesEl.textContent = game.statusMessage

    game.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        if (letter === ' ') {
            letterEl.setAttribute('class', 'whitespace')
        } else {
            letterEl.setAttribute('class', 'hasletter')
        }
        puzzleEl.appendChild(letterEl)
    })
}

const startGame = async () => {
    const puzzle = await getPuzzle(2)
    game = new Hangman(puzzle, 5)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()