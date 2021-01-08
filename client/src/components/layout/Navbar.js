import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom';

const Navbar = props => {
    return (
        <div className="navbar">
            <div className="dark-overlay">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <h1 className="x-large px-2">
                        The Sellar Shop
                    </h1>
                </Link>
            </div>
        </div>
    )
}

Navbar.propTypes = {

}

export default Navbar
