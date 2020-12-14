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
        playedLetter: [],
        message: '',
        counter: 0,
        end: false,
        newGame: false,
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

        const { alphabet, lettersToFind, matchedLetter, playedLetter } = this.state
        let { counter, end} = this.state
        let letter = alphabet[index];

        if (counter > 9) {

            end = true
            this.setState({end: end});

        } else if (playedLetter.includes(letter)) {

            this.setState( { message: 'Cette lettre a déjà été jouée'});

        } else if (lettersToFind.includes(letter)) {
            playedLetter.push(letter);
            matchedLetter.push(letter);
            counter += 1;
            this.setState( { matchedLetter: matchedLetter, message: '', counter: counter, playedLetter: playedLetter })
        } else {

            playedLetter.push(letter);
            counter += 1;
            this.setState( { message: 'Cette lettre n\'appartient pas au mot recherché', counter: counter, playedLetter: playedLetter })
        }
    }

    handleEndgame = () => {
        const { matchedLetter, lettersToFind, counter} = this.state
        if (matchedLetter.length === lettersToFind.length) {
            this.setState({ message: `Bravo vous avez gagné la partie en ${counter} coups`, end: false, newGame: true })

        } else {
            this.setState( { message: `Perdu ! le mot a trouvé était ${lettersToFind}`, end: false, newGame: true });
        }
    }

    render() {
        const { lettersToFind, alphabet, message, counter, end, newGame } = this.state
        return(
            <div className="pendu">
                <p className="pendu__message">{ message }</p>

                <span className="pendu__state-hidden">{ end && this.handleEndgame() }</span>
                <button className={ newGame ? "pendu__newGame" : "pendu__newGame-hidden"}><a href="/">Nouvelle partie ?</a></button>
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
