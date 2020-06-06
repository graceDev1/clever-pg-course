
/** Challenge 1: Age in Days*/

function onAgeDay(){
    let birthday = prompt("What's your birthday...Good people");
    let ageDay = (2020-parseInt(birthday)) * 365;
    let age = document.getElementById('ageDays');
    let h3 = document.createElement('h3');
    let result = document.createTextNode(`You are ${ageDay} days old`);
    h3.setAttribute('id','DaysOld');
    h3.appendChild(result);
    age.appendChild(h3);

}

function onReset(){
    document.getElementById('DaysOld').remove();
}

function generateCat(){
    var img = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    img.src="./images/cat.gif";
    div.appendChild(img);
}




/* HERE IS THE CHALLENCE 3 BABY */ 


function rpsGame(yourChoice)
{
    var humanChoice, botChoice;
    humanChoice = yourChoice.id
    botChoice = numberToChoice(randToRpsInt())
    var result = decideWinner(humanChoice,botChoice); // [0,1] human lost | bot won
    var message = finalMessage(result); // {'message': 'you wont', 'color': 'green'}
    rpsFrontend(yourChoice.id, botChoice, message);
}



// random function

function randToRpsInt()
{
    return Math.floor(Math.random() * 3)
}



// THE FUNCTION GET THE RANDOM NUMBER

function numberToChoice(number)
{
    return ['rock','paper','scissors'][number];
}



// THIS FUNCTION PEEK THE SCORE
function decideWinner(yourChoice, computerChoice)
{
    var rpsDatabase = {
        'rock':{'scissors':1, 'rock':0.5, 'paper': 0},
        'paper': {'rock':1, 'paper':0.5, 'scissors':0},
        'scissors': {'paper':1,'scissors':0.5, 'rock':0}
    }

    var yourScore = rpsDatabase[yourChoice][computerChoice]
    var computerScore = rpsDatabase[computerChoice][yourChoice]
    return [yourScore,computerScore]
}



// THE FUNCTION PEEK THE MESSAGE AND COLOR
function finalMessage([yourscore, computerScore])
{
    if(yourscore === 0)
    {
        return {'message':'You lost!', 'color':'red'}
    } else if(yourscore === 0.5)
    {
        return {'message': 'You tied!', 'color':'yellow'}
    } else if(yourscore === 1)
    {
        return {'message':'You win!', 'color':'green'}
    }
}



// THIS FUNCTION THE RESULT ON THE FRONTEND
function rpsFrontend(humanImage, botImage, finalMessage){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

document.getElementById('rock').remove()
document.getElementById('paper').remove()
document.getElementById('scissors').remove()

var humanDiv = document.createElement('div');
var botDiv = document.createElement('div');
var message = document.createElement('div'); 

humanDiv.innerHTML = "<img src='"+imagesDatabase[humanImage]+"' width=150 height=150 style='box-shadow: 0 10px 50px rgba(37, 50, 233, 1)'>";
message.innerHTML = "<h1 style='color:"+finalMessage['color']+"; font-size:60px; padding:30px;'>"+finalMessage['message']+"!</h1>";
botDiv.innerHTML = "<img src='"+imagesDatabase[botImage]+"' width=150 height=150 style='box-shadow: 0 10px 50px rgba(243, 38, 24, 1)'>";

document.getElementById('flex-box-rps-div').appendChild(humanDiv)
document.getElementById('flex-box-rps-div').appendChild(message)
document.getElementById('flex-box-rps-div').appendChild(botDiv)

}


/* CHALLENGE 4: CHANGE BUTTON COLOR */

var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];

for(let i=0; i< all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);

}

console.log(copyAllButtons)

function buttonColor(buttonThingy){
    if(buttonThingy.value === 'red'){
        buttonRed();
    }
    else  if(buttonThingy.value === 'green'){
        buttonGreen();
    }
    else if(buttonThingy.value === 'reset'){
        buttonColorReset();
    }
    else if(buttonThingy.value === 'random'){
        randomColor();
    }
}



