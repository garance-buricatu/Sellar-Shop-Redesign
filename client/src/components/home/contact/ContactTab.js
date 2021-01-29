import React from 'react'
import { Link } from 'react-router-dom';

const ContactTab = props => {
    return (
        <div className="contact p-4">
            <h3>For sales or more information:</h3> 
            <p>bonnie.frederico@gmail.com <br/> + 1 508-839-4550</p>
            <h3 className="my-1">Social Media </h3>
            <Link 
                to="/login"
                target='_blank'
            > 
                <h3>Admin dashboard</h3>
            </Link>
        </div>
    )
}

export default ContactTab
