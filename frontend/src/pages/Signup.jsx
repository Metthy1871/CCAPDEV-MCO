/* This is the signup page of the application. */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useRegister } from '../hooks/useRegister';

import phantom_logo from '../media/Phantom_Logo.png';

import './Signup.css';

function Signup() {

    const navigate = useNavigate();
    const registerMutation = useRegister();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const handleRegister = (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordError(true);
            return;
        }

        setPasswordError(false);

        registerMutation.mutate(
            { username, email, password },
            {
                onSuccess: () => {
                    navigate('/')
                }
            }
        )
    }

    return (

        <div className = "signup_page">

            <form className = "signup_card" onSubmit = {handleRegister}>

                {/* Links to home page */}
                <Link to = "/" className = "nav_link">

                    {/* Web app logo */}
                    <img
                        src = {phantom_logo}
                        alt = "failed to load images"
                        className = "logo"
                    />

                </Link>

                <h1 className = "signup_title">Create Account</h1>
                <p className = "signup_subtitle">Sign up to join The Phantom Forum</p>

                {registerMutation.isError && (
                    <p style={{ color: 'red', fontSize: '14px' }}>
                        {registerMutation.error?.response?.data?.message || "Registration failed. Please try again."}
                    </p>
                )}

                {passwordError && (
                    <p style={{ color: 'red', fontSize: '14px' }}>
                        Passwords do not match!
                    </p>
                )}

                <label>
                    Username
                    <input 
                        type = "text" 
                        value = {username} 
                        onChange = {(e) => setUsername(e.target.value)} 
                        required
                    />
                </label>

                <label>
                    Email
                    <input 
                        type = "email" 
                        value = {email} 
                        onChange = {(e) => setEmail(e.target.value)} 
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

                <label>
                    Confirm Password
                    <input 
                        type = "password" 
                        value = {confirmPassword} 
                        onChange = {(e) => setConfirmPassword(e.target.value)} 
                        required
                    />
                </label>

                <button type = "submit" className = "signup_button">
                    Sign Up
                </button>

                <p className = "signup_footer">
                    Already have an account? <Link to = "/login" className="login_link">Log In</Link>
                </p>

            </form>

        </div>
    );
}

export default Signup;