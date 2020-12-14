import './App.css';
import React from "react";
import shuffle from 'lodash.shuffle';
import Letter from './Letter.js';
import Alphabet from "./alphabet";
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const WORDS = [
    'AFFICHAGE',
    'COMPREND',
    'DEUX',
    'PARTIES',
    'DEVINETTE',
    'SERIE',
    'BOUTONS',
    'ESSAI',
    'RAISON'
]


class App extends React.Component {
    state = {
        lettersToFind: this.generateLetterArray(),
        alphabet: this.generateArrayAlphabet(),
        matchedLetter: [],
        message: '',
        counter: 0,
    }

    generateArrayAlphabet() {
        return ALPHABET.split('')
    }

    generateLetterArray() {
        const crate = shuffle(WORDS)
        const word = crate.pop();
        return word.split('')
    }

    getFeedbackForLetter(letter) {
        let {  matchedLetter } = this.state;
        return matchedLetter.includes(letter) ? 'visible' : 'hidden'
    }

    handleAlphabetClick = (index) => {

        let { alphabet, lettersToFind, matchedLetter, counter } = this.state

        let letter = alphabet[index];
        if (lettersToFind.includes(letter)) {
            matchedLetter.push(letter);
            counter += 1;
            this.setState( { matchedLetter: matchedLetter, message: '', counter: counter })
        } else {
            counter += 1;
            this.setState( { message: 'Cette lettre n\'appartient pas au mot recherché', counter: counter })
        }
    }


    render() {
        const { lettersToFind, alphabet, message, counter } = this.state
        return(
            <div className="pendu">
                <span className="pendu__message">{ message }</span>
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
                <span className="pendu__counter">Nombre de coups { counter }</span>
            </div>

        )
    }

}
export default App;
