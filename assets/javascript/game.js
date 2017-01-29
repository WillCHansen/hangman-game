
// need to finish isVictory method. Maybe add pictures. get commas our of strings.q


// replace index with txt in array
function arr_replace_index(arr, index, txt){
	// I know the splice function is only one line but I made a function anywaus whoops
	arr.splice(index, 1, txt)
}

// find a mathing string in array and return index or return -1 if not found
function arr_find_index(arr, txt){
	// loop through "arr"
	for (i=0; i < arr.length; i++ ) {
		// check if txt was found in and entry of arr
		if (txt === arr[i])
			// return index where it was found
			return i
	}
	// it was not found
	return -1
}

// generate hangman string. checks the correctarr against the term and returns a string with found chars
function create_cur_hang(term, correctarr){
	// initialize a blank array. I don;t know if this is necessary in this language so I'm being safe
	var outarr = []
	// loop through the amount of entries in term array
	for (i=0; i<term.length; i++){
		// add as many underscores to our putput array as there are letters in the term
		outarr.push("_");
	}
	// for each letter of our term
	for (i=0; i<term.length; i++){
		// check each letter of our correctly guessed array
		for (n=0; n<correctarr.length; n++){
			// and if you find a matching letter
			if (term[i] === correctarr[n]){
				// replace the underscore in out output array with the correct letter
				arr_replace_index(outarr, i, correctarr[n])
			}
		}
	}
	// return out oupt array
	return outarr.toString()
}

// this is the poor dude who's hanging (object)
var hangman = {
	// set initial life
	life: 5,
	// this method checks if he's dead
	isDead: function(){
		if ( this.life < 1 )
			return true
		else
			return false
	},
	// this method needs work. will check if user won
	isVictory; function(){

	}
};

// this is coding hangman so here are the terms
var codingterms = ["javascript", "styles", "hypertext", "markup", "language", "python", "coding", "bootcamp", "foobar", "rickrolled"];
// this selects a random term for the game
hangman.term = codingterms[Math.floor(Math.random() * codingterms.length)];

// here im initializing arrays to be used later. Still not sure if necessary in this language
hangman.correctarr = [];
hangman.incorrectarr = [];
hangman.guessarr = [];

// Start our routine for when a key is pressed
document.onkeydown = function(event) {
	// turn the key to lowercase for all our beautiful comparisons 
	var keypress = String.fromCharCode(event.keyCode).toLowerCase();
	// log the keypress just cuz
	console.log(keypress)
	// check if the user has already entered the key they are guessing (short term memory)
	if (arr_find_index(hangman.guessarr, keypress) >-1) {
		// politely inform user they have short term memory
		document.getElementById("message").value = "You already guessed the letter " + keypress;
	}
	else{
		// log the key to an array to check against future presses
		hangman.guessarr.push(keypress);
		// check if the keypress matches the term they are trying to guess
		if (arr_find_index(hangman.term, keypress) >-1){
			// log a correct keypress to use to generate our hangman string
			hangman.correctarr.push(keypress);
			// report to user all letters they've correctly guessed
			document.getElementById("correct").value = hangman.correctarr.toString();
			// generate a new hangman string to include their new correct guess
			document.getElementById("Hangman").value = create_cur_hang(hangman.term, hangman.correctarr);
			// message to the user that they got one right
			document.getElementById("message").value = "Correct guess letter " + keypress;
		}
		else{
			// log an incorrect keypress
			hangman.incorrectarr.push(keypress);
			// slightly kill the hanging man
			hangman.life = hangman.life-1;
			// report all letters they've incorrectly guessed
			document.getElementById("incorrect").value = hangman.incorrectarr;
			// message to the user that they got one wrong
			document.getElementById("message").value = "Incorrect guess letter " + keypress;
		}
		// message to user the hanging mans current life level
		document.getElementById("Remaining").value = hangman.life;

		// check if he ded
		if (hangman.life < 1){
			// tell them they need to get good. Every other message to the user has been polite, I think a sterner message here is justified
			document.getElementById("message").value = "GAME OVER HE'S DEAD NOW";
		}
	}
}