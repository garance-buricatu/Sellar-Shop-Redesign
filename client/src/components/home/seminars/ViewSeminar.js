import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSeminar } from '../../../actions/seminar'

const ViewSeminar = ({ getSeminar, seminar: { loading, seminar }, match }) => {
    
    useEffect(() => { 
        getSeminar(match.params.id);
    }, [getSeminar, match.params.id]);

    return (
        <div>
            hey
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
