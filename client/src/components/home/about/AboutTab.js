import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBonnieProfile } from '../../../actions/profile'

import Spinner from '../../layout/Spinner'

const AboutTab = ({ getBonnieProfile, profile : { profile, loading } }) => {
    
    useEffect(() => { 
        getBonnieProfile();
    }, [getBonnieProfile]);

    return (
        <div className="p-2">
            {profile === null || loading ? <Spinner /> : (
                <div>
                    <div className="about">
                    <h1 className="lead p-1">{profile.user.name}</h1>
                        <img 
                            src={profile.avatar}
                            alt="Bonnie's Profile"
                        />
                        <div className="p-2" dangerouslySetInnerHTML={{ __html: profile.description }} />
                    </div>
                    <h3 className="m-1">Awards and Honors</h3>
                    <table className="table-2">
                        <tbody>
                            {profile.awards.map(award => (
                                <tr key={award.id}>
                                    <td className="date"><strong>{award.date}</strong></td>
                                    <td>{award.title}</td>
                                    <td>{award.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

AboutTab.propTypes = {
    getBonnieProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getBonnieProfile })(AboutTab)
