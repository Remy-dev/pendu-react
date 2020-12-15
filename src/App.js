import './App.css';
import React from "react";
import shuffle from 'lodash.shuffle';
import Letter from './Letter.js';
import Alphabet from "./alphabet";
import Messages from "./Messages";

import {
    HINT_ERROR,
    HINT_SAME,
    HINT,
    WIN,
    LOOSE,
    ALPHABET,
    WORDS,
    NEW
} from "./selector";

class App extends React.Component {
    state = {
        lettersToFind: this.generateLetterArray(),
        alphabet: this.generateArrayAlphabet(),
        matchedLetter: [],
        playedLetter: [],
        messages: [],
        counter: 0,
        newGame: false,
        end: false,
    };

    resetGame = () => {
        this.setState({
            lettersToFind: this.generateLetterArray(),
            alphabet: this.generateArrayAlphabet(),
            matchedLetter: [],
            playedLetter: [],
            messages: [],
            counter: 0,
            newGame: false,
        })
    };
    componentDidMount() {
       document.addEventListener("keydown", this.handleKeydown)

    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeydown)
    }

    handleKeydown = (event) => {

       let lowerLetter = event.key;
       let upperLetter = lowerLetter.toUpperCase();
       this.controlHint(upperLetter);
    }

    generateArrayAlphabet() {
        return ALPHABET.split('')
    };

    generateLetterArray() {
        const crate = shuffle(WORDS)
        const word = crate.pop();
        return word.split('')
    };

    getFeedbackForLetter(letter) {
        let {  matchedLetter } = this.state;
        return matchedLetter.includes(letter) ? 'visible' : 'hidden'
    };

    handleAlphabetClick = (index) => {
        const {end} = this.state;
        if (!end){
            const { alphabet } = this.state
            let letter = alphabet[index];
            this.controlHint(letter);
        } else {
            this.setState({messages: [NEW]})
        }
    }

    controlHint = (letter) => {

        const { playedLetter, matchedLetter, lettersToFind } = this.state;
        let { counter } = this.state;

        if( counter > HINT) {
            let word = lettersToFind.toString();
            let cleanWord = word.replaceAll(',', '');
            this.setState({end: true, messages: [LOOSE +  ` le mot a trouvé était : ${cleanWord}` ]});
        }

        if (playedLetter.includes(letter)) {

            this.setState( { messages: [HINT_SAME]});

        } else if (lettersToFind.includes(letter)) {

            lettersToFind.forEach((element) => {
                if (element === letter )
                {
                    matchedLetter.push(letter);
                }
            })

            if (lettersToFind.length === matchedLetter.length )
            {
                this.setState({end: true, messages:[WIN]})
            }

            playedLetter.push(letter);

            counter += 1;
            this.setState( { matchedLetter: matchedLetter, counter: counter, playedLetter: playedLetter })

        } else {
            playedLetter.push(letter);
            counter += 1;
            this.setState( { messages: [HINT_ERROR] , counter: counter, playedLetter: playedLetter })
        }
    }

    render() {
        const { lettersToFind, alphabet, messages, counter } = this.state;
        return(
            <div className="pendu">
                <h1 className="pendu__title">P E N D U - react style</h1>
                <div className="pendu__mask">
                    {
                        lettersToFind.map((letter, index) =>(
                            <Letter
                                letter={letter}
                                feedback={this.getFeedbackForLetter(letter)}
                                index={index}
                                key={index}
                            />
                        ) )
                    }
                </div>

                <div className="pendu__piano">
                    {
                        alphabet.map((alphabetLetter, index) => (
                            <Alphabet
                                alphabet={alphabetLetter}
                                index={index}
                                key={index}
                                onClick={this.handleAlphabetClick}

                            />
                        ))
                    }
                </div>
                <div className="pendu__info">
                    <span className="pendu__info-counter">Nombre de coups { counter }</span>
                    {
                        messages.length > 0 && messages.map((message, index) => (
                            <Messages
                                message={message}
                                Key={index}
                            />
                        ))
                    }

                </div>

                <button className="pendu__newGame" onClick={this.resetGame}>Nouvelle partie</button>
            </div>

        )
    }

}
export default App;
