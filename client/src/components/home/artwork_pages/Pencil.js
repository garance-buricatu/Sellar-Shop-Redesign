import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getArtworksPencil, clearArtwork } from '../../../actions/artwork'
import { Link } from 'react-router-dom';

import Spinner from '../../layout/Spinner'

const Pencil = ({ getArtworksPencil,clearArtwork, artwork: {loading, artworks} }) => {

    useEffect(() => { 
        getArtworksPencil();
        clearArtwork();
    }, [getArtworksPencil, clearArtwork]);

    const colSize = Math.floor(artworks.length / 4);
    const colRem = artworks.length % 4;
    
    return (
        <div className="grid p-2">
            <p className="lead centered"><strong>Pencil</strong></p>
            {loading || artworks === null ? <Spinner /> : (
                artworks.length === 0 ? (<p className="centered p-1"><strong>There are no artworks of medium "pencil" yet</strong></p>) : (
                    <ul className="row">
                        <div className="column">
                            {
                                artworks.slice(0, colSize).map(art => (
                                    <Link to={`/view-artwork/${art._id}`}>
                                        <img src={art.photoURL} width="100%" alt={`id: ${art._id}`}></img>
                                    </Link>
                                ))
                            }
                            {
                                colRem > 0 && 
                                <Link to={`/view-artwork/${artworks[colSize * 4]._id}`}>
                                    <img src={artworks[colSize * 4].photoURL} width="100%" alt={`id: ${artworks[colSize * 4]._id}`}></img>
                                </Link>
                            }
                        </div>
                        <div className="column">
                            {
                                artworks.slice(colSize, colSize * 2).map(art => (
                                    <Link to={`/view-artwork/${art._id}`}>
                                        <img src={art.photoURL} width="100%" alt={`id: ${art._id}`}></img>
                                    </Link>
                                ))
                            }
                            {
                                colRem > 1 && 
                                <Link to={`/view-artwork/${artworks[colSize * 4 + 1]._id}`}>
                                    <img src={artworks[colSize * 4 + 1].photoURL} width="100%" alt={`id: ${artworks[colSize * 4 + 1]._id}`}></img>
                                </Link>
                            }
                        </div>
                        <div className="column">
                            {
                                artworks.slice(colSize * 2, colSize * 3).map(art => (
                                    <Link to={`/view-artwork/${art._id}`}>
                                        <img src={art.photoURL} width="100%" alt={`id: ${art._id}`}></img>
                                    </Link>
                                ))
                            }
                            {
                                colRem > 2 && 
                                <Link to={`/view-artwork/${artworks[colSize * 4 + 2]._id}`}>
                                    <img src={artworks[colSize * 4 + 2].photoURL} width="100%" alt={`id: ${artworks[colSize * 4 + 2]._id}`}></img>
                                </Link>
                            }
                        </div>
                        <div className="column">
                            {
                                artworks.slice(colSize * 3, colSize * 4).map(art => (
                                    <Link to={`/view-artwork/${art._id}`}>
                                        <img src={art.photoURL} width="100%" alt={`id: ${art._id}`}></img>
                                    </Link>
                                ))
                            }
                        </div>
                    </ul>
                )
            )}
        </div>
    )
}

Pencil.propTypes = {
    getArtworksPencil : PropTypes.func.isRequired,
    clearArtwork: PropTypes.func.isRequired,
    artwork: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    artwork: state.artwork
});

export default connect(mapStateToProps, { getArtworksPencil, clearArtwork })(Pencil)
