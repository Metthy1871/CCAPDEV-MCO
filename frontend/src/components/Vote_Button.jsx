/* This component renders the voting button for posts and comments. */

import './Vote_Button.css';

function Vote_Button({ score, hasUpvoted, hasDownvoted, onVote, isGuest }) {
    
    return (

        <div className = {`vote_pill ${isGuest ? 'locked' : ''}`}>

            {/* Upvote button */}
            <button 
                className = {`vote_button upvote ${hasUpvoted ? 'active' : ''}`} 
                onClick = {(e) => onVote('up', e)}
            >
                ▲
            </button>

            {/* Display votes */}
            <span className = {`vote_score ${(hasUpvoted || hasDownvoted) ? 'highlight' : ''}`}>
                {score}
            </span>

            {/* Downvote button */}
            <button 
                className = {`vote_button downvote ${hasDownvoted ? 'active' : ''}`} 
                onClick = {(e) => onVote('down', e)}
            >
                ▼
            </button>

        </div>
    );
}

export default Vote_Button;