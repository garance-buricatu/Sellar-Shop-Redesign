import React, { useState } from 'react'

import Watercolor from './artwork_pages/Watercolor';
import Pencil from './artwork_pages/Pencil';
import Oil from './artwork_pages/Oil';
import Seminartab from './seminars/SeminarTab';
import ContactTab from './contact/ContactTab';
import AboutTab from './about/AboutTab';
import Latest from './Latest';

import { Icon } from 'semantic-ui-react';

const Home = props => {

    const [selectedTab, setSelectedTab] = useState('latest');

    const [show, setShow] = useState(true);

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="home">
            <div className="sidebar p-2">
                <div className="header" onClick={() => setShow(!show)}>
                    <h1 className="lead">
                        BONNIE FREDERICO
                    </h1>
                    <p>Artist</p>
                    <Icon name="caret down" className="carrot"/>
                </div>
                {show &&
                    <div className="sidebar-inner my-2">
                        <div className="dropdown">
                            <h1 className={`text-menu-home${showDropdown ? '-true' : ''}`} onClick={() => setShowDropdown(!showDropdown)}>PAINTINGS</h1>
                            {showDropdown && 
                                <div className="dropdown-content">
                                    <p 
                                        className={`${selectedTab === 'watercolor' ? 'selected' : ''}`}
                                        onClick={() => setSelectedTab('watercolor')}
                                    >Watercolor</p>
                                    <p 
                                        className={`${selectedTab === 'pencil' ? 'selected' : ''}`}
                                        onClick={() => setSelectedTab('pencil')}    
                                    >Pencil</p>
                                    <p 
                                        className={`${selectedTab === 'oil' ? 'selected' : ''}`}
                                        onClick={() => setSelectedTab('oil')}
                                    >Oil</p>
                                </div>
                            }
                        </div>
                        <div>
                        <h1 
                            className={`text-menu-home ${selectedTab === 'seminars' ? 'selected' : ''}`}
                            onClick={() => setSelectedTab('seminars')}
                        >SEMINARS</h1>
                        </div>
                        <div>
                        <h1 
                            className={`text-menu-home ${selectedTab === 'about' ? 'selected' : ''}`}
                            onClick={() => setSelectedTab('about')}
                        >ABOUT THE ARTIST</h1>
                        </div>
                        <div>
                        <h1 
                            className={`text-menu-home ${selectedTab === 'contact' ? 'selected' : ''}`}
                            onClick={() => setSelectedTab('contact')}    
                        >CONTACT</h1>
                        </div>
                    </div>
                }
            </div>
            <div className="main">
                <div className="main-inner m-4">
                {
                    selectedTab === 'latest' ? (
                        <Latest />
                    ) : selectedTab === 'watercolor' ? (
                        <Watercolor />
                    ) : selectedTab === 'pencil' ? (
                        <Pencil />
                    ) : selectedTab === 'oil' ? (
                        <Oil/>
                    ) : selectedTab === 'seminars' ? (
                        <Seminartab />
                    ) : selectedTab === 'about' ? (
                        <AboutTab />
                    ) : selectedTab === 'contact' ? (
                        <ContactTab />
                    ) : (
                        <h1>404</h1>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default Home
