/* creating variables */
let movesCounter = 0;
let deck = document.querySelector ('.deck');

//array of icons
const iconsList = [
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-bolt',
  'fa-cube',
  'fa-leaf',
  'fa-bicycle',
  'fa-bomb',
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-bolt',
  'fa-cube',
  'fa-leaf',
  'fa-bicycle',
  'fa-bomb'
]

//array of clicked cards
let flippedCardList = [];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



// Create deck of cards
function deckCreation(){
  for (let i = 0; i < iconsList.length; i++) {
    //create li element with card class
    let cardLi = document.createElement('li');
    cardLi.classList.add('card');
    //create icon inside li element
    let cardIcon = document.createElement('i');
    cardIcon.classList.add('fa', iconsList[i]);
    cardLi.appendChild(cardIcon);
    //append card to deck
    deck.appendChild(cardLi);
  }
}


// Function for flipping card when clicked
function flipCard() {
  //add move when clicked
  movesCounter += 1;
  //add clicked card to the flipped card penCardArray
  this.classList.add('open', 'show');
  //add open class to clicked card
  }



// Add event listener for click on card
function addEvent () {
  let cards = document.getElementsByClassName('card');
  for (let i = 0; i < (cards.length); i++) {
    cards[i].addEventListener('click', flipCard);
  }
}



document.addEventListener('DOMContentLoaded', function() {
//shuffle cards
shuffle(iconsList);
deckCreation();
addEvent();
})
