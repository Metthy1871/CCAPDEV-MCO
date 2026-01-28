import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Post.css';
import Pill_Button from './Pill_Button';
import Vote_Button from './Vote_Button';
import Comment from './Comment';

function Post({id, title, author, date, content, votes, isPreview, comments}) {
    
    const [showComments, setShowComments] = useState(!isPreview);

    const navigate = useNavigate(); // 2. Activate hook

    const handlePostClick = () => {

        if (isPreview) {
            navigate(`/post/${id}`);
        }
    };

    const handleCommentButtonClick = () => {
        // If we are on the Home page (Preview), don't toggle!
        // Just let the click bubble up to the container so it navigates.
        if (isPreview) 
            return;

        // If we are on the Post Page, toggle the visibility.
        setShowComments(!showComments);
    };

    return (
        
        <div className = {`post_container ${isPreview ? 'clickable_post' : ''}`} onClick={handlePostClick}>

            <div className = 'post_header'>

                <span className = "post_author"> @{author}</span>
                <span className = "post_date"> • {date}</span>

            </div>

            <h2 className = "post_title">
                {title}
            </h2>

            <p className = "post_content">
                {content}
            </p>

            <div className = "post_footer">

                <div onClick = {(e) => e.stopPropagation()}>

                    <Vote_Button 
                        initialScore = {votes}>
                    </Vote_Button>

                </div>

                <Pill_Button 
                    className = "comment_button"
                    icon = "💬"
                    text = {showComments ? "Hide Comments" : `Comments (${comments.length})`}
                    onClick = {handleCommentButtonClick}>
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

export default Post;