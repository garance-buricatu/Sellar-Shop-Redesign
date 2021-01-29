import React from 'react'

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router'

const Navbar = props => {
    const history = useHistory()

    return (
        <div className="navbar">
            <div className="dark-overlay">
                <Link style={{ textDecoration: 'none' }} onClick={() => history.go(0)} to="">
                    <h1 className="x-large">
                        The Sellar Shop
                    </h1>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
