import React from 'react';
import PropTypes from 'prop-types';

import closeIcon from '../assets/deleteIcon_roundRed.svg';

/**
 * ErrorMessage - Show a dismissable error message
 *
 * @param {object} props - Props for the component
 * @param {function} props.closeAction - Function to call when user clicks
 * @param {string}   props.message - Message to show the user
 * @returns {object} - React component
 */
const ErrorMessage = ({
    message, closeAction
}) => (
    <div className="message--error" onClick={ closeAction }>
        <span>{ message }</span>
        <img src={ closeIcon } alt="close" />
    </div>
);
ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    closeAction: PropTypes.func.isRequired,
};
export default  ErrorMessage;
