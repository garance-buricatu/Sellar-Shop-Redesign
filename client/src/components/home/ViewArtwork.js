import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getArtwork, clearArtwork } from '../../actions/artwork'

import { Link } from 'react-router-dom'

import Spinner from '../layout/Spinner'

const ViewArtwork = ({ getArtwork, clearArtwork, artwork : {artwork, loading}, match }) => {

    useEffect(() => { 
        getArtwork(match.params.id);
    }, [getArtwork, match.params.id]);

    return (
        <div>
            {artwork === null || loading ? <Spinner /> : (
                <div className="view-artwork m-2">
                    <img
                        src={artwork.photoURL}
                        className="m-1"
                        alt={`artwork with id: ${artwork._id}`}
                    />
                    <p className="lead">{artwork.title}</p>
                    <p>{artwork.user.name}</p>
                    <p>{artwork.date}</p>
                    <p>{artwork.size}</p>
                    <p>{artwork.medium}</p>
                    <Link to="/" className="btn btn-primary my-1" onClick={() => clearArtwork()}>
                        Back
                    </Link>
                </div>
            )}
        </div>
    )
}

ViewArtwork.propTypes = {
    getArtwork: PropTypes.func.isRequired,
    clearArtwork: PropTypes.func.isRequired,
    artwork: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    artwork: state.artwork
});

export default connect(mapStateToProps, { getArtwork, clearArtwork })(ViewArtwork)
