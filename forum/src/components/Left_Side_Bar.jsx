import './Left_Side_Bar.css';
import Menu_Button from './Menu_Button.jsx';
import Trending_Topics from './Trending_Topics.jsx';

function Left_Side_Bar() {

    return (
        
        <nav className = "left_side_bar"> 
    
            <div className = "left_side_buttons">

                <Menu_Button className = "post_button" icon = "✉️" text = "Post"></Menu_Button>
                <Menu_Button className = "home_button" icon = "🏠" text = "Home"></Menu_Button>
                <Menu_Button className = "explore_button" icon = "🧭" text = "Explore"></Menu_Button>

            </div>

            <hr className="separator" />

            <Trending_Topics/>

        </nav>
    )
}

export default Left_Side_Bar;

