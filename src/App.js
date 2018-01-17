import React, { Component } from 'react';
import './App.css';
import './components/LivesetDisplay.css';
import Dropzone from 'react-dropzone'

import PatchDisplay from './components/PatchDisplay';
import PatchDetailsWrapper from './components/PatchDetailsWrapper';
import ErrorMessage from './components/ErrorMessage';
import DownloadButton from './components/DownloadButton';
import LoadFileButton from './components/LoadFileButton';
import Info from './components/Info';

// NOTE: if you want data loaded on app start, uncomment below and set
//       the initial state `editedLiveset` to `testData`
// import { testData } from './constants/katanaData';

class App extends Component {

    constructor( props ) {
        super( props );

        this.onDrop = this.onDrop.bind( this );
        this.patchSelected = this.patchSelected.bind( this );
        this.saveJSON = this.saveJSON.bind( this );
        this.toggleDropzone = this.toggleDropzone.bind( this );
        this.savePatchToIndex = this.savePatchToIndex.bind( this );
        this.saveCurrentPatch = this.saveCurrentPatch.bind( this );
        this.clonePatchAtIndex = this.clonePatchAtIndex.bind( this );
        this.clearFileError = this.clearFileError.bind( this );
        this.updateLivesetName = this.updateLivesetName.bind( this );

        this.state = {
            // initialLiveset: false, // for implememnting undo someday
            editedLiveset: false,
            fileError: false,
            fileName: false,
            selectedPatchIndex: false,
            showDropzone: true,
        }
    }

    /**
     * Changes the name of the livest based on user input
     *
     * @param {obejct} event - React synthentic event
     */
    updateLivesetName( event ) {
        const _name = event.target.value;
        this.setState({
            editedLiveset: {
                ...this.state.editedLiveset,
                liveSetData: {
                    ...this.state.editedLiveset.liveSetData,
                    name: _name,
                },
            },
        });
    }

    /**
     * Updates the liveset with an edited patch
     *
     * @param {object} patch - Newfangled patch data to save
     * @param {number} index - The zero-based index of where to save it.
     */
    savePatchToIndex( patch, index ) {
        if( !patch.name ) {
            alert( 'You need to name your patch' );
            return;
        }
        const { editedLiveset: { patchList } } = this.state;
        const _new = [...patchList.slice(0, index), patch, ...patchList.slice(index + 1)];
        this.setState({
            editedLiveset: {
                ...this.state.editedLiveset,
                patchList: _new,
            },
        });
    }

    /**
     * Updates the liveset with a new version of the one we are editing at
     * it's existing index.
     *
     * @param {object} patch - Newfangled patch data to save
     */
    saveCurrentPatch( patch ) {
        const { selectedPatchIndex } = this.state
        this.savePatchToIndex( patch, selectedPatchIndex );
    }

    /**
     * Handles a user selecting a patch from a liveset.
     *
     * @param {number} index - The zero-based index of the patch in the list
     */
    patchSelected( index ) {
        this.setState({
            selectedPatchIndex: index,
        });
    }

    /**
     * Handles a user wanting to clone a patch from a liveset
     *
     * @param {number} index - The zero-based index of the patch in the list
     */
    clonePatchAtIndex( index ) {
        const { editedLiveset: { patchList } } = this.state;
        const _new = Object.assign( {}, patchList[ index ] );
        _new.name = `!!${_new.name}`;
        _new.id = Math.random().toString().slice(2,12); // good enough?
        this.setState({
            editedLiveset: {
                ...this.state.editedLiveset,
                patchList: [...patchList, _new ],
            },
            selectedPatchIndex: patchList.length,
        });
    }

    /**
     * Handles removing file errors
     *
     */
    clearFileError() {
        this.setState({ fileError: false });
    }


    /**
     * Handles a user dropping a .tsl file into the application.
     *
     * @param {array} acceptedFiles - Files that were dropped that were allowed.
     * @param {array} rejectedFiles = Files that were dropped that are not allowed.
     */
    onDrop( acceptedFiles, rejectedFiles ) {
        const _fh = acceptedFiles[0];
        const _name = _fh.name.split('.').slice(0, -1).join('.');
        const reader = new FileReader();
        reader.onload = event => {
            try {
                const json = JSON.parse(event.target.result);
                this.setState({
                    // initialLiveset: json,
                    editedLiveset: json,
                    fileError: false,
                    fileName: _name,
                    selectedPatchIndex: false,
                    showDropzone: false,
                });
            } catch (ex) {
                this.setState({
                    fileError: "The file you provided was not formatted correctly, so we can't use it. Sorry!"
                });
            }
        };
        reader.onerror = error => {
            this.setState({
                fileError: "The file you provided could not be read for some reason. Sorry!"
            });
        };
        reader.readAsText( _fh );
    }

    toggleDropzone() {
        this.setState({
            showDropzone: !this.state.showDropzone
        });
    }

    // credit to volzo at: https://stackoverflow.com/a/30800715/167655
    saveJSON() {
        const _data = this.state.editedLiveset;
        const _saveName = this.state.fileName + '.edited.tsl';
        const _output = "data:text/json;charset=utf-8," + encodeURIComponent( JSON.stringify( _data ) );
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     _output);
        downloadAnchorNode.setAttribute("download", _saveName);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    render() {
        const {
            fileError, editedLiveset, selectedPatchIndex, showDropzone,
        } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Katana Patch Tweaker</h1>
                </header>
                { fileError && <ErrorMessage message={ fileError } closeAction={ this.clearFileError } /> }
                <div className="App__content">
                    <div className="Liveset">
                        { showDropzone && ( <Dropzone
                            onDrop={ this.onDrop }
                            className="Dropzone"
                            activeClassName="Dropzone--active"
                            >
                            <p>Drag a Liveset <code>.tsl</code> file here.</p>
                        </Dropzone>
                        ) }
                        { editedLiveset && (
                            <section className="Liveset__list">
                                <header className="Liveset__header">
                                    <input
                                        maxLength="48"
                                        className="Liveset__nameInput"
                                        onChange={ this.updateLivesetName }
                                        value={ editedLiveset.liveSetData.name }
                                    />
                                    <DownloadButton clickHandler={ this.saveJSON } />
                                    <LoadFileButton clickHandler={ this.toggleDropzone } dropzoneOpen={ showDropzone } />
                                </header>
                                { editedLiveset.patchList.map( ( _p, _idx ) => (
                                    <PatchDisplay
                                        isSelected={ _idx === selectedPatchIndex }
                                        key={ _p.id }
                                        patch={ _p }
                                        onClick={ () => this.patchSelected( _idx ) }
                                        onClone={ () => this.clonePatchAtIndex( _idx ) }
                                    />
                                ) ) }
                            </section>
                        ) }
                    </div>
                    { editedLiveset && (
                        <section className="Liveset__detail">
                            {  ( selectedPatchIndex !== false ) && (
                                <PatchDetailsWrapper
                                    patch={ editedLiveset.patchList[ selectedPatchIndex ] }
                                    handleSave={ this.saveCurrentPatch }
                                /> 
                            ) }
                        </section>
                    ) }
                    { !editedLiveset && <Info /> }
                </div>
            </div>
        );
    }
}
export default App;
