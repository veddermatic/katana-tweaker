import React from 'react';
import PropTypes from 'prop-types';
import loadIcon from '../assets/loadIcon_12.svg';


/**
 * lbl - get label for the button component based on a bool
 *
 * @param {bool} isOpen - Is the dropzone open in the app?
 * @returns {string} - A label for the button
 */
const lbl = isOpen => isOpen ? ' cancel' : ' load new .tsl'; 

/**
 * LoadFileButton - a button to hide / show the drop zone after a file has been loaded.
 *
 * @param {object} props - Props for the component
 * @param {function} props.clickHandler - Function to call when we are clicked
 * @param {string}   props.dropzoneOpen - Is the drop zone currently open
 * @returns {object} - React component that you can click on. 
 */
const LoadFileButton = ({
    clickHandler, dropzoneOpen
}) => (
    <button className="Liveset__button Liveset__button--load" onClick={ clickHandler }>
        <img src={ loadIcon } alt="load" className="Liveset__buttonIcon" />
        <span>{ lbl( dropzoneOpen ) }</span>
    </button>
);
LoadFileButton.propTypes = {
    dropzoneOpen: PropTypes.bool.isRequired,
    clickHandler: PropTypes.func.isRequired
};
export default  LoadFileButton;
