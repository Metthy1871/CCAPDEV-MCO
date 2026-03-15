/* This component renders the voting button for posts and comments. */

import { useState } from 'react';

import './Vote_Button.css';

function Vote_Button({initialScore}) {
    
    /* State to track user's choice: 0 = none, 1 = up, -1 = down */
    const [userVote, setUserVote] = useState(0);

    const displayScore = initialScore + userVote;

    /* Handle Upvote */
    const handleUp = (e) => {

        e.stopPropagation();

        setUserVote(userVote === 1 ? 0 : 1);
    };

    /* Handle Downvote */
    const handleDown = (e) => {

        e.stopPropagation();
        
        setUserVote(userVote === -1 ? 0 : -1);
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
                {displayScore}
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