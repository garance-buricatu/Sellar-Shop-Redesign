import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSeminar } from '../../../actions/seminar'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import Spinner from '../../../components/layout/Spinner'

const ViewSeminar = ({ getSeminar, seminar: { loading, seminar }, match }) => {
    
    useEffect(() => { 
        getSeminar(match.params.id);
    }, [getSeminar, match.params.id]);

    return (
        <div>
            {seminar === null || loading ? <Spinner /> : (
                <div className="view-artwork p-2">
                    <img
                        src={seminar.photoURL}
                        className="m-1"
                        alt={`seminar with id: ${seminar._id}`}
                    />
                    <p className="lead">{seminar.project}</p>
                    <p><Moment format="MMMM Do YYYY">{seminar.dateOfEvent}</Moment></p>
                    <p>{seminar.details}</p>
                    <p><strong>Instructor: </strong>{seminar.user.name}</p>
                    <p><strong>Difficulty Level: </strong> {seminar.difficulty}</p>
                    <p><strong>Start time: </strong> {seminar.startTime}</p>
                    <p><strong>End time: </strong> {seminar.endTime}</p>
                    <Link to="/" className="btn btn-primary my-1">
                        Back
                    </Link>
                </div>
            )}
        </div>
    )
}

ViewSeminar.propTypes = {
    getSeminar: PropTypes.func.isRequired,
    seminar: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    seminar: state.seminar
});

export default connect(mapStateToProps, { getSeminar })(ViewSeminar)
