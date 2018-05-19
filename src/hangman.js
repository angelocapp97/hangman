export class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'playing'
    }

    calculateStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')

        if (this.remainingGuesses === 0) {
            this.status = 'failed'
        } else if (finished) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }

    get puzzle() {
        let puzzle = ''

        this.word.forEach((letter) => {
            (this.guessedLetters.includes(letter) || letter === ' ') ? puzzle += letter
                : puzzle += '*'
        })

        return puzzle
    }

    makeGuess(guess) {
        if (this._status !== 'playing') {
            return
        }

        guess = guess.toLowerCase()

        if (typeof guess !== 'string' || !guess.trim()) {
            throw Error('Invalid character passed.')
        }

        const isUnique = !this.guessedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)

        if (isUnique) {
            this.guessedLetters = [...this.guessedLetters, guess]
        }

        if (isUnique && isBadGuess) {
            this.remainingGuesses--
        }

        this.calculateStatus()
    }

    get status() {
        return this._status
    }

    set status(value) {
        this._status = value.trim()
    }

    get statusMessage() {
        if (this.status === 'playing') {
            return `Guesses left: ${this.remainingGuesses}`
        } else if (this.status === 'failed') {
            return `Nice try! The word was "${this.word.join('')}".`
        } else if (this.status === 'finished') {
            return 'Great work! You guessed the word.'
        }
    }

    set statusMessage(value) {
        this._statusMessage = value.trim()
    }
}