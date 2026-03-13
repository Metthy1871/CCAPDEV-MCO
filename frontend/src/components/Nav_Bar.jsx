/* This component provides global navigation for the application. */

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useFetchCurrentUser } from '../hooks/useFetchCurrentUser';

import { user_controller } from '../controllers/user_controller';
import Pill_Button from './Pill_Button';
import Profile_Icon from './Profile_Icon';

import phantom_logo from '../media/phantom_logo.png';

import './Nav_Bar.css';


function Nav_Bar(){

    const navigate = useNavigate();

    const { data: current_user, isLoading } = useFetchCurrentUser();

    {isLoading && (
        <h2 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
            Loading Content... ⏳
        </h2>
    )}

    return (

        <nav className = "nav_bar">

            {/* Section 1: Logos */}
            <div className = "nav_left">
                
                {/* Links to home page */}
                <Link to = "/" className = "nav_link">

                    {/* Web app logo */}
                    <img
                        src = {phantom_logo}
                        alt = "failed to load images"
                        className = "logo"
                    />

                </Link>

                {/* Links to home page */}
                <Link to = "/" className = "nav_link">

                    {/* Web app title */}
                    <span className = "logo_text">
                        The Phantom Forum
                    </span>

                </Link>

            </div>
            
            {/* Section 2: Search Bar */}
            <div className = "nav_center">

                {/* Search bar in the center */}
                <div className = "search_bar">

                    <input
                        type = "text" 
                        placeholder = "Search..." 
                        className = "search_input"
                    />

                </div>    

            </div>

            {/* Section 3: Links and Utilities */}
            <div className = "nav_right">

                {/* Link to home page */}
                <Link to = "/" className = 'nav_link'>

                    {/* Home Button */}
                    <Pill_Button 
                        className = "home_button"
                        icon = ""
                        text = "Home"> 
                    </Pill_Button>

                </Link>

                {current_user ? (
                    
                    <>
                        {/* If logged in: Show Logout */}
                        <Pill_Button 
                            text="Logout" 
                            icon=""
                            className = "log_in_button"
                            onClick={() => {
                                user_controller.logoutUser();
                                navigate('/login');
                            }}
                        />
                    </>

                    ) : (

                        /* If logged out: Show Login */
                        <Link to = "/login" style={{textDecoration: 'none'}}>
                            <Pill_Button 
                                text="Login" 
                                icon=""
                                className = "log_in_button" 
                            />
                        </Link>
                    
                )}
                    
                {/* Link to profile page */}
                <Link to = {`/profile/${current_user?.username}`} className = 'nav_link'>
                
                    {/* Profile icon */}
                    <Profile_Icon user = {current_user}/>

                </Link>

            </div>
            
        </nav>
    );
}

export default Nav_Bar;