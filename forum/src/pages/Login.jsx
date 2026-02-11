/* This is the login page of the application. */

import { useState } from 'react';
import './Login.css';
import phantom_logo from '../media/phantom_logo.png';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="login_page">
            <form className="login_card" onSubmit={handleSubmit}>
                {/* Links to home page */}
                <Link to = "/">

                    {/* Web app logo */}
                    <img
                        src = {phantom_logo}
                        alt = "failed to load images"
                        className = "logo"
                    />

                </Link>

                {/* Links to home page */}
                <Link to = "/" className="link">

                    {/* Web app title */}
                    <h1 className = "login_title">
                        The Phantom Forum
                    </h1>

                </Link>
                <p className="login_subtitle">Log in to continue</p>
                <label>
                    Email
                    <input 
                        type ="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </label>

                <label>
                    Password
                    <input 
                        type ="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </label>

                <button type="submit" className="login_button">Log In</button>
                <p className="login_footer">
                    Don't have an account? <Link to="/signup" className="signup_link">Sign Up</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;