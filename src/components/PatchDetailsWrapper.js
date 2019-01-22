import React from 'react'
import PropTypes from  'prop-types';

import PatchDetails from './PatchDetails';


/**
 * PatchDetailsWrapper - stateful wrapper for out PatchDetails
 *
 * @param {object} props - Props for the component
 * @param {object} props.patch - Patch object we are displaying
 * @param {func}   props.handleSave - function to call when user saves patch
 * @returns {object} - React component that allows user to edit a patch
 */
class PatchDetailsWrapper extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            dirty: false,
            patch: props.patch,
            _patch: Object.assign({}, props.patch)
        }
        this.editTextField = this.editTextField.bind( this );
        this.editBright = this.editBright.bind( this );
        this.editAmp = this.editAmp.bind( this );
        this.handleSave = this.handleSave.bind( this );
    }

    /**
     * Updates the internal state of the component when our `patch` prop
     * is changed from outside.
     *
     * @param {object} _new - New props the componet is getting
     * @param {object} _old - The current props the component is currently rendered with
     */
    componentWillReceiveProps( _new, _old ) {
        const { patch } = _new;
        if( patch ) {
            this.setState({
                _patch: patch
            });
        }
    }

    /**
     * Generic function that updates internal state when user changes a form
     * field value. Both the part of the state and new value are derrived from
     * the event passed to the function.
     *
     * @param {object} syntheticEvent - React event from user input
     */
    editTextField( syntheticEvent ) {
        const _n = syntheticEvent.target.name;
        const _v = syntheticEvent.target.value;
        this.setState({
            _patch: {
                ...this.state._patch,
                [ _n ]: _v,
            },
            dirty: true,
        });
    }

    /**
     * Sets the internal state when user click the `bright` checkbox
     *
     * @param {object} syntheticEvent - React event from user input
     */
    editBright( syntheticEvent ) {
        const _v = syntheticEvent.target.checked ? 1 : 0;
        this.setState({
            _patch: {
                ...this.state._patch,
                params: {
                    ...this.state._patch.params,
                    preamp_a_bright: _v,
                }
            },
            dirty: true,
        });
    }

    /**
     * Sets the internal state when user changes the amp model
     *
     * @param {object} syntheticEvent - React event from user input
     */
    editAmp( syntheticEvent ) {
        const _v = parseInt( syntheticEvent.target.value, 10 );
        this.setState({
            _patch: {
                ...this.state._patch,
                params: {
                    ...this.state._patch.params,
                    preamp_a_type: _v,
                }
            },
            dirty: true,
        });
    }

    /**
     * Handles the `save` button being pressed and calls the handler function
     * we were passed in with the current patch state.
     */
    handleSave() {
        const { handleSave } = this.props;
        const { _patch } = this.state;
        // TODO: don't assume we always succeed....
        this.setState({
            dirty: false
        });
        handleSave( _patch );
    }

    render () {
        return  (
            <PatchDetails
                key="a"
                patch={ this.state._patch }
                toggleBright={ this.editBright }
                ampChange={ this.editAmp }
                textChange={ this.editTextField }
                saveDisabled={ !this.state.dirty }
                saveHandler={ this.handleSave }
            />
        )
        
    }
}
PatchDetailsWrapper.propTypes = {
    patch: PropTypes.object.isRequired,
    handleSave: PropTypes.func.isRequired,
}
export default PatchDetailsWrapper
