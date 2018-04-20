/* creating variables */
let movesCounter = 0;
const deck = document.querySelector ('.deck');
let cards = document.getElementsByClassName('card');
let matchedCards = document.getElementsByClassName("match");
let stars = document.getElementsByClassName('fa-star');
let emptyStars = document.getElementsByClassName('fa-star-o');
const restart = document.querySelector(".restart");

//timer variables
let timer = document.querySelector(".timer");
let second = 0;
let minute = 0;
let interval;
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");

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

//modals
const winnerModal = document.getElementById('winnerModal');
const loserModal = document.getElementById('loserModal');

//Function to start the game
function startGame(){
  /*shuffle cards*/
  shuffle(iconsList);
  /*empty the deck if it already exists*/
  deck.innerHTML='';
  /*Create the deck of cards*/
  deckCreation();
  /*add event listener to cards*/
  addEvent();
  /*close all cards*/
  for (let i = 0; i < (cards.length); i++) {
      cards[i].classList.remove("show", "open", "unmatch", "match");
  }
  /*reset moves*/
    movesCounter = 0;
    document.querySelector('.moves').innerHTML =movesCounter;
  /*Reset the timer*/
  	second = 0;
  	minute = 0;
    minutes.innerHTML = minute;
    seconds.innerHTML = second;
    /*reset rating*/
    var emptyLength=emptyStars.length
      for (let i = 0; i < emptyLength; i++){
      emptyStars[0].setAttribute('class','fa fa-star');
      }
}

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
      //check if the player won the game
      cards[i].addEventListener('click', winner);
  }
}

// Function for flipping card when clicked
function flipCard() {
  //start timer
  if (minute === 0 && second === 0){
		startTimer();
	}
  let cardListLength = flippedCardList.length;
	if((cardListLength < 2) && (!this.classList.contains('open'))){
    //add clicked card to the flipped card Array
    flippedCardList.push(this);
    //add open class to clicked card
    this.classList.add('open', 'show');
    if(cardListLength !== 0){
    cardMatch();
    rating();
    }
  }
}

//Function for timer
function startTimer(){
  clearInterval(interval);
	interval = setInterval(function(){
    minutes.innerHTML = minute;
    seconds.innerHTML = second;
		second++;
		if(second === 60){
			second = 0;
      minute++;
	  }
    if (minute > 10){
      gameOver();
    }
	}, 1000);
}

// Function to test if cards are Matching
function cardMatch () {
  if (flippedCardList[0].innerHTML === flippedCardList[1].innerHTML){
    flippedCardList[0].classList.add('match', 'tada');
	  flippedCardList[1].classList.add('match', 'tada');
    flippedCardList = [];
    //add move when clicked
    addMove();
  }
  else if (flippedCardList[0].innerHTML != flippedCardList[1].innerHTML){
    flippedCardList[0].classList.add('unmatch', 'wobble');
    flippedCardList[1].classList.add('unmatch', 'wobble');
    addMove();
    setTimeout(function(){
      flippedCardList[0].classList.remove('show', 'open', 'unmatch', 'wobble');
  		flippedCardList[1].classList.remove('show', 'open', 'unmatch', 'wobble');
      flippedCardList = [];
  	}, 1200);
  }
}

// Function for moves counter
function addMove(){
  movesCounter += 1;
  document.querySelector('.moves').innerHTML = movesCounter;
}

// Function to change star rating
function rating(){
  if (movesCounter === 11){
    stars[2].setAttribute('class','fa fa-star-o');
  }
  else if (movesCounter === 21){
    stars[1].setAttribute('class','fa fa-star-o');
  }
  else if (movesCounter === 31){
    stars[0].setAttribute('class','fa fa-star-o');
  }
}

//Add event lister for click on restart
restart.addEventListener('click', reset);

//Function for resetting
function reset(){
/*reset list of open cards*/
  flippedCardList = [];
  startGame();
}

//Winning Function
/*function showing the modal with congratulations*/
function winner(){
	if(matchedCards.length == 16){
    /*Stop the timer*/
    clearInterval(interval);
		/*save the time took to win*/
    let yourTime = timer.innerHTML;
		/*save the final star rating*/
		let yourRating = document.querySelector(".stars").innerHTML;
    /*show modal popup*/
		winnerModal.style.display = "block";
		/*show results on modal*/
		document.getElementById("yourMoves").innerHTML = movesCounter;
		document.getElementById("yourRating").innerHTML = yourRating;
		document.getElementById("yourTime").innerHTML = yourTime;
	}
}

/*function to close the winner the modal*/
let closeSpan = document.querySelector('.close');
closeSpan.onclick = function() {
  winnerModal.style.display = "none";
  reset();
};

//Start new game when clicking on button inside modal
document.querySelector(".restartButton").addEventListener("click", function(){
	winnerModal.style.display = "none";
  reset();
});


//Stop the game - timeout after 10 minutes
function gameOver(){
  clearInterval(interval);
  loserModal.style.display = "block";

//function to close the loser modal
  let closeLoser = document.querySelector('.closeLoser');
  closeLoser.onclick = function() {
      loserModal.style.display = "none";
      reset();
  };

  //Start new game when clicking on button inside loser modal
  document.querySelector(".restartLoser").addEventListener("click", function(){
    loserModal.style.display = "none";
  	startGame();
  });
}

//close modal if the user clicks outside of the modal
window.onclick = function (e) {
  if (e.target == winnerModal) {
     winnerModal.style.display = "none";
  }
  else if (e.target == loserModal) {
     loserModal.style.display = "none";
  }
};

document.addEventListener('DOMContentLoaded', function() {
startGame();
});
