import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addSeminar } from '../../../actions/seminar'

const AddSeminar = ({ addSeminar }) => {

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const [formData, setFormData] = useState({
        photoURL:'',
        location:'',
        project:'',
        details:'',
        difficulty:'',
        startTime:'',
        endTimeTime:'',
        dateOfEvent: '',
        recurring: false
    });

    const { photoURL, location, project, details, difficulty, startTime, endTime, dateOfEvent, recurring } = formData;

    const onSubmit = e => {
        e.preventDefault();
        addSeminar(formData);
        setFormData({
            photoURL:'',
            location:'',
            project:'',
            details:'',
            difficulty:'',
            startTime:'',
            endTime:'',
            dateOfEvent: '',
            recurring: false
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
                <div className="form-group">
                    <p className="form-text">
                        <strong>Start time : </strong>
                    </p>
                    <input 
                        type="text"
                        placeholder="HH:MM AM"
                        name="startTime"
                        value={startTime}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <p className="form-text">
                        <strong>End time : </strong>
                    </p>
                    <input 
                        type="text"
                        placeholder="HH:MM AM"
                        name="endTime"
                        value={endTime}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div class="form-group">
                <p><input 
                    type="checkbox" 
                    name="recurring" 
                    checked={recurring}
                    value={recurring} 
                    onChange={e => {
                        setFormData({...formData, recurring: !recurring});
                        }
                    }
                    /> {' '}Recurring</p>
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
