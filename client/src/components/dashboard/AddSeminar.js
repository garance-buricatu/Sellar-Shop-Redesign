import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addSeminar } from '../../actions/seminar'

const AddSeminar = ({ addSeminar }) => {

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const [formData, setFormData] = useState({
        name: '',
        photoURL:'',
        location:'',
        project:'',
        details:'',
        difficulty:'',
        dateOfEvent: ''
    });

    const { photoURL, location, project, details, difficulty, dateOfEvent } = formData;

    const onSubmit = e => {
        e.preventDefault();
        addSeminar(formData);
        setFormData({
            name: '',
            photoURL:'',
            location:'',
            project:'',
            details:'',
            difficulty:'',
            dateOfEvent: ''
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
                </div>
                <select name="difficulty" value={difficulty} onChange={e => onChange(e)}>
                    <option value="0">Select Difficulty</option>
                    <option value="Hard">Hard</option>
                    <option value="Medium">Medium</option>
                    <option value="Easy">Easy</option>
                </select>
                <div className="form-group">
                    <p className="form-text">
                        <strong>Date of Seminar : </strong>
                    </p>
                    <input 
                        type="date"
                        name="dateOfEvent"
                        value={dateOfEvent}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="Submit" className="btn btn-primary my-2"/>
            </form>
        </div>
    )
}

AddSeminar.propTypes = {
    addSeminar: PropTypes.func.isRequired
}

export default connect(null, { addSeminar })(AddSeminar)
