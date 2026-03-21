/* This is the login page of the application. */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLogin } from '../hooks/useLogin';

import phantom_logo from '../media/Phantom_Logo.png';

import './Login.css';

function Login() {

    const navigate = useNavigate();
    const loginMutation = useLogin();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (e) => {

        e.preventDefault();

        loginMutation.mutate(
            { identifier, password, remember: rememberMe },
            {
                onSuccess: () => {
                    navigate('/')
                }
            }
        );
    }

    return (

        <div className = "login_page">

            <form className = "login_card" onSubmit={handleLogin}>

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

                {loginMutation.isError && (
                    <p style={{ color: 'red', fontSize: '14px' }}>
                        Invalid credentials. Try again!
                    </p>
                )}

                <label>
                    Email or Username
                    <input 
                        type = "text" 
                        value = {identifier} 
                        onChange={(e) => setIdentifier(e.target.value)} 
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

                <div className = "checkbox_container">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input 
                            type="checkbox" 
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            style={{ margin: 0, width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span style={{ lineHeight: 1, paddingTop: '2px' }}>Remember me</span>
                    </label>
                </div>

                <button type = "submit" className = "login_button" disabled = {loginMutation.isPending}>
                    Log In
                </button>

                <button 
                    type = "button" 
                    className = "guest_button" 
                    onClick = {() => {
                        localStorage.removeItem('token');
                        navigate('/');
                        }
                    }
                >
                    Continue as Guest
                </button>

                <p className = "login_footer">
                    Don't have an account? <Link to = "/signup" className = "signup_link">Sign Up</Link>
                </p>

            </form>

        </div>
    );
}

export default Login;