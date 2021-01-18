import React, { useState } from 'react'
import PropTypes from 'prop-types'

import WatercolorTab from './watercolor/WatercolorTab';
import PencilTab from './pencil/PencilTab';
import OilTab from './oil/OilTab';
import Seminartab from './seminars/SeminarTab';
import ContactTab from './contact/ContactTab';
import AboutTab from './about/AboutTab';

const Home = props => {

    const [selectedTab, setSelectedTab] = useState('watercolor');

    return (
        <div className="home">
            <div className="sidebar p-2">
                <div className="header">
                    <h1 className="lead">
                        BONNIE FREDERICO
                    </h1>
                    <p>Artist</p>
                </div>
                <div className="sidebar-inner my-2">
                    <div className="dropdown">
                        <h1 className="text-menu-home dropdown-btn">PAINTINGS</h1>
                        <div className="dropdown-content">
                            <p 
                                className="text-menu-small"
                                onClick={() => setSelectedTab('watercolor')}
                            >Watercolor</p>
                            <p 
                                className="text-menu-small"
                                onClick={() => setSelectedTab('pencil')}    
                            >Pencil</p>
                            <p 
                                className="text-menu-small"
                                onClick={() => setSelectedTab('oil')}
                            >Oil</p>
                        </div>
                    </div>
                    <div>
                    <h1 
                        className="text-menu-home"
                        onClick={() => setSelectedTab('seminars')}
                    >SEMINARS</h1>
                    </div>
                    <div>
                    <h1 
                        className="text-menu-home"
                        onClick={() => setSelectedTab('about')}
                    >ABOUT THE ARTIST</h1>
                    </div>
                    <div>
                    <h1 
                        className="text-menu-home"
                        onClick={() => setSelectedTab('contact')}    
                    >CONTACT</h1>
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="main-inner m-4">
                {
                    selectedTab === 'watercolor' ? (
                        <WatercolorTab />
                    ) : selectedTab === 'pencil' ? (
                        <PencilTab />
                    ) : selectedTab === 'oil' ? (
                        <OilTab />
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

Home.propTypes = {

}

export default Home
