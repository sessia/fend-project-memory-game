/* creating variables */
let movesCounter = 0;
const deck = document.querySelector ('.deck');
const stars = document.getElementsByClassName('fa-star');
const restart = document.querySelector(".restart");
let cards = document.getElementsByClassName('card');

//timer variables
let timer = document.querySelector(".timer");
let second = 0;
let minute = 0;
let hour = 0;
let interval;


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
  for (let i = 0; i < (cards.length); i++) {
      cards[i].addEventListener('click', flipCard);
  }
}

// Function for flipping card when clicked

function flipCard() {
  //start timer
  if (minute === 0 && hour === 0 && second === 0){
		startTimer();
	}
  let cardListLength = flippedCardList.length;
	if((cardListLength < 2) && (!this.classList.contains('open'))){
    //add clicked card to the flipped card Array
    flippedCardList.push(this);
    //add open class to clicked card
    this.classList.add('open', 'show');
    if(cardListLength != 0){
    cardMatch();
    rating();
  }
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

// Function to change star rating
function rating(){

  if (movesCounter === 6){
    stars[2].setAttribute('class','fa fa-star-o');
  }
  else if (movesCounter === 11){
    stars[1].setAttribute('class','fa fa-star-o');
  }
  else if (movesCounter === 16){
    stars[0].setAttribute('class','fa fa-star-o');
  }
}

//Function for timer
function startTimer(){
		interval = setInterval(function(){
    let minutes = document.querySelector(".minutes");
    let seconds = document.querySelector(".seconds");
		minutes.innerHTML = minute;
    seconds.innerHTML = second;
		second++;
		if(second === 60){
			second = 0;
      minute++;

		}
		if(minute === 60){
			minute = 0;
      hour++;
		}
	}, 1000);
}


//Add event lister for click on restart
restart.addEventListener('click', reset);

//Function for resetting
function reset(){
/*reset list of open cards*/
  flippedCardList = [];

/*close all cards*/
for (let i = 0; i < (cards.length); i++) {
    cards[i].classList.remove("show", "open", "unmatch", "match");
}

/*reset moves*/
  movesCounter = 0;
  document.querySelector('.moves').innerHTML =movesCounter;

/*reset rating*/
	stars[0,1,2].setAttribute('class','fa fa-star');

/*Reset the timer*/
	clearInterval(interval);
	second = 0;
	minute = 0;
	hour = 0;
  let minutes = 0;
  let seconds = 0;
}

//Stop the game - timeout after 1 hour
if (hour === 1){

}

document.addEventListener('DOMContentLoaded', function() {
//shuffle cards
shuffle(iconsList);
deckCreation();
addEvent();

})
