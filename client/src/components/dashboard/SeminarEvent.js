import React from 'react'

export const SeminarEvent = ({sem}) => {
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
            </div>
            
        </div>
    )
}

export default SeminarEvent
