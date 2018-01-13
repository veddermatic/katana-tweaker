import React from 'react';
import PropTypes from 'prop-types';

import dlIcon from '../assets/downloadIcon_12.svg';

/**
 * DownloadButton - a button to click to save
 *
 * @param {object} props - Props for the component
 * @param {function} props.clickHandler - Function to call when we are clicked
 * @returns {object} - React component that you can click on. 
 */
const DownloadButton = ({
    clickHandler
}) => (
    <button className="Liveset__button" onClick={ clickHandler }>
        <img src={ dlIcon } alt="download" className="Liveset__buttonIcon" />
        <span>save .tsl file</span>
    </button>
);
DownloadButton.propTypes = {
    clickHandler: PropTypes.func.isRequired
};
export default  DownloadButton;
