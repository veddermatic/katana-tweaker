import React from 'react';
import PropTypes from  'prop-types';

import PatchDisplay from './PatchDisplay';
import PatchDetailsWrapper from './PatchDetailsWrapper';


/**
 * Displays high level information on a liveset
 *
 * @param {object} props - Properties for the display
 * @param {object[]} props.liveset - Collection of Katana patches
 * @param {function} props.patchSelected - Handler when user selects a patch
 * @param {number}   props.selectedPatchIndex - Index of the user selected patch
 * @returns {obejct} - React component
 */
const LivesetDisplay = ({
    liveset, selectedPatchIndex, patchSelected
}) => (
);
LivesetDisplay.propTypes = {
    liveset: PropTypes.object.isRequired,
    selectedPatchIndex: PropTypes.oneOfType([
        PropTypes.bool, PropTypes.number
    ]).isRequired,
    patchSelected: PropTypes.func.isRequired,

};
export default  LivesetDisplay;
