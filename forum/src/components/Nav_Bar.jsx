import './Nav_Bar.css';
import { Link } from 'react-router-dom';
import Phantom_Logo from '../media/Phantom_Logo.png';
import Pill_Button from './Pill_Button';
import Profile_Icon from './Profile_Icon';

function Nav_Bar(){

    return (

        <nav className = "nav_bar">

            <div className = "left">
                
                <Link to = '/' className = "home_link">

                    <img
                        src = {Phantom_Logo}
                        alt = "failed to load images"
                        className = "logo"
                    />
                </Link>

                <Link to = '/' className = "home_link">
                    <span className = "logo_text">
                        The Phantom Aficionado Forum
                    </span>
                </Link>
                

            </div>
            
            <div className = "center">

                <div className = "search_bar">

                    <input
                        type = "text" 
                        placeholder = "Search..." 
                        className = "search_input"
                    />

                </div>    

            </div>

            <div className = "right">

                <div className = "links">

                    <Link to = "/" className= 'home_link'>
                        <Pill_Button 
                            className = "home_button"
                            icon = ""
                            text = "Home"> 
                        </Pill_Button>
                    </Link>

                    <Pill_Button 
                        className = "log_in_button"
                        icon = ""
                        text = "Log In"> 
                    </Pill_Button>

                </div>

                <Profile_Icon/>

            </div>
            
        </nav>
    );
}

export default Nav_Bar;