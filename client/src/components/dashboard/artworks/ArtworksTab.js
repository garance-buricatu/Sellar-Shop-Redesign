import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getArtworks, deleteArtwork } from '../../../actions/artwork'
import Moment from 'react-moment'


import Spinner from '../../layout/Spinner'
import AddArtwork from '../artworks/AddArtwork';

//https://freefrontend.com/css-gallery/

const ArtworksTab = ({ getArtworks, deleteArtwork, artwork: { artworks, loading } }) => {
    useEffect(() => { 
        getArtworks(); 
    }, [getArtworks]);

    const allArtworks = artworks.map(art => (
        <tr key={art._id}>
            <td><div>
                <img
                    src={art.photoURL}
                    width="80%"
                    height="auto"
                />
            </div></td>
            <td><div>{art.title}</div></td>
            <td><div>{art.size}</div></td>
            <td><div>{art.medium}</div></td>
            <td><div>
                {art.date}
            </div></td>
            <td className="actions">
                <div>
                    <Link
                        to={`/edit-artwork/${art._id}`}
                        className="btn btn-primary m-1"
                    >
                        Edit
                    </Link>
                    <button 
                        className="btn btn-danger m-1"
                        onClick={() => deleteArtwork(art._id)}
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    ));

    return (
        <div>
            <AddArtwork />
            {
                artworks.length === 0 ? (
                    <div className="p-2">
                        <h1 className="lead">
                            No Artworks Yet
                        </h1>
                    </div>
                ) : loading ? (
                    <Spinner />
                ) : (
                    <div className='artworks m-2'>
                        <h1 className='lead'>All Artworks</h1>
                        <table className="table my-1">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Title</th>
                                    <th>Dimensions (in inches)</th>
                                    <th>Medium</th>
                                    <th>Year Created</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{allArtworks}</tbody>
                        </table>
                    </div>
                )
            }
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
