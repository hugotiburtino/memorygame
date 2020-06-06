/**
 * MEMORY GAME
 */

const anchor = "fa fa-anchor", diamond = "fa fa-diamond",
      plane = "fa fa-paper-plane-o", bolt = "fa fa-bolt",
      cube = "fa fa-cube", leaf = "fa fa-leaf",
      bicycle = "fa fa-bicycle", bomb = "fa fa-bomb";

      let deck = [anchor, anchor, diamond, diamond, plane, plane, bolt, bolt,
              cube, cube, leaf, leaf, bicycle, bicycle, bomb, bomb];

const card = document.getElementsByClassName("card");

let allCards = [...card];

let listOfOpenCards = [];

let indexOpenCards = 0;

let moveCounter = 0;

const moveCounterElement = document.querySelector('.moves');

const star = document.getElementsByClassName("fa-star");

let allstars = [...star];

let updateTimer;

let timerElement = document.querySelector('.timer');

timerElement.textContent = 0;

let restart = document.querySelector('.restart');

restart.addEventListener('click', startGame);

/**
 * Put all variables to the start condition, 
 * stop timer and shuffle the deck
 */
function startGame() {
    timerElement.textContent = 0;
    stopTimer();
    moveCounter = 0;
    moveCounterElement.textContent = moveCounter;
    for(let item of listOfOpenCards) {
        let cardClasses = item.classList;
        cardClasses.remove("open", "show", "match");
    }
    for(let emptyStar of allstars) {
        let starClass = emptyStar.classList;
        if (starClass.contains("fa-star-o")) {
            starClass.remove("fa-star-o")
            starClass.add("fa-star");
        }
    }
    listOfOpenCards = [];
    indexOpenCards = 0;
    shuffleTheDeck();
    addCardToPage(allCards, deck);
    setUpEventListener(allCards, makeMove);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * Shuffle the list of cards using the provided shuffel algorithm 
 */
function shuffleTheDeck() { deck = shuffle(deck); } 

/**
 * Loop through each card and create its HTML
 *  and add each card's HTML to the page
 *
 * @param {array of HTMLLIElements} cardplaces 
 * @param {array of strings} values 
 */
function addCardToPage(cardplaces, values) {
    for (let index in cardplaces) {
        cardplaces[index].childNodes[1].className = values[index];
    }
}

/*
 * Set up the event listener for a card
 */
 function setUpEventListener(targets, functionToRun) {
    for (let trgt of targets) {
        trgt.addEventListener("click", functionToRun);
   }
 }

/**
 * Handle all actions related to a click on a card
 */
function makeMove() {
    incrementMoveCounter();
    this.removeEventListener("click", makeMove);
    displaySymbol(this);
    addCardToListOfOpenCards(this);
    if (listOfOpenCards.length % 2 === 0) {
      checkMatch();
    }
}

/**
 * Display the card symbol
 * 
 * @param {HTMLLIElement} clickedCard 
 */
function displaySymbol(clickedCard) {
    let cardClasses = clickedCard.classList;
    cardClasses.add("open", "show");
}

/**
 * Add the card to a array of "open" cards
 * 
 * @param {HTMLLIElement} displayedCard 
 */
function addCardToListOfOpenCards (displayedCard) {
    listOfOpenCards.push(displayedCard);
}

/**
 * Check if the two last open cards match
 */
function checkMatch() {
    const cardClicked1 = listOfOpenCards[indexOpenCards];
    const cardClicked2 = listOfOpenCards[indexOpenCards + 1]
    if (cardClicked1.childNodes[1].className ===
        cardClicked2.childNodes[1].className) {
            lockMatchedCards(cardClicked1, cardClicked2);
    }
    else {
        hideCards(cardClicked1, cardClicked2);
    }
}

/**
 *
 * Lock the cards in the open position
 *
 * @param {HTMLLIElement} card1 
 * @param {HTMLLIElement} card2 
 */
function lockMatchedCards(card1, card2) {
    let cardClasses1 = card1.classList;
    let cardClasses2 = card2.classList;
    cardClasses1.remove("open", "show");
    cardClasses2.remove("open", "show");
    cardClasses1.add("match");
    cardClasses2.add("match");
    indexOpenCards += 2;
    checkIfWon(); 
}

/**
 * 
 * Remove the cards from the list and hide the card's symbol
 * 
 * @param {HTMLLIElement} card1 
 * @param {HTMLLIElement} card2 
 */
function hideCards (card1, card2) {
    
    let cardClasses1 = card1.classList;
    let cardClasses2 = card2.classList;

    setTimeout ( () => {
        cardClasses1.remove("open", "show");
        cardClasses2.remove("open","show");
        card1.addEventListener("click", makeMove);
        card2.addEventListener("click", makeMove);
        }, 1000)

    listOfOpenCards.pop();
    listOfOpenCards.pop();
}

/**
 * Check if there is a winning condition
 */
function checkIfWon() {
    if (listOfOpenCards.length === 16) {
      displayWinnerModal()
    }
}

/**
 * Increment the move counter and display it on the page
 * Also inform the counter when the game started and 
 * when to remove one star 
 */
function incrementMoveCounter () {
    ++moveCounter;
    if (moveCounter % 2 === 0) {
        moveCounterElement.textContent = moveCounter / 2;
    }
    if(moveCounter === 1) {
        startTimer();
    }
    if (moveCounter === 32) {
        removeStar(2);
    }
    if (moveCounter === 64) {
        removeStar(1);
    }
}

/**
 * Remove one star
 * @param {number} index 
 */
function removeStar(index) {
    let starClass = allstars[index].classList;
    starClass.remove("fa-star");
    starClass.add("fa-star-o");
}

/**
 * Start the timer
 */
function startTimer() {
    updateTimer = setInterval ( () => {
          timerElement.textContent++;
        }, 1000)
}

/**
 * Stop the timer
 */
function stopTimer () {
    clearInterval(updateTimer);
}

/**
 * Display the modal
 */
function displayWinnerModal() {
    stopTimer ();
    for(let item of allCards) {
      item.removeEventListener("click", makeMove);
    }
    let modalElement = document.querySelector('.modal');
    setModalText(modalElement);
    modalElement.style.display = 'block';
}

/**
 * Get information for the modal
 * @param {HTMLDivElement} element 
 */
function setModalText(element) {
    let fullStars = document.getElementsByClassName('fa-star');
    let modalText = `<h2>CONGRATULATIONS</h2>
      Stars: ${fullStars.length}<br>
      Moves: ${moveCounterElement.textContent}<br>
      Time: ${timerElement.textContent} seconds<br>
      <input type="button" onclick="closeModal(), startGame()" value="Play again!">
      <input type="button" onclick="closeModal()" value="Cancel">`
    element.innerHTML = modalText;
}

/**
 * Close the modal
 */
function closeModal() {
    let modalElement = document.querySelector('.modal');
    setModalText(modalElement);
    modalElement.style.display = 'none';
}

startGame();
