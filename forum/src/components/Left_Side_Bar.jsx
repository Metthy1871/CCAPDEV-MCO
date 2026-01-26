import './Left_Side_Bar.css';
import Pill_Button from '../components/Pill_Button.jsx'
import Trending_Topics from './Trending_Topics.jsx';

function Left_Side_Bar() {

    return (
        
        <nav className = "left_side_bar"> 

            <Pill_Button 
                icon = "" 
                text = "Post" 
                className = "post_button">
            </Pill_Button>

            <hr className="separator" />

            <Trending_Topics/>

        </nav>
    )
}

export default Left_Side_Bar;

