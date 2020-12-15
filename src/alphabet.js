import React from 'react';
import PropTypes from 'prop-types';
import './alphabet.css';

const Alphabet = ({ alphabet, index, onClick }) => {

    return(
    <button  className={`pendu__piano-alphabet ${alphabet}`} onClick={() => onClick(index)}>
        { alphabet }
    </button>)
}
Alphabet.propTypes = {
    alphabet: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}
export default Alphabet
