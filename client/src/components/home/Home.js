import React, { useState, useRef } from 'react'

import Watercolor from './artwork_pages/Watercolor';
import Pencil from './artwork_pages/Pencil';
import Oil from './artwork_pages/Oil';
import Seminartab from './seminars/SeminarTab';
import ContactTab from './contact/ContactTab';
import AboutTab from './about/AboutTab';
import Latest from './Latest';

const Home = props => {

    const [selectedTab, setSelectedTab] = useState('latest');

    const [show, setShow] = useState(true);

    const dropdownItem = useRef(null);

    const changeStyle = () => {
        console.log(dropdownItem.current);
    }

    return (
        <div className="home">
            <div className="sidebar p-2">
                <div className="header" onClick={() => setShow(!show)}>
                    <h1 className="lead">
                        BONNIE FREDERICO
                    </h1>
                    <p>Artist</p>
                    <i class="fa fa-sort-desc carrot" aria-hidden="true"></i>
                </div>
                {show &&
                    <div className="sidebar-inner my-2">
                        <div className="dropdown">
                            <h1 className={`text-menu-small dropdown-btn`}>PAINTINGS</h1>
                            <div className="dropdown-content" ref={dropdownItem}>
                                <p 
                                    className={`text-menu-small ${selectedTab === 'watercolor' ? 'selected' : ''}`}
                                    onClick={() => {
                                        setSelectedTab('watercolor');
                                        changeStyle();
                                    }}
                                >Watercolor</p>
                                <p 
                                    className={`text-menu-small ${selectedTab === 'pencil' ? 'selected' : ''}`}
                                    onClick={() => setSelectedTab('pencil')}    
                                >Pencil</p>
                                <p 
                                    className={`text-menu-small ${selectedTab === 'oil' ? 'selected' : ''}`}
                                    onClick={() => setSelectedTab('oil')}
                                >Oil</p>
                            </div>
                        </div>
                        <div>
                        <h1 
                            className={`text-menu-small ${selectedTab === 'seminars' ? 'selected' : ''}`}
                            onClick={() => setSelectedTab('seminars')}
                        >SEMINARS</h1>
                        </div>
                        <div>
                        <h1 
                            className={`text-menu-small ${selectedTab === 'about' ? 'selected' : ''}`}
                            onClick={() => setSelectedTab('about')}
                        >ABOUT THE ARTIST</h1>
                        </div>
                        <div>
                        <h1 
                            className={`text-menu-small ${selectedTab === 'contact' ? 'selected' : ''}`}
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
