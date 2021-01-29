import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getArtworksLatest, clearArtwork } from '../../actions/artwork'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'

const Latest = ({ getArtworksLatest, clearArtwork, artwork : { loading, artworks }}) => {
    useEffect(() => { 
        getArtworksLatest(); 
        clearArtwork();
    }, [getArtworksLatest, clearArtwork]);

    const colSize = Math.floor(artworks.length / 4);
    const colRem = artworks.length % 4;

    return (
        <div>
            <div className="grid p-2">
            <p className="lead centered"><strong>Latest Works</strong></p>
            {loading || artworks === null ? <Spinner /> : (
                artworks.length === 0 ? (<p className="centered p-1"><strong>There are no "latest" artworks to show yet</strong></p>) : (
                    <ul className="row">
                        <div className="column">
                            {
                                artworks.slice(0, colSize).map(art => (
                                    <Link to={`/view-artwork/${art._id}`} key={art._id}>
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
                                    <Link to={`/view-artwork/${art._id}`} key={art._id}>
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
                                    <Link to={`/view-artwork/${art._id}`} key={art._id}>
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
                                    <Link to={`/view-artwork/${art._id}`} key={art._id}>
                                        <img src={art.photoURL} width="100%" alt={`id: ${art._id}`}></img>
                                    </Link>
                                ))
                            }
                        </div>
                    </ul>
                ))}
            </div>
        </div>
    )
}

Latest.propTypes = {
    getArtworksLatest : PropTypes.func.isRequired,
    clearArtwork: PropTypes.func.isRequired,
    artwork: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    artwork: state.artwork
});

export default connect(mapStateToProps, { getArtworksLatest, clearArtwork })(Latest)
