import React  from 'react';
import PropTypes from 'prop-types';

import { amps } from '../constants/katanaData';
import { ampNameForId } from '../utility/katana';

/**
 * AmpPicker - a control to select an amp model.
 *
 * @param {object} props - Props for the component
 * @param {function} props.changeHandler - Function to call when we change
 * @param {string}   props.selectedAmp - The amp that is currently selected
 * @returns {object} - React component that lets you pick an amp model
 */
const AmpPicker = ({
    changeHandler, selectedAmp
}) => (
    <select className="PatchDetails__input" value={ selectedAmp } onChange={ changeHandler }>
        { amps.map( _ampId => <AmpPickerItem key={ _ampId } ampId={ _ampId } /> ) } 
    </select>
);
AmpPicker.propTypes = {
    changeHandler: PropTypes.func.isRequired,
    selectedAmp: PropTypes.number.isRequired,
};
export default  AmpPicker;


/**
 * AmpPickerItem - an OPTION for the amp picker
 *
 * @param {object} props - Props for the component
 * @param {function} props.ampId - ID of the amp model we represent
 * @returns {object} - React component that shows an available amp option
 */
const AmpPickerItem = ({
    ampId
}) => (
    <option value={ ampId }>{ ampNameForId( ampId ) }</option>
);

AmpPickerItem.propTypes = {
    ampId: PropTypes.number.isRequired,
}
