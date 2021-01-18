import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getBonnieProfile } from '../../../actions/profile';
import { createProfile } from '../../../actions/profile';

import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react'

import Spinner from '../../layout/Spinner'


const ProfileTab = ({ getBonnieProfile, createProfile, profile: { profile, loading }, history }) => {

    useEffect(() => {
        getBonnieProfile();
    }, [getBonnieProfile]);

    useEffect(() => {
        setFormData({
            avatar: loading || !profile.avatar ? '' : profile.avatar,
            description: loading || !profile.description ? '' : profile.description
        });
    }, [profile, loading]);
    
    const [formData, setFormData] = useState({
        avatar: '',
        description: ''
    });

    const {
        avatar,
        description
    } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
        setFormData({...formData, description: content });
    };

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    }

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
             <h1 className="lead m-2">Edit Profile</h1>
            {profile !== null ? (
                <Fragment>
                    <form className="form mx-2" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <p className="form-text">
                                <strong>Profile Picture : *</strong>
                            </p>
                            <input 
                                type="url"
                                placeholder="Path to picture"
                                name="avatar"
                                value={avatar}
                                onChange={e => onChange(e)}
                            />
                            <img
                                src={avatar}
                                className="my-1"
                                alt="Bonnie's Profile"
                            />
                        </div>
                        <div className="form-group">
                            <p className="form-text">
                                <strong>Description : </strong>
                            </p>
                            <Editor
                                initialValue={description ? description : '<p>Initial Content</p>'}
                                apiKey="ja6vd4rejvi91kty6007v58whwpadqp2b6gfsj192reg25xh"
                                init={{
                                height: 250,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                                }}
            
                                onEditorChange={handleEditorChange}
                            />
                        </div>
                        <input type="submit" className="btn btn-primary my-1" />
                    </form>
                </Fragment>
            ) : (
               <Fragment>
                    <p>
                        You have not setup a profile. Please add some info
                        <Link to="/create-profile" className="btn btn-primary">
                            Create Profile
                        </Link>
                    </p>
                </Fragment>
            )}
        </Fragment>
    )
}

ProfileTab.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getBonnieProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getBonnieProfile, createProfile })(ProfileTab)

