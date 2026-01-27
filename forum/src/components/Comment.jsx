import { useState } from 'react';
import './Comment.css';
import Vote_Button from './Vote_Button';
import Pill_Button from './Pill_Button';

function Comment({user, date, content, votes, comments}) {

    const [showComments, setShowComments] = useState(false);

    return (

        <div className = "comment_container">

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

                <Pill_Button 
                    className = "comment_button"
                    icon = "💬"
                    text = {showComments ? "Hide Comments" : `Comments (${comments.length})`}
                    onClick = {() => setShowComments(!showComments)}>
                </Pill_Button>

            </div>

            {showComments && (
                    <div className="comment_section_container">
                        {comments.map((commentData, index) => (
                            <Comment 
                                key={index} 
                                user={commentData.user} 
                                date={commentData.date}
                                content={commentData.content} 
                                votes={commentData.votes}
                                comments={commentData.comments}
                            />
                        ))}
                    </div>
            )}

        </div>
    );
}

export default Comment;