//App.js 
import React, { useState, useEffect } from "react"; 
import "./App.css"; 

const sampleWords = [ 
	{ 
		word: "SEINE", 
		description: "What is the name of the river that borders the Eiffel Tower?"
	}, 
	{ 
		word: "WORLD", 
		description: "The planet we live on, which is full of land and water."
	}, 
	{ 
		word: "INSECTS", 
    description:"Entomology is the science that studies"
  }, 
	{ 
		word: "SWEDEN", 
		description: "Which country has the best education system?"
	}, 
	{ 
		word: "AUSTRALIA",
    description:"The great Victoria Desert is located in" 
  }, 
	{ 
		word: "ELEPHANT", 
		description: "Which animal has a long trunk?"
	} 
]; 

const getRandomWord = () => { 
	const randomPlace = Math.floor(Math.random() * sampleWords.length); 
	return sampleWords[randomPlace]; 
}; 

const GFGWordGame = () => { 
	const [wordData, setWordData] = useState(getRandomWord()); 
	const [msg, setMsg] = useState(""); 
	const [chosenLetters, setChosenLetters] = useState([]); 
	const [hints, setHints] = useState(3); 
	const [displayWord, setDisplayWord] = useState(false); 
	const [gameOver, setGameOver] = useState(false); 
	const [wrongGuesses, setWrongGuesses] = useState(0); 

	useEffect(() => { 
		if (wrongGuesses >= 3) { 
			window.alert("Game Over! You made too many wrong guesses."); 
			restartGameFunction(); 
		} 
	}, [wrongGuesses]); 

	const letterSelectFunction = (letter) => { 
		if (!chosenLetters.includes(letter)) { 
			setChosenLetters([...chosenLetters, letter]); 
			if (!wordData.word.includes(letter)) { 
				setWrongGuesses(wrongGuesses + 1); 
			} 
		} 
	}; 

	const hintFunction = () => { 
		if (hints > 0) { 
			const hiddenLetterIndex = wordData.word 
				.split("") 
				.findIndex((letter) => !chosenLetters.includes(letter)); 
			setChosenLetters([...chosenLetters, wordData.word[hiddenLetterIndex]]); 
			setHints(hints - 1); 
		} 
	}; 

	const removeCharacterFunction = () => { 
		setChosenLetters(chosenLetters.slice(0, -1)); 
	}; 

	const displayLettersFunction = () => { 
		const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 

		return Array.from(letters).map((letter, index) => ( 
			<button 
				key={index} 
				onClick={() => letterSelectFunction(letter)} 
				disabled={chosenLetters.includes(letter)} 
				className={`letter-button ${ 
					chosenLetters.includes(letter) ? "selected" : ""
				}`} 
			> 
				{letter} 
			</button> 
		)); 
	}; 

	const checkWordGuessedFunction = () => { 
		return wordData.word.split("").every((letter) => chosenLetters.includes(letter)); 
	}; 

	const guessFunction = () => { 
		if (checkWordGuessedFunction()) { 
			setMsg("Congrats! You have guessed the word correctly!"); 
		} else { 
			setMsg("You made a Wrong Guess !. Try again!"); 
			setDisplayWord(true); 
		} 
	}; 

	const restartGameFunction = () => { 
		setWordData(getRandomWord()); 
		setMsg(""); 
		setChosenLetters([]); 
		setHints(3); 
		setDisplayWord(false); 
		setGameOver(false); 
		setWrongGuesses(0); 
	}; 

	return ( 
		<div className="container"> 
			<h1>Word Guess Game</h1> 
			<div className="word-container"> 
				{Array.from(wordData.word).map((letter, index) => ( 
					<div 
						key={index} 
						className={`letter ${ 
							chosenLetters.includes(letter) ? "visible" : ""
						}`} 
					> 
						{chosenLetters.includes(letter) ? letter : ""} 
					</div> 
				))} 
			</div> 
			<p className="word-description">Hint: {wordData.description}</p> 
			{msg && ( 
				<div className="message"> 
					<p>{msg}</p> 
					{displayWord && <p>Correct word was: {wordData.word}</p>} 
				</div> 
			)} 
			<div className="button-section"> 
				<div className="guess-section"> 
					<button 
						onClick={restartGameFunction} 
						className="restart-button"
					> 
						Restart 
					</button> 
					<button 
						onClick={removeCharacterFunction} 
						disabled={!chosenLetters.length} 
						className="remove-button"
					> 
						Remove Letter 
					</button> 
				</div> 
				<div className="letter-selection"> 
					{displayLettersFunction()} 
				</div> 
				<div className="hints"> 
					Hints Remaining: {hints}{" "} 
					<button 
						onClick={hintFunction} 
						disabled={hints === 0} 
						className="hint-button"
					> 
						Get Hint 
					</button> 
				</div> 
				{!msg && ( 
					<button 
						onClick={guessFunction} 
						disabled={!chosenLetters.length} 
						className="guess-button"
					> 
						Guess 
					</button> 
				)} 
			</div> 
		</div> 
	); 
}; 

export default GFGWordGame; 
