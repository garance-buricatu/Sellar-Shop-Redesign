import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addVideos } from '../../../actions/profile'

const VideoForm = ({ addVideos }) => {

    // form data for videos
    const [formData, setFormData ] = useState({
        link:'',
        description:''
    });

    const { link, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addVideos(formData);
        setFormData({
            link:'',
            description:''
        });
    }
    return (
        <Fragment>
            <form 
                className="form m-2"
                onSubmit={e => onSubmit(e)}
            > 
                <p className="form-text"><strong>Add a Video</strong></p>
                <div className="form-group">
                    <p className="form-text">
                        <strong>Link : *</strong>
                    </p>
                    <input 
                        type="text"
                        placeholder="Link of Video"
                        name="link"
                        value={link}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <p className="form-text">
                        <strong>Description: </strong>
                    </p>
                    <input 
                        type="text"
                        placeholder="Description of video"
                        name="description"
                        value={description}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
            </form>
        </Fragment>
    )
}

VideoForm.propTypes = {
    profile: PropTypes.object.isRequired,
    addVideos: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { addVideos })(VideoForm)
