
// need to finish isVictory method. Maybe add pictures. get commas our of strings.q


// replace index with txt in array
function arr_replace_index(arr, index, txt){
	arr.splice(index, 1, txt)
}

// find a mathing string in array and return index or return -1 if not found
function arr_find_index(arr, txt){
	for (i=0; i < arr.length; i++ ) {
		if (txt === arr[i])
			return i
	}
	return -1
}

// generate hangman string. checks the correctarr against the term and returns a string with found chars
function create_cur_hang(term, correctarr){
	var outarr = []
	for (i=0; i<term.length; i++){
		outarr.push("_");
	}
	for (i=0; i<term.length; i++){
		for (n=0; n<correctarr.length; n++){
			if (term[i] === correctarr[n]){
				arr_replace_index(outarr, i, correctarr[n])
			}
		}
	}
	return outarr.toString()
}

var hangman = {
	life: 5,
	isDead: function(){
		if ( this.life < 1 )
			return true
		else
			return false
	},
	isVictory; function(){

	}
};

var codingterms = ["javascript", "styles", "hypertext", "markup", "language", "python", "coding", "bootcamp", "foobar", "rickrolled"];
hangman.term = codingterms[Math.floor(Math.random() * codingterms.length)];
hangman.correctarr = [];
hangman.incorrectarr = [];
hangman.guessarr = [];

document.onkeydown = function(event) {
	var keypress = String.fromCharCode(event.keyCode).toLowerCase();
	console.log(keypress)
	if (arr_find_index(hangman.guessarr, keypress) >-1) {
		document.getElementById("message").value = "You already guessed the letter " + keypress;
	}
	else{
		hangman.guessarr.push(keypress);
		if (arr_find_index(hangman.term, keypress) >-1){
			hangman.correctarr.push(keypress);
			document.getElementById("correct").value = hangman.correctarr.toString();
			document.getElementById("Hangman").value = create_cur_hang(hangman.term, hangman.correctarr);
			document.getElementById("message").value = "Correct guess letter " + keypress;
		}
		else{
			hangman.incorrectarr.push(keypress);
			hangman.life = hangman.life-1;
			document.getElementById("incorrect").value = hangman.incorrectarr;
			document.getElementById("message").value = "Incorrect guess letter " + keypress;
		}
		// Set the current hangman life value
		document.getElementById("Remaining").value = hangman.life;

		// check if he ded
		if (hangman.life < 1){
			document.getElementById("message").value = "GAME OVER HE'S DEAD NOW";
		}
	}
}


console.log(hangman.term)

var outstr = "";

var guess_arr = [];


