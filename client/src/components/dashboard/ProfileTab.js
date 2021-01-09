import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getBonnieProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react'

const ProfileTab = ({ getBonnieProfile, auth, profile: { profile, loading } }) => {

    const [formData, setFormData] = useState({
        avatar: '',
        description: ''
    });

    const {
        avatar,
        description
    } = formData;

    useEffect(() => {
        getBonnieProfile();
        setFormData({
            avatar: loading || !profile.user.avatar ? '' : profile.user.avatar,
            description: loading || !profile.description ? '' : profile.description
        });
    }, [getBonnieProfile]);

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

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className="lead m-2">Edit Profile</h1>
            {profile !== null ? (
                <Fragment>
                    <form className="form m-2">
                        <div className="form-group">
                            <p className="form-text">
                                <strong>Edit Description : </strong>
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
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                                }}
            
                                onEditorChange={handleEditorChange}
                            />
                        </div>
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
    getBonnieProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getBonnieProfile })(ProfileTab)

