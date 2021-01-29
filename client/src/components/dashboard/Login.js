import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

const Login = ({ loginUser, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }); // copy formData and update single field

    const onSubmit = async e => {
        e.preventDefault();
        loginUser(email, password);
    };

    // Redirect if logged in
    if (isAuthenticated){
        return <Redirect to="/dashboard"/>
    }

    return (
        <div className="login">
            <div className="login-inner my-3 p-2">
                <form className="form" onSubmit={e => onSubmit(e) }>
                    <p className="lead">
                        <strong>Login</strong>
                    </p>
                    <div className="form-group">
                        <p className="form-text">
                            <strong>Email : *</strong>
                        </p>
                        <input 
                            type="text"
                            placeholder="john.doe@gmail.com"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <p className="form-text">
                            <strong>Password : *</strong>
                        </p>
                        <input 
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <input 
                        type="submit"
                        className="btn btn-primary"
                    />
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({ // state comes from reducer state
    isAuthenticated: state.auth.isAuthenticated,
    loginUser: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { loginUser })(Login)
