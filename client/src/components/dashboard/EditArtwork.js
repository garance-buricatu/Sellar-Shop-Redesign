import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getArtwork, editArtwork } from '../../actions/artwork'

import { Link, withRouter } from 'react-router-dom'

import Spinner from '../layout/Spinner'

const EditArtwork = ({ getArtwork, editArtwork, artwork: {artwork, loading}, match, history }) => {
    const [formData, setFormData] = useState({
        title:'',
        photoURL:'',
        size:'',
        medium: '',
        date:''
    });

    const { title, photoURL, size, medium, date } = formData;

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
            date: loading || artwork === null ? '': artwork.date
        });
    }, [artwork]);

    return (
        <div className="edit-artwork">
            <div><h1 className="form-text my-1">Edit Artwork</h1></div>
            <img
                src={artwork === null || loading ? <Spinner /> : photoURL}
            />
            <div className="edit-artwork-inner m-2">
                {artwork === null || loading ? <Spinner /> : (
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
                                <strong>Dimensions : </strong>
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
                                <strong>Date :</strong>
                            </p>
                            <input 
                                type="date"
                                name="date"
                                value={date}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <Link className="btn" to="/dashboard">Back</Link>
                        <input type="submit" className="btn btn-primary"/>
                    </form>
                )}
            </div>
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
