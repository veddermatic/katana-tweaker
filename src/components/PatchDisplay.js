import React from 'react';
import PropTypes from  'prop-types';

import { ampName } from '../utility/katana';
import  './PatchDisplay.css';
import cloneIcon from '../assets/plusIcon_roundGreen.svg';
/**
 * Shows the name of the patch in a liveset, and maybe some other details.
 * Meant to be used in a list of all the patches in a liveset.
 *
 * @param {object} props - Properties for the display
 * @param {object}   props.patch - Patch to show in the list
 * @param {function} props.onClick - What do we do when we get clicked
 * @param {function} props.onClone - What do we do when we get cloned
 */
const PatchDisplay = ({
    patch, onClick, isSelected, onClone
}) => (
    <div className={ `PatchDisplay${ isSelected ? ' PatchDisplay--selected' : ''}` } onClick={ onClick }>
        <div>
            <span className="PatchDisplay__name">{ patch.name }</span>
            <span className="PatchDisplay__ampName">{ ampName( patch ) }</span>
        </div>
        <button
            title="Clone this patch"
            onClick={ e => { e.stopPropagation(); onClone() } }
            className="PatchDisplay__cloneButton"
        >
            <img src={ cloneIcon } alt="clone patch" />
        </button>
    </div>
);
PatchDisplay.propTypes = {
    patch: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onClone: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
};
export default  PatchDisplay;
