/* This component contains the post button and the Trending_Topics component. */

import './Left_Side_Bar.css';
import { useState, useEffect } from 'react';
import Pill_Button from '../components/Pill_Button.jsx'
import Trending_Topics from './Trending_Topics.jsx';
import Create_Post from './Create_Post.jsx';

function Left_Side_Bar() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        
        <nav className = "left_side_bar"> 

            {/* Post Button */}
            <Pill_Button 
                icon = "" 
                text = "Post" 
                className = "post_button"
                onClick={() => setIsModalOpen(true)}>
            </Pill_Button>

            <Create_Post
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />

            <hr className="separator" />

            {/* Trending Topics component */}
            <Trending_Topics/>

        </nav>
    )
}

export default Left_Side_Bar;