function buttonRed(){
    for(let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}


function buttonGreen(){
    for(let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for(let i=0; i < copyAllButtons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]); 
        all_buttons[i].classList.add(copyAllButtons[i])
    }
}


function randomColor(){
    return Math.floor(Math.random() * all_buttons.length)
}

function colorChoice(number){
    return copyAllButtons[number]
}




function randomColor(){
   let choice = ["btn-success", "btn-primary", "btn-danger", "btn-warning", "btn-success"];
   
   for(let i=0; i< all_buttons.length; i++){
       let randomNumber = Math.floor(Math.random() * choice.length)
       all_buttons[i].classList.remove(all_buttons[i].classList[1])
       all_buttons[i].classList.add(choice[randomNumber]);
   }
}



// CHALLENGE 5: BLACKJACK GAME


let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div':'#your-box', 'score':0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div':'#dealer-box', 'score':0},
    'card': ['2','3', '4', '5','6','7','8','9','10','K', 'J','Q','A'],
    'cardMap': {'2':2,'3':3,'4':4, '5':5, '6':6, '7':7, '8':8, '9':9,'10':10, 'K':10, 'J':10, 'Q':10, 'A':[11,1]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

// for aading the sound
const hitSound = new Audio("./sounds/swish.m4a");
const winSound = new Audio('./sounds/cash.mp3');
const lossSound = new Audio('./sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackhit);

document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

// button deal
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);


function blackjackhit(){
    if(blackjackGame['isStand'] === false){
        let card = randomCard();
        showCard(card,YOU);
        updateCard(card,YOU)
        showScore(YOU)
    }
}


// showcard 
function showCard(card,activePlayer){
    if(activePlayer['score'] <= 21){
    let cardImage = document.createElement('img');
    cardImage.src="./images/"+card+".png"
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }
}

// so now we want to dealer the cardImage
// delete image and set score to 0
function blackjackDeal(){

     if(blackjackGame['turnsOver'] === true){
         blackjackGame['isStand'] = false;
        let yourImage = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImage = document.querySelector('#dealer-box').querySelectorAll('img');

        for(let i=0;i < yourImage.length; i++){
            yourImage[i].remove();
        }


        for(let i=0; i< dealerImage.length; i++){
            dealerImage[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        

        document.querySelector('#your-blackjack-result').style.color='#fff';
        document.querySelector('#dealer-blackjack-result').style.color='#fff';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true
    }
}

// random card 

function randomCard(){
    let randomindex = Math.floor(Math.random() * 13);
    return blackjackGame['card'][randomindex];
}

// update Score function

function updateCard(card, activePlayer){
    if(card === 'A'){
        if(activePlayer['score'] + blackjackGame['cardMap'][card][1] <= 21){
            activePlayer['score']+=blackjackGame['cardMap'][card][1];
        } else{
            activePlayer['score'] += blackjackGame['cardMap'][card][0]
        } 
    } else
    {
    activePlayer['score'] += blackjackGame['cardMap'][card];
    }
}

// show score function 
function showScore(activePlayer)
{
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

// dealer player, but will be coding the bot later
async function dealerLogic(){
    blackjackGame['isStand'] = true;
    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){
        let card = randomCard();
        showCard(card, DEALER);
        updateCard(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    blackjackGame['turnsOver'] =true
    let winner = computerWinner();
    showResult(winner);
 
}

// compute winner score and return who just won
// update the win, draws ans losses

function computerWinner(){
    let winner;
    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            blackjackGame['wins']++;
            winner = YOU;

        } else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;

        } else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        } 

        //condition when user busts dealer doen't

    }else if(YOU['score'] > 21 && DEALER['score'] <= 21)
        {
            blackjackGame['losses']++;
            winner = DEALER;
        }

        // when i and the dealer bust
        else if(YOU['score'] > 21 && DEALER['score'] > 21){
            blackjackGame['draws']++;
        }

        return winner;

}



function showResult(winner){

    let message, messageColor;

    if(blackjackGame['turnsOver'] === true){

        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play()

        } else if(winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost';
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew';
            messageColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}
