/* This component renders the voting button for posts and comments. */

import { useState } from 'react';
import './Vote_Button.css';

/* Temporary backend */
function Vote_Button({initialScore}) {

    /* State to track the score locally */
    const [score, setScore] = useState(initialScore);
    
    /* State to track user's choice: 0 = none, 1 = up, -1 = down */
    const [userVote, setUserVote] = useState(0);

    /* Handle Upvote */
    const handleUp = () => {

        /* Already voted */
        if (userVote === 1) {
            setScore(score - 1);
            setUserVote(0);
        } 
        
        /* Downvoted */
        else if (userVote === -1) {
            setScore(score + 2);
            setUserVote(1);
        } 
        
        /* Not yet voted */
        else {
            setScore(score + 1);
            setUserVote(1);
        }
    };

    /* Handle Downvote */
    const handleDown = () => {

        /* Already voted */
        if (userVote === -1) {
            setScore(score + 1);
            setUserVote(0);
        } 
        
        /* Downvoted */
        else if (userVote === 1) {
            setScore(score - 2);
            setUserVote(-1);
        } 
        
        /* Not yet voted */
        else {
            setScore(score - 1);
            setUserVote(-1);
        }
    };
    
    return (

        <div className = "vote_pill">

            {/* Upvote button */}
            <button 
                className={`vote_button upvote ${userVote === 1 ? 'active' : ''}`} 
                onClick={handleUp}
            >
                ▲
            </button>

            {/* Display votes */}
            <span className={`vote_score ${userVote !== 0 ? 'highlight' : ''}`}>
                {score}
            </span>

            {/* Downvote button */}
            <button 
                className={`vote_button downvote ${userVote === -1 ? 'active' : ''}`} 
                onClick={handleDown}
            >
                ▼
            </button>

        </div>
    );
}

export default Vote_Button;