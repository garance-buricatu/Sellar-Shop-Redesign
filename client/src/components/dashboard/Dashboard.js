import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import ArtworksTab from './artworks/ArtworksTab';
import ProfileTab from './profile/ProfileTab';
import SeminarTab from './seminars/SeminarTab';
import AwardsTab from './AwardsTab';
import Account from './Account';
//import Spinner from '../layout/Spinner';

const Dashboard = ({ logout, auth: { loading, user } }) => {
    
    const [selectedTab, setSelectedTab] = useState('artworks');

    return (
        <Fragment>
            { !loading && (
                <div className="dashboard">
                    <div className="sidebar">
                        <div className="header">
                            <h1 className="lead">
                                {user && user.name}
                            </h1>
                            <p>Admin</p>
                        </div>
                        <div className="menu">
                            <div>
                                <div 
                                    className="list-item"
                                    onClick={() => setSelectedTab('artworks')}
                                >
                                    <i class="fa fa-picture-o" aria-hidden="true"></i>
                                    <p className="text-menu">Edit Artworks</p>
                                </div>
                                <div 
                                    className="list-item"
                                    onClick={() => setSelectedTab('seminars')}
                                >
                                    <i class="fa fa-calendar" aria-hidden="true"></i>
                                    <p className="text-menu">Edit Seminar</p>
                                </div>
                                <div 
                                    className="list-item"
                                    onClick={() => setSelectedTab('profiles')}
                                >
                                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                    <p className="text-menu">Edit Profile</p>
                                </div>
                                <div 
                                    className="list-item"
                                    onClick={() => setSelectedTab('awards')}
                                >
                                    <i class="fa fa-trophy" aria-hidden="true"></i>
                                    <p className="text-menu">Edit Awards and Videos</p>
                                </div>
                            </div>
                            <div>
                                <div 
                                    className="list-item"
                                    onClick={() => setSelectedTab('account')}
                                >
                                    <i class="fa fa-cog" aria-hidden="true"></i>
                                    <p className="text-menu">My Account</p>
                                </div>
                                <div 
                                    className="list-item"
                                    onClick={logout}
                                >
                                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                                    <p className="text-menu">Logout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main">
                        <div className="main-inner m-4">
                        {
                            selectedTab === 'artworks' ? (
                                <ArtworksTab />
                            ) : selectedTab === 'profiles' ? (
                                <ProfileTab />
                            ) : selectedTab === 'seminars' ? (
                                <SeminarTab />
                            ) : selectedTab === 'awards' ? (
                                <AwardsTab />
                            ) : selectedTab === 'account' ? (
                                <Account />
                            ) : (
                                <h1>404</h1>
                            )
                        }
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

Dashboard.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Dashboard);
