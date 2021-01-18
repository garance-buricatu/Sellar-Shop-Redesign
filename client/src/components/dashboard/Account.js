import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setPassword } from '../../actions/users'; 

const Account = ({ setPassword }) => {
    const [formData, setFormData] = useState({
        curr_password:'',
        new_password:'',
        new_password2:''
    });

    const { curr_password, new_password, new_password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }); // copy formData and update single field

    const onSubmit = async e => {
        e.preventDefault();
        setPassword(curr_password, new_password, new_password2);
    };

    return (
        <div className="account p-3">
            <p className="lead">Change password</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <p className="form-text">
                        <strong>Current Password : *</strong>
                    </p>
                    <input 
                        type="password"
                        placeholder="Current Password"
                        name="curr_password"
                        value={curr_password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <p className="form-text">
                        <strong>New Password : *</strong>
                    </p>
                    <input 
                        type="password"
                        placeholder="New Password"
                        name="new_password"
                        value={new_password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <p className="form-text">
                        <strong>Confirm Password : *</strong>
                    </p>
                    <input 
                        type="password"
                        placeholder="Confirm Password"
                        name="new_password2"
                        value={new_password2}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input 
                    type="submit"
                    class="btn btn-primary"
                />
            </form>
        </div>
    )
}

Account.propTypes = {
    setPassword: PropTypes.func.isRequired
}

export default connect(null, { setPassword })(Account)
