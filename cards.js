/***
	Deck Managing Functions
***/

var playingCards = function() {
	this.cardDeck = [];
	return this;
	};
	
playingCards.prototype.buildDeck = function() {
	
	/***
		Generates Deck
		-Gives each card a number ranking for sorting later
		-Uses HTML symbols for Suits, to understand visually
	***/
	
	var cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
	var suits = ['&diams;', '&clubs;', '&hearts;', '&spades;'];
	
	var rank = 0, i, x;
	
	for(i = 0;i<cards.length;i++) {
		for(x = 0;x<suits.length;x++) {
			this.cardDeck.push({"rank":rank,"card":""+cards[i]+suits[x]+""});
			rank++;
			}
		}
		
	}
		
playingCards.prototype.shuffle = function() {
			
	/***
		Shuffles Deck
	***/
			
	var count = this.cardDeck.length, swap, randomIndex;
			
	while(count--) {
			
		randomIndex = (Math.random() * count) | 0;
				
		swap = this.cardDeck[count];
		this.cardDeck[count] = this.cardDeck[randomIndex];
		this.cardDeck[randomIndex] = swap;
				
		}
				
	}		
	
playingCards.prototype.sort = function() {

	/***
		Wrote a function to sort the deck,
		rather than just re generating
		a new one.
	***/

	var i, sortedDeck = [];

	for(i = 0;i<this.cardDeck.length;i++) {
			
		sortedDeck.push(
			this.cardDeck.filter( 
				function (obj) { 
					return obj.rank == i; 
					}
				)[0]
			);
			
		}

	this.cardDeck = sortedDeck;
			
	}
	
playingCards.prototype.show = function() {
		
	/***
		Displays Deck at top
		Cards wont be shown until this 
		is called.
	***/
		
	var i;	
		
	document.getElementById('deckView').innerHTML = "";	
		
	for(i = 0;i<this.cardDeck.length;i++)
		document.getElementById('deckView').innerHTML += this.cardDeck[i].card + ", ";
		
	}	
	
playingCards.prototype.deal = function(playerList) {

	/***
		Deals to all players
	***/

	var x = 0, i;

	for(i = 0;i<playerList.length;i++) {
					
		playerList[i].cards = [];
					
		}
		
	while(x < this.cardDeck.length) {
		for(i = 0;i < playerList.length;i++) {
					
			playerList[i].cards.push(this.cardDeck[x]);
			x++;
					
			if(x >= this.cardDeck.length)
				break;
					
			}
		}
				
	}
	
/***
	Player Functions
***/

var playerObj = function() {

	this.playerList = [];
	
	}

var newPlayer = function() {
	
	this.currentCards = [];
	
	}
		
playerObj.prototype.showPlayerInfo = function() {
	
	/***
		Displays what cards a player currently has
	***/
	
	var i, x, data = "";
		
	for(i = 0;i<this.playerList.length;i++) {
			
		data += "Player " + i + ": ";
			
		for(x = 0;x<this.playerList[i].cards.length;x++) {
				
			data += this.playerList[i].cards[x].card + ", ";
				
			}

		data += "<br>";	
				
		document.getElementById('playerHands').innerHTML = data;
		
		}
	
	}
			
playerObj.prototype.createPlayers = function(amount) {

	/***
		Creates new player objects
	***/

	var i;

	for(i = 0;i < amount;i++) {
		if(this.playerList.length >= 52) {
			alert("Maximum number of players reached.");
			break;
			}
		this.playerList.push(new newPlayer());
		}
		
	document.getElementById('playerCountDisplay').innerHTML = this.playerList.length;
		
	}

/***
	Startup Functions
***/

var currentGame = new playingCards();
currentGame.buildDeck();

var currentPlayers = new playerObj();
currentPlayers.createPlayers(1);
	
/***
	Event Listeners
***/
	
document.getElementById('shuffler').addEventListener("click", 
	function() { 
		currentGame.shuffle(); 
		}
	);
	
document.getElementById('dealer').addEventListener("click", 
	function() { 
		currentGame.deal(currentPlayers.playerList);
		currentPlayers.showPlayerInfo(); 
		}
	);
	
document.getElementById('sorter').addEventListener("click", 
	function() { 
		currentGame.sort(); 
		}
	);
	
document.getElementById('shower').addEventListener("click", 
	function() { 
		currentGame.show(); 
		}
	);
	
document.getElementById('addPlayerButton').addEventListener("click", 
	function() { 
		currentPlayers.createPlayers(document.getElementById('playerCountInput').value); 
		document.getElementById('playerCountInput').value = ""; 
		}
	);