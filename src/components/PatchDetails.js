import React from 'react';
import PropTypes from 'prop-types';
import { ampModel, ampLED, brightEffect } from '../utility/katana';
import AmpPicker from './AmpPicker';
import './PatchDetails.css';

/**
 * Displays the details of a particular patch and allows editing of certain
 * parameters.
 *
 * @param {object} props - Properties for the component
 * @param {object} props.patch - The patch we are displaying
 * @param {function} props.textChange - Function to handle text edits
 * @param {function} props.ampChange - Function to handle setting new amp model
 * @param {function} props.toggleBright - Function to toggle bright setting
 * @param {bool} props.saveDisabled - Are we allowed to save?
 * @param {function} props.saveHandler - Function to handle saving
 * @returns {object} - React component
 */
const PatchDetails = ({
    patch, textChange, ampChange, toggleBright, saveDisabled, saveHandler,
}) => (
    <div className="PatchDetails">

        <div className="InputGroup">
            <label className="PatchDetails__textfieldLabel">patch name</label>
            <input
                maxLength="15"
                onChange={ textChange }
                name="name"
                className="PatchDetails__input PatchDetails__input--large"
                value={ patch.name }
            />
        </div>

        <div className="InputGroup">
            <label className="PatchDetails__textfieldLabel">notes</label>
            <textarea
                maxLength="30"
                onChange={ textChange }
                className="PatchDetails__input"
                name="note"
                value={ patch.note }
            />
        </div>

        <div className="InputGroup">
            <label className="PatchDetails__textfieldLabel">amp model</label>
            <AmpPicker changeHandler={ ampChange } selectedAmp={ patch.params.preamp_a_type } />
            <dl className="PatchDetails__keyValues">
                <dt>Modeled on:</dt> <dd>{ ampModel( patch ) }</dd>
                <dt>Katana LED:</dt> <dd>{ ampLED( patch ) }</dd>
            </dl>
        </div>

        <div className="InputGroup">
            <label htmlFor="brightSwitch">
                <input
                    type="checkbox"
                    onChange={ toggleBright }
                    id="brightSwitch"
                    checked={ patch.params.preamp_a_bright === 1 }
                />{ " " }
                Bright Setting
            </label>
            <dl className="PatchDetails__keyValues">
                <dt>Amp Bright Effect:</dt> <dd>{ brightEffect( patch ) }</dd>
            </dl>
        </div>
        <button className="PatchDetails__button" disabled={ saveDisabled } onClick={ saveHandler }>SAVE</button>
    </div>
);
PatchDetails.propTypes = {
    patch: PropTypes.object.isRequired
};
export default  PatchDetails;
