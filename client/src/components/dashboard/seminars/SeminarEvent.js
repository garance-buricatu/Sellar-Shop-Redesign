import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { deleteSeminar } from '../../../actions/seminar'

export const SeminarEvent = ({ sem, setToggle, toggle, key, currDate, deleteSeminar }) => {

    const onClick = () => {
        deleteSeminar(sem._id);
        setToggle(!toggle);
    }

    const getDateToDisplay = () => {
        return sem.seminarDates.filter(semDate => (
            new Date(semDate.dateOfEvent).getDate()+1 === currDate.getDate() &&
            new Date (semDate.dateOfEvent).getMonth() === currDate.getMonth() &&
            new Date(semDate.dateOfEvent).getFullYear() === currDate.getFullYear()
        ))
    }

    const dateToDisplay = getDateToDisplay();

    return (
        <div className="display-seminar m-1" key={key}>
            <div className="display-seminar-inner">
                <img
                    src={sem.photoURL}
                    height="auto"
                    width="150px"
                    className="display-seminar-inner-img"
                    alt={`seminar with id: ${sem._id}`}
                />
                <div className="display-seminar-inner-details mx-1">
                    <ul>
                        <li>
                            <p className="form-text seminar-text"><strong>Project Name: </strong></p>
                            {sem.project === null ? 'N/A' : sem.project}
                        </li>
                        <li>
                            <p className="form-text seminar-text"><strong>Location: </strong></p>
                            {sem.location === null ? 'N/A' : sem.location}
                        </li>
                        <li>
                            <p className="form-text seminar-text"><strong>Difficulty: </strong></p>
                            {sem.difficulty === null ? 'N/A' : sem.difficulty} 
                        </li>
                        <li>
                            <p className="form-text seminar-text"><strong>Details: </strong></p>
                            {sem.details === null ? 'N/A' : sem.details}
                        </li>
                        
                        <li>
                            <p className="form-text seminar-text"><strong>Time: </strong></p>
                            {dateToDisplay.startTime === null || dateToDisplay.endTime === null ? 
                                'N/A' : (
                                    `${dateToDisplay[0].startTime} - ${dateToDisplay[0].endTime}`
                                )
                            }
                        </li>
                    </ul>
                </div>
            </div>
            <button 
                className="btn btn-danger mx-2"
                onClick={onClick}
            >
                X
            </button>            
        </div>
    )
}

SeminarEvent.propTypes = {
    deleteSeminar: PropTypes.func.isRequired,
}

export default connect(null, {deleteSeminar})(SeminarEvent)
