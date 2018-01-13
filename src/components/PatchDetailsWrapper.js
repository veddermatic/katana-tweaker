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

    componentWillReceiveProps( _new, _old ) {
        const { patch } = _new;
        if( patch ) {
            this.setState({
                _patch: patch
            });
        }
    }

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
