import { useState } from 'react';
import './Comment.css';
import Vote_Button from './Vote_Button';
import Pill_Button from './Pill_Button';

function Comment({user, date, content, votes, comments}) {

    const [showComments, setShowComments] = useState(true);
    const nestedComments = comments || [];

    return (

        <div className = "comment_container">

            <div className = "comment_block">

                <div className = "comment_header">

                    <span className = "comment_user"> @{user} </span>
                    <span className = "comment_date"> • {date} </span>

                </div>

                <p className = "comment_content"> 
                    {content} 
                </p>

                <div className = "comment_footer">

                    <Vote_Button 
                        initialScore = {votes}>
                    </Vote_Button>


                    {nestedComments.length > 0 && (

                        <Pill_Button 
                            className = "comment_button"
                            icon = "💬"
                            text = {showComments ? "Hide Comments" : `Comments (${comments.length})`}
                            onClick = {() => setShowComments(!showComments)}>
                                {showComments ? "[-]" : `[+] ${nestedComments.length} replies`}
                        </Pill_Button>
                    )}
                    
                </div>

            </div>

            {showComments && nestedComments.length > 0 && (
                <div className="nested_thread_container">
                    {nestedComments.map((commentData, index) => (
                        <Comment 
                            key={index} 
                            {...commentData} 
                        />
                    ))}
                </div>
            )}

        </div>
    );
}

export default Comment;