import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { deleteSeminar } from '../../../actions/seminar'

export const SeminarEvent = ({ sem, setToggle, deleteSeminar }) => {

    const onClick = () => {
        deleteSeminar(sem._id);
        setToggle(false);
    }

    return (
        <div className="display-seminar m-1">
            <div className="display-seminar-inner p-1">
            <img
                src={sem.photoURL}
                height="150px"
                width="auto"
                className="display-seminar-inner-img"
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
                </ul>
            </div>
            <button 
                className="btn btn-danger mx-2"
                onClick={onClick}
            >
                X
            </button>
            </div>
            
        </div>
    )
}

SeminarEvent.propTypes = {
    deleteSeminar: PropTypes.func.isRequired,
}

export default connect(null, {deleteSeminar})(SeminarEvent)