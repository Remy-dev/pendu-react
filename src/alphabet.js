import React from 'react';
import PropTypes from 'prop-types';

const Alphabet = ({ alphabet, index, onClick }) => {

    return(
    <div className={`pendu__piano-alphabet ${alphabet}`} onClick={() => onClick(index)}>
        <span className="pendu__piano-alphabet symbol">
            {alphabet}
        </span>
    </div>)
}
Alphabet.propTypes = {
    alphabet: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}
export default Alphabet
