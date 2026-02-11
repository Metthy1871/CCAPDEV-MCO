/* This component renders a single comment to a post. */

import { useState } from 'react';
import './Comment.css';
import Vote_Button from './Vote_Button';
import Pill_Button from './Pill_Button';
import { user_controller } from '../controllers/user_controller';

function Comment({user, date, content, votes, comments}) {

    const author = user_controller.getUserByName(user);
    const current_user = user_controller.getCurrentUser();
    const isAuthor = current_user.username === user;

    const [showComments, setShowComments] = useState(true);

    /* Reply */
    const [isReplying, setIsReplying] = useState(false);
    const [allNestedComments, setAllNestedComments] = useState(comments) || [];

    const handleReply = (text) =>{ 
        if (!text.trim()) return;

        const newReply = {
            user: current_user.username,
            date: "Just now",
            content: text,
            votes: 0,
            comments: []
        }
        setAllNestedComments([...allNestedComments, newReply]);
        setIsReplying(false);
    }

    return (

        <div className = "comment_container">

            <div className = "comment_block">

                {/* Section 1: Comment Header */}
                <div className = "comment_header">

                    <img 
                        src = {author.avatar}
                        className = "post_avatar"
                    />

                    <div className = "post_info">

                        {/* Comment author */}
                        <span className = "comment_user">
                            @{user} 
                        </span>

                        {/* Comment date */}
                        <span className = "comment_date"> 
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

                {/* Comment content */}
                <p className = "comment_content"> 
                    {content} 
                </p>

                {/* Reply would be here */}
                <Pill_Button 
                    icon="✍️" 
                    text="Reply" 
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent navigating to post page if clicking here
                        setIsReplying(!isReplying);
                    }} 
                />
                
                {isReplying && (
                    <div className="reply_box">
                        <textarea
                            placeholder="What are your thoughts?" 
                            id="comment-reply"
                            onChange={(e) =>{
                                e.target.style.height = 'auto';
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                        />
                        <div class="post-comment-button">
                            <Pill_Button 
                                icon="🔪"
                                text="Post Comment"
                                onClick={() => 
                                    handleReply(document.getElementById("comment-reply").value)
                                }
                            />
                        </div>
                    </div>
                )}

                {/* Section 2: Comment Footer */}
                <div className = "comment_footer">

                    {/* Vote_Button component */}
                    <Vote_Button 
                        initialScore = {votes}>
                    </Vote_Button>

                    {/* Comment Button */}
                    {allNestedComments.length > 0 && (
                        <Pill_Button 
                            className = "comment_button"
                            icon = "💬"
                            text = {showComments ? "Hide Comments" : `Comments (${comments.length})`}
                            onClick = {() => setShowComments(!showComments)}>
                                {showComments ? "[-]" : `[+] ${allNestedComments.length} replies`}
                        </Pill_Button>
                    )}
                    
                </div>

            </div>

            {/* Section 3: Comment Section */}
            {showComments && allNestedComments.length > 0 && (
                <div className="nested_thread_container">
                    {allNestedComments.map((commentData, index) => (
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