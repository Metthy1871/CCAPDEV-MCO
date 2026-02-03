/* This is the signup page of the application. */

import { useState } from 'react';
import './Signup.css';
import phantom_logo from '../media/phantom_logo.png';
import { Link } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    }

    return (
        <div className="signup_page">
            <form className="signup_card" onSubmit={handleSubmit}>
                <img src={phantom_logo} alt="failed to load images" className="logo"/>
                <h1 className="signup_title">Create Account</h1>
                <p className="signup_subtitle">Sign up to join The Phantom Forum</p>
                <label>
                    Username
                    <input 
                        type ="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                    />
                </label>

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

                <label>
                    Confirm Password
                    <input 
                        type ="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required
                    />
                </label>

                <button type="submit" className="signup_button">Sign Up</button>
                <p className="signup_footer">
                    Already have an account? <Link to="/login" className="login_link">Log In</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;