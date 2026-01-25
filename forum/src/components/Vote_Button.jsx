import './Vote_Button.css';
import { useState } from 'react';

function Vote_Button({initialScore}) {

    // 1. State to track the score locally
    const [score, setScore] = useState(initialScore);
    
    // 2. State to track user's choice: 0 = none, 1 = up, -1 = down
    const [userVote, setUserVote] = useState(0);

    // 3. Logic: Handle Upvote Click
    const handleUp = () => {
        if (userVote === 1) {
            // Already upvoted? Remove it (Toggle off)
            setScore(score - 1);
            setUserVote(0);
        } else if (userVote === -1) {
            // Was downvoted? Swap to up (+2)
            setScore(score + 2);
            setUserVote(1);
        } else {
            // Neutral? Just add 1
            setScore(score + 1);
            setUserVote(1);
        }
        // TODO: Here is where you'd fetch('api/upvote') later
    };

    // 4. Logic: Handle Downvote Click
    const handleDown = () => {
        if (userVote === -1) {
            // Already downvoted? Remove it
            setScore(score + 1);
            setUserVote(0);
        } else if (userVote === 1) {
            // Was upvoted? Swap to down (-2)
            setScore(score - 2);
            setUserVote(-1);
        } else {
            // Neutral? Subtract 1
            setScore(score - 1);
            setUserVote(-1);
        }
    };
    
    return (

        <div className = "vote_pill">

            <button 
                className={`vote_btn up ${userVote === 1 ? 'active' : ''}`} 
                onClick={handleUp}
            >
                ▲
            </button>

            {/* SCORE DISPLAY */}
            <span className={`vote_score ${userVote !== 0 ? 'highlight' : ''}`}>
                {score}
            </span>

            {/* DOWN BUTTON */}
            <button 
                className={`vote_btn down ${userVote === -1 ? 'active' : ''}`} 
                onClick={handleDown}
            >
                ▼
            </button>

        </div>
    );
}

export default Vote_Button;