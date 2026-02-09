/* This component renders a single post. */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Post.css';
import Pill_Button from './Pill_Button';
import Vote_Button from './Vote_Button';
import Comment from './Comment';
import { user_controller } from '../controllers/user_controller';

function Post({id, title, user, date, content, votes, isPreview, comments}) {
    
    const author = user_controller.getUserByName(user);
    const current_user = user_controller.getCurrentUser();
    const isAuthor = current_user.username === user;

    /* If we are in Preview (Home), hide comments. If Full Page, show them */
    const [showComments, setShowComments] = useState(!isPreview);

    const navigate = useNavigate();

    /* Navigates to the specific post page */
    const handlePostClick = () => {

        if (isPreview) {
            navigate(`/post/${id}`);
        }
    };

    /* Displays post comments*/
    const handleCommentButtonClick = () => {

        /* If we are on the Home page (Preview), don't toggle! */
        if (isPreview) 
            return;

        /* If we are on the Post Page, toggle the visibility. */
        setShowComments(!showComments);
    };

    return (
        
        <div className = {`post_container ${isPreview ? 'clickable_post' : ''}`} onClick={handlePostClick}>

            <div className = "post_block">

                {/* Section 1: Post Header */}
                <div className = 'post_header'>

                    <img 
                        src = {author.avatar}
                        className = "post_avatar"
                    />

                    <div className = "post_info">

                        {/* Post author */}
                        <span className = "post_author"> 
                            @{user}
                        </span>

                        {/* Post date */}
                        <span className = "post_date">
                            • {date}
                        </span>

                    </div>

                    {/* Delete Button */}
                    {isAuthor && (
                        <button 
                            className = "delete_button"
                            onClick={(e) => {
                                e.stopPropagation();
                                alert("Backend WIP");
                            }}
                        >
                            🗑
                        </button>
                    )}
                    
                </div>

                {/* Post title */}
                <h2 className = "post_title">
                    {title}
                </h2>

                {/* Post content */}
                <p className = "post_content">
                    {content}
                </p>


                {/* Reply would be here */}
                {/* Section 2: Post Footer */}
                <div className = "post_footer">

                    <div onClick = {(e) => e.stopPropagation()}>

                        {/* Vote_Button component */}
                        <Vote_Button 
                            initialScore = {votes}>
                        </Vote_Button>

                    </div>

                    {/* Comment Button */}
                    <Pill_Button 
                        className = "comment_button"
                        icon = "💬"
                        text = {showComments ? "Hide Comments" : `Comments (${comments.length})`}
                        onClick = {handleCommentButtonClick}>
                    </Pill_Button>
                    
                </div>
                
            </div>

            {/* Section 3: Comment Section */}
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