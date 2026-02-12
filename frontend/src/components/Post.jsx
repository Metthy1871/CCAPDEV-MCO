/* This component renders a single post. */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Pill_Button from './Pill_Button';
import Vote_Button from './Vote_Button';
import Comment from './Comment';
import { user_controller } from '../controllers/user_controller';
import './Post.css';

function Post({id, title, user, date, content, votes, isPreview, comments = []}) {
    
    const author = user_controller.getUserByName(user);
    const current_user = user_controller.getCurrentUser();
    const isAuthor = current_user.username === user;

    /* If we are in Preview (Home), hide comments. If Full Page, show them */
    const [showComments, setShowComments] = useState(!isPreview);

    /* Reply */
    const [isReplying, setIsReplying] = useState(false);
    const [allComments, setAllComments] = useState(comments);

    const navigate = useNavigate();

    /* Navigates to the specific post page */
    const handlePostClick = () => {

        if (isPreview) {
            navigate(`/post/${id}`);
        }
    };

    const handleReply = (text) =>{ 
        if (!text.trim()) 
            return;

        const newReply = {
            user: current_user.username,
            date: "Just now",
            content: text,
            votes: 0,
            comments: []
        }
        
        setAllComments([...allComments, newReply]);
        setIsReplying(false);
    }

    return (
        
        <div className = "post_container">

            <div className = {`post_block ${isPreview ? 'clickable_post' : ''}`} onClick={handlePostClick}>

                {/* Section 1: Post Header */}
                <div className = 'post_header'>

                    <Link 
                        to = {`/profile/${user}`}
                        onClick = {(e) => e.stopPropagation()}>

                        <img 
                            src = {author.avatar}
                            className = "post_avatar"
                        />
                    </Link>

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

                    <span className = "modify_post_container">

                        {/* Edit Button */}
                        {isAuthor && (
                            <button 
                                className = "edit_button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    alert("Backend WIP");
                                }}
                            >
                                ✎
                            </button>
                        )}

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

                    </span>

                </div>

                {/* Post title */}
                <h2 className = "post_title">
                    {title}
                </h2>

                {/* Post content */}
                <p className = "post_content">
                    {content}
                </p>

                {/* Section 2: Post Footer */}
                <div className = "post_footer">

                    <div onClick = {(e) => e.stopPropagation()}>

                        {/* Vote_Button component */}
                        <Vote_Button 
                            initialScore = {votes}>
                        </Vote_Button>

                    </div>

                    {/* Reply Button */}
                    <Pill_Button 
                        icon = "✍️" 
                        text = "Reply" 
                        onClick = {(e) => {
                            e.stopPropagation(); // Prevent navigating to post page if clicking here
                            
                            if (isPreview)
                                navigate(`/post/${id}`)
                            
                            else
                                setIsReplying(!isReplying);
                        }} 
                    />
                    
                </div>
                
                {isReplying && (

                        <div className = "reply_box">
                            <textarea
                                placeholder = "What are your thoughts?" 
                                id = "comment-reply"
                                onChange = {(e) =>{
                                    e.target.style.height = 'auto';
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                }}
                            />
                            
                            <div class = "reply_box_footer">
                                
                                <Pill_Button
                                    icon = ""
                                    text = "Cancel"
                                    onClick = {() =>
                                        setIsReplying(false)
                                    }
                                />

                                <Pill_Button 
                                    icon = ""
                                    text = "Comment"
                                    onClick = {() => 
                                        handleReply(document.getElementById("comment-reply").value)
                                    }
                                />

                            </div>

                        </div>
                    )}

            </div>
            
            {/* Section 3: Comment Section */}
            {showComments && (
                    <div className="comment_section_container">
                        {allComments.map((commentData, index) => (
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