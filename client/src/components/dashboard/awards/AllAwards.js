import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteAward } from '../../../actions/profile'
import Moment from 'react-moment'

const AllAwards = ({ awards, deleteAward }) => {
    const awardList = awards.map(award => (
        <tr key={award._id}>
            <td><div>{award.title}</div></td>
            <td><div>{award.description}</div></td>
            <td><div>{award.date}</div></td>
            <td className="actions">
                <div>
                <button 
                    className="btn btn-danger"
                    onClick={() => deleteAward(award._id)}
                >
                    Delete
                </button>
                </div>
            </td>
        </tr>
    ));
    return (
        <div>
            <h2 className="mx-2">All Awards</h2>
            {awards.length === 0 ? (
                <div className="p-2">
                    <h1 className="lead">
                        No Awards Yet
                    </h1>
                </div>
            ) : (
                <div className="all-awards mx-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{awardList}</tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

AllAwards.propTypes = {
    award: PropTypes.array.isRequired,
    deleteAward: PropTypes.func.isRequired
}

export default connect(null, { deleteAward })(AllAwards)
