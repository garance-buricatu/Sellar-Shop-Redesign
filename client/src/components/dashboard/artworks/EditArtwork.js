import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getArtwork, editArtwork } from '../../../actions/artwork'

import { Link } from 'react-router-dom'

import Spinner from '../../layout/Spinner'

const EditArtwork = ({ getArtwork, editArtwork, artwork: {artwork, loading}, match, history }) => {
    const [formData, setFormData] = useState({
        title:'',
        photoURL:'',
        size:'',
        medium: '',
        price:'',
        latest: false,
        date:''
    });

    const { title, photoURL, size, medium, price, latest, date } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        editArtwork(artwork._id, formData, history);
    }

    useEffect(() => { 
        getArtwork(match.params.id);
    }, [getArtwork, match.params.id]);

    useEffect(() => { 
        setFormData({
            title: loading || artwork === null ? '': artwork.title,
            photoURL: loading || artwork === null ? '': artwork.photoURL,
            size: loading || artwork === null ? '': artwork.size,
            medium: loading || artwork === null ? '': artwork.medium,
            price: loading || artwork === null ? '': artwork.price,
            latest: loading || artwork === null ? false : artwork.latest,
            date: loading || artwork === null ? '': artwork.date
        });
    }, [artwork, loading]);

    return (
        <div>
            {artwork === null || loading ? <Spinner /> : (
            <div className="edit-artwork">
                <div><h1 className="lead p-1">Edit Artwork</h1></div>
                <img
                width="30%"
                src={photoURL}
                alt={`artwork with id: ${artwork._id}`}
                />
            
                <div className="edit-artwork-inner m-2">
                    <form 
                        className="form"
                        onSubmit={e => onSubmit(e)}
                    >
                        <div className="form-group">
                            <p className="form-text">
                                <strong>Title : </strong>
                            </p>
                            <input 
                                type="text"
                                placeholder="Title of Artwork"
                                name="title"
                                value={title}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <p className="form-text">
                                <strong>Photo URL : </strong>
                            </p>
                            <input 
                                type="url"
                                placeholder="Path of Artwork Image"
                                name="photoURL"
                                value={photoURL}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <p className="form-text">
                                <strong>Dimensions (in inches) : </strong>
                            </p>
                            <input 
                                type="text"
                                placeholder="20 x 20"
                                name="size"
                                value={size}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <p className="form-text">
                                <strong>Medium : </strong>
                            </p>
                            <select name="medium" value={medium} onChange={e => onChange(e)}>
                                <option value="0">Select Medium</option>
                                <option value="Watercolor">Watercolor</option>
                                <option value="Pencil">Pencil</option>
                                <option value="Oil">Oil</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <p className="form-text">
                                <strong>Add to "latest artworks" page : </strong>
                            </p>
                            <select name="latest" value={latest} onChange={e => onChange(e)}>
                                <option value="0">Add to "tatest artworks" page</option>
                                <option value={true}>YES</option>
                                <option value={false}>NO</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <p className="form-text">
                                <strong>Price : </strong>
                            </p>
                            <select name="price" value={price} onChange={e => onChange(e)}>
                                <option value="0">Select Price Option</option>
                                <option value="Not For Sale">Not for Sale</option>
                                <option value="Contact the Artist">Contact the Artist</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <p className="form-text">
                                <strong>Date :</strong>
                            </p>
                            <input 
                                type="text"
                                name="date"
                                value={date}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <Link className="btn" to="/dashboard">Back</Link>
                        <input type="submit" className="btn btn-primary"/>
                    </form>
                </div>
            </div>
            )}
        </div>
    )
}

EditArtwork.propTypes = {
    getArtwork: PropTypes.func.isRequired,
    editArtwork: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    artwork: state.artwork
});

export default connect(mapStateToProps, { getArtwork, editArtwork })(EditArtwork)
