import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteAward } from '../../actions/profile'
import Moment from 'react-moment'

const AllAwards = ({ award, deleteAward }) => {
    const awards = award.map(award => (
        <tr key={award._id}>
            <td>{award.title}</td>
            <td>{award.description}</td>
            <td>
                {award.date === null ? 
                (<p>N/A</p>) : (
                    <Moment format='YYYY/MM/DD'>{award.date}</Moment>
                )}
            </td>
            <td>
                <button 
                    className="btn btn-danger"
                    onClick={() => deleteAward(award._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    ));
    return (
        <div className="all-awards">
            <h2 className="m-2">All Awards</h2>
            <table className="table m-2">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{awards}</tbody>
            </table>
        </div>
    )
}

AllAwards.propTypes = {
    award: PropTypes.array.isRequired,
    deleteAward: PropTypes.func.isRequired
}

export default connect(null, { deleteAward })(AllAwards)
