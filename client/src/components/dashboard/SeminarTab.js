import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addSeminar, getSeminars } from '../../actions/seminar'

// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

import Calendar from 'react-calendar-multiday'

const SeminarTab = ({ addSeminar, getSeminars, seminar : { seminars } }) => {

    const allSeminarDates = seminars.map(sem => new Date(sem.dateOfEvent));

    const onChange = date => {
        const newDate = new Date(date.current);
        
        const chosenSeminars = allSeminarDates.filter(sem => (
            sem.getDate() === newDate.getDate() &&
            sem.getMonth() === newDate.getMonth() &&
            sem.getFullYear() === newDate.getFullYear()
        ));
        console.log(chosenSeminars);
    }
    
    const onFieldChange = (e) => {
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
        difficulty:''
    });

    const { photoURL, location, project, details, difficulty } = formData;

    const onSubmit = e => {
        e.preventDefault();
        addSeminar(formData);
    }

    useEffect(() => { 
        getSeminars(); 
    }, [getSeminars]);

    return (
        <div className="seminar p-2">
            <div className="seminar-inner-1">
            <Calendar
                isMultiple={true}
                selected={allSeminarDates}
                onChange={date => onChange(date)}
            />
            </div>

            <div className="seminar-inner">
                <h1 className="lead m-1">Add Seminar</h1>
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
                            onChange={e => onFieldChange(e)}
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
                            onChange={e => onFieldChange(e)}
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
                            onChange={e => onFieldChange(e)}
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
                            onChange={e => onFieldChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <p className="form-text">
                            <strong>Difficulty : *</strong>
                        </p>
                    </div>
                    <select name="difficulty" value={difficulty} onChange={e => onFieldChange(e)}>
                        <option value="0">Select Difficulty</option>
                        <option value="Hard">Hard</option>
                        <option value="Medium">Medium</option>
                        <option value="Easy">Easy</option>
                    </select>
                    <input type="Submit" className="btn btn-primary my-2"/>
                </form>
            </div>
        </div>
    )
}

SeminarTab.propTypes = {
    addSeminar: PropTypes.func.isRequired,
    getSeminars: PropTypes.func.isRequired,
    seminar: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    seminar: state.seminar
});

export default connect(mapStateToProps, { addSeminar, getSeminars })(SeminarTab)
