import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addSeminar } from '../../../actions/seminar'

import { Icon } from 'semantic-ui-react';
import DateInput from './DateInput';

const AddSeminar = ({ addSeminar }) => {

    const [semDates, setSemDates] = useState([]);

    const [formData, setFormData] = useState({
        photoURL:'',
        location:'',
        project:'',
        details:'',
        difficulty:'',
        seminarDates: []
    });

    const { photoURL, location, project, details, difficulty } = formData;

    //https://stackoverflow.com/questions/42316604/how-to-implement-a-dynamic-form-with-controlled-components-in-reactjs

    const addDateForm = () => {
        setSemDates(prevArr => [...prevArr, '']);
    }

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        setFormData({
            ...formData,
            seminarDates: semDates
        });
    }, [semDates]);

    const onSubmit = e => {
        e.preventDefault();        
        addSeminar(formData);
        setFormData({
            photoURL:'',
            location:'',
            project:'',
            details:'',
            difficulty:'',
            seminarDates: []
        });
    }

    return (
        <div>
            <form 
                className="form"
                onSubmit={e => onSubmit(e)}
            >
                <div className="form-group">
                    <p className="form-text">
                        <strong>Image URL : </strong>
                    </p>
                    <input 
                        type="url"
                        placeholder="Image URL"
                        name="photoURL"
                        value={photoURL}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <p className="form-text">
                        <strong>Location : </strong>
                    </p>
                    <input 
                        type="text"
                        placeholder="location of Seminar"
                        name="location"
                        value={location}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <p className="form-text">
                        <strong>Project Name: </strong>
                    </p>
                    <input 
                        type="text"
                        placeholder="Project name"
                        name="project"
                        value={project}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <p className="form-text">
                        <strong>Details : </strong>
                    </p>
                    <input 
                        type="text"
                        placeholder="Details about Seminar"
                        name="details"
                        value={details}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <p className="form-text">
                        <strong>Difficulty : *</strong>
                    </p>
                <select name="difficulty" value={difficulty} onChange={e => onChange(e)}>
                    <option value="0">Select Difficulty</option>
                    <option value="Hard">Beginner</option>
                    <option value="Medium">Alternate</option>
                    <option value="Easy">Advanced</option>
                </select>
                </div>
                <div className="form-group">
                    <Icon 
                        name="plus" 
                        onClick={() => addDateForm()}
                    />
                    Add a date and time
                </div>
                {semDates.map((el, i) => <DateInput i={i} semDates={semDates} setSemDates={setSemDates} key={i}/>)}
                <input type="Submit" className="btn btn-primary my-2"/>
            </form>
        </div>
    )
}

AddSeminar.propTypes = {
    addSeminar: PropTypes.func.isRequired
}

export default connect(null, { addSeminar })(AddSeminar)
