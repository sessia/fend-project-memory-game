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

// Add event listener for click on card
function addEvent () {
  let cards = document.getElementsByClassName('card');
  for (let i = 0; i < (cards.length); i++) {
    cards[i].addEventListener('click', flipCard);
  }
}

// Function for flipping card when clicked

function flipCard() {
  let cardListLength = flippedCardList.length;
	if(cardListLength < 2){
    //add clicked card to the flipped card Array
    flippedCardList.push(this);
    //add open class to clicked card
    this.classList.add('open', 'show');
    cardMatch();
  }
}

// Function for moves counter
function addMove(){
  movesCounter += 1;
  document.querySelector('.moves').innerHTML = movesCounter;
}

// Function to test if cards are Matching
function cardMatch () {
  if (flippedCardList[0].innerHTML === flippedCardList[1].innerHTML){
    flippedCardList[0].classList.add('match');
	  flippedCardList[1].classList.add('match');
    flippedCardList = [];
    //add move when clicked
    addMove();
  }
  else if (flippedCardList[0].innerHTML != flippedCardList[1].innerHTML){
    flippedCardList[0].classList.add('unmatch');
    flippedCardList[1].classList.add('unmatch');
    addMove();
    setTimeout(function(){
      flippedCardList[0].classList.remove("show", "open", "unmatch");
  		flippedCardList[1].classList.remove("show", "open", "unmatch");
      flippedCardList = [];
  	  }, 1200);
  }
}


document.addEventListener('DOMContentLoaded', function() {
//shuffle cards
shuffle(iconsList);
deckCreation();
addEvent();
})
