import React from 'react';
import PropTypes from 'prop-types';

const HIDDEN_SYMBOL = '_'

const Letter = ({ letter, feedback, index }) =>
    (
        <div className={`pendu__mask-letter ${feedback}`}>
            <span className="pendu__mask-letter symbol">
                {feedback === 'hidden' ? HIDDEN_SYMBOL: letter}
            </span>
        </div>
    )

Letter.propTypes = {
    letter: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'hidden',
        'visible'
    ]).isRequired,
    index: PropTypes.number.isRequired,
}

export default Letter
