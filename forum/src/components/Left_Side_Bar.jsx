/* This component contains the post button and the Trending_Topics component. */

import './Left_Side_Bar.css';
import Pill_Button from '../components/Pill_Button.jsx'
import Trending_Topics from './Trending_Topics.jsx';

function Left_Side_Bar() {

    return (
        
        <nav className = "left_side_bar"> 

            {/* Post Button */}
            <Pill_Button 
                icon = "" 
                text = "Post" 
                className = "post_button">
            </Pill_Button>

            <hr className="separator" />

            {/* Trending Topics component */}
            <Trending_Topics/>

        </nav>
    )
}

export default Left_Side_Bar;

