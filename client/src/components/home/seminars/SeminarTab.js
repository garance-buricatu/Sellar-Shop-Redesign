import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSeminars, clearSeminar } from '../../../actions/seminar'
import { Link } from 'react-router-dom'
import Spinner from '../../layout/Spinner'

const SeminarTab = ({ getSeminars, clearSeminar, seminar : { loading, seminars }}) => {
    useEffect(() => { 
        getSeminars(); 
        clearSeminar();
    }, [getSeminars]);

    const colSize = Math.floor(seminars.length / 4);
    const colRem = seminars.length % 4;

    return (
        <div>
            <div className="grid p-2">
            <p className="centered">Click on image to get seminar details</p>
            {loading || seminars === null ? <Spinner /> : (
                seminars.length === 0 ? (<p className="centered p-1"><strong>There are no seminars to show yet</strong></p>) : (
                    <ul className="row">
                        <div className="column">
                            {
                                seminars.slice(0, colSize).map(sem => (
                                    <Link to={`/view-seminar/${sem._id}`}>
                                        <img src={sem.photoURL} width="100%" alt={`id: ${sem._id}`}></img>
                                    </Link>
                                ))
                            }
                            {
                                colRem > 0 && 
                                <Link to={`/view-seminar/${seminars[colSize * 4]._id}`}>
                                    <img src={seminars[colSize * 4].photoURL} width="100%" alt={`id: ${seminars[colSize * 4]._id}`}></img>
                                </Link>
                            }
                        </div>
                        <div className="column">
                            {
                                seminars.slice(colSize, colSize * 2).map(sem => (
                                    <Link to={`/view-seminar/${sem._id}`}>
                                        <img src={sem.photoURL} width="100%" alt={`id: ${sem._id}`}></img>
                                    </Link>
                                ))
                            }
                            {
                                colRem > 1 && 
                                <Link to={`/view-seminar/${seminars[colSize * 4 + 1]._id}`}>
                                    <img src={seminars[colSize * 4 + 1].photoURL} width="100%" alt={`id: ${seminars[colSize * 4 + 1]._id}`}></img>
                                </Link>
                            }
                        </div>
                        <div className="column">
                            {
                                seminars.slice(colSize * 2, colSize * 3).map(sem => (
                                    <Link to={`/view-seminar/${sem._id}`}>
                                        <img src={sem.photoURL} width="100%" alt={`id: ${sem._id}`}></img>
                                    </Link>
                                ))
                            }
                            {
                                colRem > 2 && 
                                <Link to={`/view-seminar/${seminars[colSize * 4 + 2]._id}`}>
                                    <img src={seminars[colSize * 4 + 2].photoURL} width="100%" alt={`id: ${seminars[colSize * 4 + 2]._id}`}></img>
                                </Link>
                            }
                        </div>
                        <div className="column">
                            {
                                seminars.slice(colSize * 3, colSize * 4).map(sem => (
                                    <Link to={`/view-seminar/${sem._id}`}>
                                        <img src={sem.photoURL} width="100%" alt={`id: ${sem._id}`}></img>
                                    </Link>
                                ))
                            }
                        </div>
                    </ul>
                ))}
            </div>
        </div>
    )
}

SeminarTab.propTypes = {
    getSeminars : PropTypes.func.isRequired,
    clearSeminar: PropTypes.func.isRequired,
    seminar: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    seminar: state.seminar
});

export default connect(mapStateToProps, { getSeminars, clearSeminar })(SeminarTab)
