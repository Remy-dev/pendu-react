import React from 'react';
import PropTypes from 'prop-types';
import './Messages.css';
import {
    HINT_SAME,
    HINT_ERROR,
    WIN,
    LOOSE
} from "./selector";

const Messages = ({message}) =>
    (
        <span className="pendu__info-message">
            { message }
        </span>
    )
Messages.propsType = {
    message: PropTypes.oneOf([
        HINT_ERROR,
        HINT_SAME,
        WIN,
        LOOSE
    ])
}

export default Messages;
