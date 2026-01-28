import './Nav_Bar.css';
import { Link } from 'react-router-dom';
import phantom_logo from '../media/phantom_logo.png';
import Pill_Button from './Pill_Button';
import Profile_Icon from './Profile_Icon';

function Nav_Bar(){

    return (

        <nav className = "nav_bar">

            <div className = "nav_left">
                
                <Link to = "/" className = "nav_link">

                    <img
                        src = {phantom_logo}
                        alt = "failed to load images"
                        className = "logo"
                    />

                </Link>

                <Link to = "/" className = "nav_link">

                    <span className = "logo_text">
                        The Phantom Aficionado Forum
                    </span>

                </Link>

            </div>
            
            <div className = "nav_center">

                <div className = "search_bar">

                    <input
                        type = "text" 
                        placeholder = "Search..." 
                        className = "search_input"
                    />

                </div>    

            </div>

            <div className = "nav_right">

                <Link to = "/" className = 'nav_link'>

                    <Pill_Button 
                        className = "home_button"
                        icon = ""
                        text = "Home"> 
                    </Pill_Button>

                </Link>

                <Link to = "/login" className = 'nav_link'>

                    <Pill_Button 
                        className = "log_in_button"
                        icon = ""
                        text = "Log In"> 
                    </Pill_Button>

                </Link>
                    
                <Profile_Icon/>

            </div>
            
        </nav>
    );
}

export default Nav_Bar;