import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import ArtworksTab from './artworks/ArtworksTab';
import ProfileTab from './profile/ProfileTab';
import SeminarTab from './seminars/SeminarTab';
import AwardsTab from './awards/AwardsTab';
import Account from './Account';

import { Icon } from 'semantic-ui-react';

const Dashboard = ({ logout, auth: { loading, user } }) => {
    
    const [selectedTab, setSelectedTab] = useState('artworks');

    const [show, setShow] = useState(true);

    return (
        <Fragment>
            { !loading && (
                <div className="dashboard">
                    <div className="sidebar">
                        <div 
                            className="header"
                            onClick={() => setShow(!show)}
                        >
                            <h1 className="lead">
                                {user && user.name}
                            </h1>
                            <p>Admin</p>
                            <Icon name="caret down" className="carrot"/>
                        </div>
                        {show && 
                            <div className="menu">
                                <div 
                                    className="list-item"
                                    onClick={() => setSelectedTab('artworks')}
                                >
                                    <Icon name="images outline"/>
                                    <p className="text-menu">Edit Artworks</p>
                                </div>
                                <div 
                                    className="list-item"
                                    onClick={() => setSelectedTab('seminars')}
                                >
                                    <Icon name="calendar alternate outline"/>
                                    <p className="text-menu">Edit Seminar</p>
                                </div>
                                <div 
                                    className="list-item"
                                    onClick={() => setSelectedTab('profiles')}
                                >
                                    <Icon name="user outline"/>
                                    <p className="text-menu">Edit Profile</p>
                                </div>
                                <div 
                                    className="list-item"
                                    onClick={() => setSelectedTab('awards')}
                                >
                                    <Icon name="trophy"/>
                                    <p className="text-menu">Edit Awards and Videos</p>
                                </div>
                                <div 
                                className="list-item"
                                onClick={() => setSelectedTab('account')}
                            >
                                <Icon name="cog" />
                                <p className="text-menu">My Account</p>
                                </div>
                                <div 
                                    className="list-item"
                                    onClick={logout}
                                >
                                   <Icon name="sign out alternate"/>
                                    <p className="text-menu">Logout</p>
                                </div>        
                            </div>
                        }
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
