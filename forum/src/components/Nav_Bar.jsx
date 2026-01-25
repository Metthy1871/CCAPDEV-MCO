import './Nav_Bar.css';
import Pill_Button from './Pill_Button';
import Profile_Icon from './Profile_Icon';

function Nav_Bar(){

    return (

        <nav className = "nav_bar">

            <div className = "left">
                
                <img
                    src = "https://wallpaperaccess.com/full/13458433.jpg"
                    alt = "failed to load images"
                    className = "logo"
                />

                <span className = "logo_text">
                    The Phantom Aficionado Forum
                </span>

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

                    <Pill_Button 
                        className = "register_button"
                        icon = ""
                        text = "Register"> 
                    </Pill_Button>

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