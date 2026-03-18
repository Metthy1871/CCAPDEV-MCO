/* This component contains the post button and the Trending_Topics component. */

import Pill_Button from '../components/Pill_Button.jsx'
import Trending_Topics from './Trending_Topics.jsx';

import './Left_Side_Bar.css';

function Left_Side_Bar({ onOpenModal, isGuest }) {


    return (
        
        <nav className = "left_side_bar"> 

            {/* Post Button */}
            <Pill_Button 
                icon = "" 
                text = "Post" 
                className = {`post_button ${isGuest ? 'locked' : ''}`}
                onClick = {onOpenModal}>
            </Pill_Button>

            <hr className="separator" />

            {/* Trending Topics component */}
            <Trending_Topics/>

        </nav>
    )
}

export default Left_Side_Bar;

