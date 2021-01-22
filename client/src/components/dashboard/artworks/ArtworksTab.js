import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getArtworks, deleteArtwork } from '../../../actions/artwork'

import Spinner from '../../layout/Spinner'
import AddArtwork from '../artworks/AddArtwork';

//https://freefrontend.com/css-gallery/

const ArtworksTab = ({ getArtworks, deleteArtwork, artwork: { artworks, loading } }) => {
    useEffect(() => { 
        getArtworks(); 
    }, [getArtworks]);

    const colSize = Math.floor(artworks.length / 4);
    const colRem = artworks.length % 4;

    return (
        <div className="grid">
            <a name="top"></a>
            <AddArtwork />
            <h2 className="m-2">All Artworks</h2>
            {loading || artworks === null ? <Spinner /> : (
                artworks.length === 0 ? (<p className="centered p-1"><strong>There are no artworks yet</strong></p>) : (
                    <ul className="row">
                        <div className="column">
                            {
                                artworks.slice(0, colSize).map(art => (
                                    <div className="column-inner p-1">
                                        <img src={art.photoURL} width="100%" alt={`id: ${art._id}`}></img>
                                        <div className="column-buttons m-1">
                                            <Link
                                                to={`/edit-artwork/${art._id}`}
                                                className="btn btn-primary first-button"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => deleteArtwork(art._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                colRem > 0 && 
                                    <div className="column-inner p-1">
                                        <img src={artworks[colSize * 4].photoURL} width="100%" alt={`id: ${artworks[colSize * 4]._id}`}></img>
                                        <div className="m-1 column-buttons m-1">
                                            <Link
                                                to={`/edit-artwork/${artworks[colSize * 4]._id}`}
                                                className="btn btn-primary first-button"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => deleteArtwork(artworks[colSize * 4]._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                            }
                        </div>
                        <div className="column">
                            {
                                artworks.slice(colSize, colSize * 2).map(art => (
                                    <div className="column-inner p-1">
                                        <img src={art.photoURL} width="100%" alt={`id: ${art._id}`}></img>
                                        <div className="column-buttons m-1">
                                            <Link
                                                to={`/edit-artwork/${art._id}`}
                                                className="btn btn-primary first-button"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => deleteArtwork(art._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        </div>
                                ))
                            }
                            {
                                colRem > 1 && 
                                <div className="column-inner p-1">
                                    <img src={artworks[colSize * 4 + 1].photoURL} width="100%" alt={`id: ${artworks[colSize * 4 + 1]._id}`}></img>
                                    <div className="column-buttons m-1">
                                        <Link
                                            to={`/edit-artwork/${artworks[colSize * 4 + 1]._id}`}
                                            className="btn btn-primary first-button"
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            className="btn btn-danger"
                                            onClick={() => deleteArtwork(artworks[colSize * 4 + 1]._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="column">
                            {
                                artworks.slice(colSize * 2, colSize * 3).map(art => (
                                    <div className="column-inner p-1">
                                        <img src={art.photoURL} width="100%" alt={`id: ${art._id}`}></img>
                                        <div className="column-buttons m-1">
                                            <Link
                                                to={`/edit-artwork/${art._id}`}
                                                className="btn btn-primary first-button"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => deleteArtwork(art._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                colRem > 2 && 
                                <div className="column-inner p-1">
                                    <img src={artworks[colSize * 4 + 2].photoURL} width="100%" alt={`id: ${artworks[colSize * 4 + 2]._id}`}></img>
                                    <div className="column-buttons m-1">
                                        <Link
                                            to={`/edit-artwork/${artworks[colSize * 4 + 2]._id}`}
                                            className="btn btn-primary first-button"
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            className="btn btn-danger"
                                            onClick={() => deleteArtwork(artworks[colSize * 4 + 2]._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="column">
                            {
                                artworks.slice(colSize * 3, colSize * 4).map(art => (
                                    <div className="column-inner p-1">
                                        <img src={art.photoURL} width="100%" alt={`id: ${art._id}`}></img>
                                        <div className="column-buttons m-1">
                                            <Link
                                                to={`/edit-artwork/${art._id}`}
                                                className="btn btn-primary first-button"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => deleteArtwork(art._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </ul>
                )
            )}
            <a className="btn btn-primary m-2" href="#top">
                Back to Top
            </a>
        </div>
    )
}

ArtworksTab.propTypes = {
    getArtworks: PropTypes.func.isRequired,
    deleteArtwork: PropTypes.func.isRequired,
    artwork: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    artwork: state.artwork
});

export default connect(mapStateToProps, { getArtworks, deleteArtwork })(ArtworksTab)
