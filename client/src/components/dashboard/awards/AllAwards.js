import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteAward } from '../../../actions/profile'

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
            <p className="lead mx-2"><strong>All Awards</strong></p>
            {awards.length === 0 ? (
                <div className="p-2">
                    <h1 className="lead">
                        No Awards Yet
                    </h1>
                </div>
            ) : (
                <div className="all-awards mx-2">
                    <table className="table p-1">
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
