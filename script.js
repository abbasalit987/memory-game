const gameContainer = document.getElementById("game")

const COLORS = [
    ["red", "./gifs/1.gif"],
    ["blue", "./gifs/2.gif"],
    ["green", "./gifs/3.gif"],
    ["orange", "./gifs/9.gif"],
    ["purple", "./gifs/5.gif"],
    ["red", "./gifs/1.gif"],
    ["blue", "./gifs/2.gif"],
    ["green", "./gifs/3.gif"],
    ["orange", "./gifs/9.gif"],
    ["purple", "./gifs/5.gif"],
]

let cardFlipped = false
let lockGame = false
let firstCard, secondCard

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
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

let shuffledColors = shuffle(COLORS)

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div")

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color[0])
        newDiv.classList.add(color[1])

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick)

        // append the div to the element with an id of game
        gameContainer.append(newDiv)
    }
}

// TODO: Implement this function!
function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    // console.log("you clicked", event.target)
    if (lockGame) return
    if (event.target === firstCard) return

    event.target.classList.add("flip")
    // event.target.style.backgroundColor = event.target.classList[0]

    if (!cardFlipped) {
        // first click
        cardFlipped = event.target
        firstCard = event.target
        firstCard.style.backgroundImage = `url(${firstCard.classList[1]})`
        return
    }
    // second click
    secondCard = event.target
    secondCard.style.backgroundImage = `url(${secondCard.classList[1]})`
    checkForMatch()
}

function checkForMatch() {
    let isMatch = firstCard.classList[0] === secondCard.classList[0]
    isMatch ? lockCards() : unflipCards()
}

function lockCards() {
    firstCard.removeEventListener("click", handleCardClick)
    secondCard.removeEventListener("click", handleCardClick)
    resetGame()
}

function unflipCards() {
    lockGame = true

    setTimeout(() => {
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")
        // firstCard.style.backgroundColor = ""
        // secondCard.style.backgroundColor = ""
        firstCard.style.backgroundImage = ""
        secondCard.style.backgroundImage = ""

        resetGame()
    }, 1000)
}

function resetGame() {
    cardFlipped = false
    lockGame = false
    firstCard = null
    secondCard = null
}

// when the DOM loads
createDivsForColors(shuffledColors)
