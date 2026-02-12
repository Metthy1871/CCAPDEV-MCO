/* This is the login page of the application. */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { user_controller } from '../controllers/user_controller';
import phantom_logo from '../media/phantom_logo.png';
import './Login.css';

function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = user_controller.loginUser(username, password);

        if (success) 
            navigate("/"); // Redirect to Home
        else 
            setError("Authentication Failed: User not found.");
        
    }

    return (

        <div className = "login_page">

            <form className = "login_card" onSubmit={handleSubmit}>

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
                <Link to = "/" className = "link">

                    {/* Web app title */}
                    <h1 className = "login_title">
                        The Phantom Forum
                    </h1>

                </Link>

                <p className = "login_subtitle">
                    Log in to continue
                </p>

                <label>
                    Username
                    <input 
                        type = "text" 
                        value = {username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                    />
                </label>

                <label>
                    Password
                    <input 
                        type = "password" 
                        value = {password} 
                        onChange = {(e) => setPassword(e.target.value)} 
                        required
                    />
                </label>

                <button type = "submit" className = "login_button">
                    Log In
                </button>

                <p className = "login_footer">
                    Don't have an account? <Link to = "/signup" className = "signup_link">Sign Up</Link>
                </p>

            </form>

        </div>
    );
}

export default Login;