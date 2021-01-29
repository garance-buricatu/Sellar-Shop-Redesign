import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { deleteSeminar } from '../../../actions/seminar'

export const SeminarEvent = ({ sem, setToggle, toggle, key, deleteSeminar }) => {

    const onClick = () => {
        deleteSeminar(sem._id);
        setToggle(!toggle);
    }

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
                            <p className="form-text seminar-text"><strong>Start Time: </strong></p>
                            {sem.startTime === null ? 'N/A' : sem.startTime}
                        </li>
                        <li>
                            <p className="form-text seminar-text"><strong>End Time: </strong></p>
                            {sem.endTime === null ? 'N/A' : sem.endTime}
                        </li>
                        {sem.recurring === null || sem.recurring === false ? '' : <li><p className="form-text seminar-text"><strong>Recurring</strong></p></li>}
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
