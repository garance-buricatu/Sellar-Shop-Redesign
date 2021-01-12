import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { addAwards } from '../../actions/profile'
import { getBonnieProfile } from '../../actions/profile'

import { Link, withRouter } from 'react-router-dom'
import AllAwards from './AllAwards'
import Spinner from '../layout/Spinner'

const Awards = ({ addAwards, getBonnieProfile, profile: { profile, loading }, history }) => {
    useEffect(() => {
        getBonnieProfile();
    }, [getBonnieProfile]);

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

    return (
        <div className="awards">
            <form 
                className="form m-2"
                onSubmit={e => onSubmit(e)}
            >
                <h1 className="lead">Edit Awards</h1>
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
                        <strong>Date : </strong>
                    </p>
                    <input 
                        type="date"
                        placeholder="Date of Award"
                        name="date"
                        value={date}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
            </form>
            {loading || profile===null ? (<Spinner />) : (
                <AllAwards award={profile.awards}/>
            )}
        </div>
    )
}

Awards.propTypes = {
    addAwards: PropTypes.func.isRequired,
    getBonnieProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { addAwards, getBonnieProfile })(Awards)
