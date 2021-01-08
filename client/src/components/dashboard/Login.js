import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Login = props => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }); // copy formData and update single field

    const onSubmit = async e => {
        e.preventDefault();
    };

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
                            placeholder="******"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <input 
                        type="submit"
                        class="btn btn-primary"
                    />
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {

}

export default Login
