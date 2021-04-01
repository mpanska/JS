document.addEventListener('DOMContentLoaded', () =>{

    // creating the board
    const board = document.querySelector('#board')

    var guessedCards = [];
    var guessedCardsIDs = [];
    var winCards = [];
    const result = document.querySelector('#result');

    const cards = [
        {
            name: 'alien',
            img: 'images/alien.png'
        },
        {
            name: 'banana',
            img: 'images/banana.png'
        },
        {
            name: 'book',
            img: 'images/goose.png'
        },
        {
            name: 'cat',
            img: 'images/cat.png'
        },
        {
            name: 'donut',
            img: 'images/donut.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'alien',
            img: 'images/alien.png'
        },
        {
            name: 'banana',
            img: 'images/banana.png'
        },
        {
            name: 'book',
            img: 'images/goose.png'
        },
        {
            name: 'cat',
            img: 'images/cat.png'
        },
        {
            name: 'donut',
            img: 'images/donut.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        }
    ]
    // randomizing our cards
    cards.sort(()=> 0.5 - Math.random());


    // initialize game board
    function initBoard(){
        for(let i = 0; i < cards.length; i++){
            var card = document.createElement('img');
            card.setAttribute('src', 'images/back.png');
            // set an attribute for card element on the board
            card.setAttribute('data-id', i);
            card.setAttribute('class', 'card');
            card.addEventListener('click', flip);
            board.appendChild(card);
        }

        $( ".card" ).wrap( "<div class='grid-item'></div>" );
    }

    // check matches
    function checkMatch(){
        const allCards = document.querySelectorAll('img');
        const firstCardID = guessedCardsIDs[0];
        const secondCardID = guessedCardsIDs[1];

        if(firstCardID == secondCardID){
            allCards[firstCardID].setAttribute('src', 'images/back.png');
            allCards[secondCardID].setAttribute('src', 'images/back.png');
            alert('it is the same card');
        }
        else if(guessedCards[0] === guessedCards[1]){
            alert('Match!');
            allCards[firstCardID].setAttribute('src', 'images/blank.png');
            allCards[secondCardID ].setAttribute('src', 'images/blank.png');
            allCards[firstCardID].removeEventListener('click', flip);
            allCards[secondCardID].removeEventListener('click', flip);
            winCards.push(guessedCards);
        }
        else{
            allCards[firstCardID].setAttribute('src', 'images/back.png');
            allCards[secondCardID].setAttribute('src', 'images/back.png');
            alert('no match');
        }

        guessedCards = [];
        guessedCardsIDs = [];
        result.textContent = winCards.length;
        if(winCards.length === cards.length/2){
            result.textContent = 'You won!!!';
        }
    }

    //flip cards
    function flip(){
        let cardID = this.getAttribute('data-id');
        guessedCards.push(cards[cardID].name);
        guessedCardsIDs.push(cardID);
        this.setAttribute('src', cards[cardID].img)
        if(guessedCards.length === 2){
            setTimeout(checkMatch, 500)
        }
    }

    initBoard();
})