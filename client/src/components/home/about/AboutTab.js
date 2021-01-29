import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBonnieProfile } from '../../../actions/profile'

import Spinner from '../../layout/Spinner'

const AboutTab = ({ getBonnieProfile, profile : { profile, loading } }) => {
    
    useEffect(() => { 
        getBonnieProfile();
    }, [getBonnieProfile]);

    const getVideoId = url => {
        var edited_url = url.replace("watch?v=", "embed/");
        return edited_url.split('&')[0];
    }
    
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
                    <div className="about-awards">
                        <h3 className="p-1">Awards and Honors</h3>
                        <table className="table-2">
                            <tbody>
                                {profile.awards.map(award => (
                                    <tr key={award._id}>
                                        <td className="date"><strong>{award.date}</strong></td>
                                        <td>{award.title}</td>
                                        <td>{award.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h3 className="all-videos p-1">Videos and Projects</h3>  
                        <div>
                            <table className="table m-2">
                                <tbody>
                                    {profile.videos.map(vid => (
                                        <tr key={vid._id}>
                                            <td>
                                                <iframe title={vid._id} width="100%" height="300px" src={getVideoId(vid.link)}/>
                                            </td>
                                            <td><div>{vid.description}</div></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
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
