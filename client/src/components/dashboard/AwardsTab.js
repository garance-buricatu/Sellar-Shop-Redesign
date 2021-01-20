import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { addAwards, addVideos } from '../../actions/profile'
import { getBonnieProfile } from '../../actions/profile'

import AllAwards from './AllAwards'
import AllVideos from './AllVideos'
import Spinner from '../layout/Spinner'

const Awards = ({ addAwards, addVideos, getBonnieProfile, profile: { profile, loading }, history }) => {
    useEffect(() => {
        getBonnieProfile();
    }, [getBonnieProfile]);

    // form data for awards
    const [formData, setFormData] = useState({
        title:'',
        description:'',
        date:''
    });

    const { title, description, date } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addAwards(formData, history);
    }

    // form data for videos
    const [formData2, setFormData2 ] = useState({
        link:'',
        description2:''
    });

    const { link, description2 } = formData2;

    const onChange2 = e => setFormData2({ ...formData2, [e.target.name]: e.target.value });

    const onSubmit2 = e => {
        e.preventDefault();
        addVideos(formData2);
        setFormData2({
            link:'',
            description2:''
        });
    }

    return (
        <div className="awards">
            <div className="awards-inner">
                <form 
                    className="form m-2 "
                    onSubmit={e => onSubmit(e)}
                >
                    <p className="form-text"><strong>Add an Award</strong></p>
                    <div className="form-group">
                        <p className="form-text">
                            <strong>Title : *</strong>
                        </p>
                        <input 
                            type="text"
                            placeholder="Title of Award"
                            name="title"
                            value={title}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <p className="form-text">
                            <strong>Description : *</strong>
                        </p>
                        <input 
                            type="text"
                            placeholder="Description of Award"
                            name="description"
                            value={description}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <p className="form-text">
                            <strong>Date (Year): </strong>
                        </p>
                        <input 
                            type="text"
                            placeholder="YYYY"
                            name="date"
                            value={date}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary my-1" />
                </form>
                <form 
                    className="form m-2"
                    onSubmit={e => onSubmit2(e)}
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
                            onChange={e => onChange2(e)}
                        />
                    </div>
                    <div className="form-group">
                        <p className="form-text">
                            <strong>Description: </strong>
                        </p>
                        <input 
                            type="text"
                            placeholder="Description of video"
                            name="description2"
                            value={description2}
                            onChange={e => onChange2(e)}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary my-1" />
                </form>
            </div>
            {loading || profile===null ? (<Spinner />) : (
                <Fragment>
                    <AllAwards awards={profile.awards}/>
                    <AllVideos videos={profile.videos}/>
                </Fragment>
            )}
        </div>
    )
}

Awards.propTypes = {
    addAwards: PropTypes.func.isRequired,
    addVideos: PropTypes.func.isRequired,
    getBonnieProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { addAwards, addVideos, getBonnieProfile })(Awards)
