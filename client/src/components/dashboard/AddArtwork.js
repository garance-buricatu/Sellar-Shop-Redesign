import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addArtwork } from '../../actions/artwork'

const AddArtwork = ({ addArtwork }) => {
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
        addArtwork(formData);
        setFormData({
            title:'',
            photoURL:'',
            size:'',
            medium: '',
            date:''
        });
    }

    return (
        <div className="m-4">
            <form 
                className="form"
                onSubmit={e => onSubmit(e)}
            >
                <p className="lead"><strong>Add an Artwork</strong></p>
                <div className="form-group">
                    <p className="form-text">
                        <strong>Title : *</strong>
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
                        <strong>Photo URL : *</strong>
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
                        <strong>Dimensions : *</strong>
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
                        <strong>Medium : *</strong>
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
                <input type="submit" className="btn btn-primary"/>
            </form>
        </div>
    )
}

AddArtwork.propTypes = {
    addArtwork: PropTypes.func.isRequired
}

export default connect(null, { addArtwork })(AddArtwork)
