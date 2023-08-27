// ELEMENTS BY CLASS OR ID
let gameContainer = document.getElementById("game")
let startGameBtn = document.getElementsByClassName("start-game")
let resetGameBtn = document.getElementsByClassName("restart-game")
let gameForm = document.getElementById("game-inputs-form")
let nGifs = document.getElementById("gifs-n").value
let movesCount = document.getElementsByClassName("moves-count")
let bestScore = document.getElementsByClassName("best-score")

// GLOBAL VARIABLES
let cardFlipped = false
let lockGame = false
let firstCard, secondCard
let nMatches = 0
let nClicks = 0

document.addEventListener("DOMContentLoaded", () => {
    startGameBtn[0].addEventListener("click", (event) => {
        event.preventDefault()
        nClicks = 0
        gameContainer.textContent = ""
        movesCount[0].textContent = Math.floor(nClicks / 2)
        nGifs = parseInt(document.getElementById("gifs-n").value)
        if (nGifs < 1 || nGifs > 11) {
            alert("Please enter a number between 1 and 11.")
            return
        }
        createCustomGame(nGifs)
    })
    bestScore[0].textContent = localStorage.getItem("bestScore") || "N/A"
})

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
const createDivsForColors = (colorArray) => {
    // let count = 0
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div")
        newDiv.classList.add(color)
        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick)
        // append the div to the element with an id of game
        gameContainer.append(newDiv)
    }
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
const shuffle = (array) => {
    let counter = array.length
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter)

        // Decrease counter by 1
        counter--

        // And swap the last element with it
        let temp = array[counter]
        array[counter] = array[index]
        array[index] = temp
    }
    return array
}

// TODO: Implement this function!
const handleCardClick = (event) => {
    // you can use event.target to see which element was clicked
    // console.log("you clicked", event.target)
    if (lockGame) {
        return
    }
    nClicks = nClicks + 1
    if (event.target === firstCard) {
        return
    }

    event.target.classList.add("flip")

    if (!cardFlipped) {
        // first click
        cardFlipped = event.target
        firstCard = event.target
        firstCard.style.backgroundImage = `url(${firstCard.classList[0]})`
    } else {
        // second click
        secondCard = event.target
        secondCard.style.backgroundImage = `url(${secondCard.classList[0]})`
        checkForMatch()
        // updateScoreBoard(nClicks)
    }
}

const checkForMatch = () => {
    let isMatch = firstCard.classList[0] === secondCard.classList[0]
    if (isMatch) {
        nMatches = nMatches + 1
        lockCards()
        checkAllMatched(nMatches)
    } else {
        unflipCards()
    }
    updateScoreBoard(nClicks)
}

const lockCards = () => {
    firstCard.removeEventListener("click", handleCardClick)
    secondCard.removeEventListener("click", handleCardClick)
    resetGame()
}

const unflipCards = () => {
    lockGame = true
    setTimeout(() => {
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")
        firstCard.style.backgroundImage = ""
        secondCard.style.backgroundImage = ""
        resetGame()
    }, 1000)
}

const resetGame = () => {
    cardFlipped = false
    lockGame = false
    firstCard = null
    secondCard = null
}

const checkAllMatched = (nMatches) => {
    if (nMatches === Number(document.getElementById("gifs-n").value)) {
        localStorage.setItem("lastScore", Math.floor(nClicks / 2))
        let lastScore = localStorage.getItem("lastScore")
        let bestScore = localStorage.getItem("bestScore")

        if (bestScore == null || parseInt(lastScore) < parseInt(bestScore)) {
            localStorage.setItem("bestScore", lastScore)
        }
        resetGameBtn[0].style.display = "flex"
    }
}

const updateScoreBoard = (nClicks) => {
    // nMoves = Math.floor(nClicks / 2)
    // console.log(nMoves)
    movesCount[0].textContent = Math.floor(nClicks / 2)
    bestScore[0].textContent = localStorage.getItem("bestScore")
}

resetGameBtn[0].addEventListener("click", () => {
    resetGameBtn[0].style.display = "none"
    nMatches = 0
    nClicks = 0
    gameContainer.textContent = ""
    createCustomGame(nGifs)
})

const createCustomGame = (nGifs) => {
    let pics = []
    for (let index = 1; index <= nGifs; index++) {
        pics.push(`../gifs/${index}.gif`)
    }
    createDivsForColors(shuffle(pics.concat(pics)))
}
