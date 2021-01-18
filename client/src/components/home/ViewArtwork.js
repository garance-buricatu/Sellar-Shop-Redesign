import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getArtwork } from '../../actions/artwork'

import Spinner from '../layout/Spinner'

const ViewArtwork = ({ getArtwork, artwork : {artwork, loading}, match }) => {

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
                />
                <p className="lead">{artwork.title}</p>
                <p className="text-menu">{artwork.user.name}</p>
                <p className="text-menu">{artwork.date}</p>
                <p className="text-menu">{artwork.size}</p>
                <p className="text-menu">{artwork.medium}</p>
                </div>
                
            )}
        </div>
    )
}

ViewArtwork.propTypes = {
    getArtwork: PropTypes.func.isRequired,
    artwork: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    artwork: state.artwork
});

export default connect(mapStateToProps, { getArtwork })(ViewArtwork)
