/* This component provides global navigation for the application. */

import './Nav_Bar.css';
import { Link } from 'react-router-dom';
import phantom_logo from '../media/phantom_logo.png';
import Pill_Button from './Pill_Button';
import Profile_Icon from './Profile_Icon';

function Nav_Bar(){

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

                {/* Link to login page */}
                <Link to = "/login" className = 'nav_link'>

                    {/* Log In Button */}
                    <Pill_Button 
                        className = "log_in_button"
                        icon = ""
                        text = "Log In"> 
                    </Pill_Button>

                </Link>
                    
                {/* Profile icon */}
                <Profile_Icon/>

            </div>
            
        </nav>
    );
}

export default Nav_Bar;