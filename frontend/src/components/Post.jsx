/* This component renders a single post. */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Pill_Button from './Pill_Button';
import Vote_Button from './Vote_Button';
import Comment from './Comment';

import { useFetchCurrentUser } from '../hooks/useFetchCurrentUser';
import { useFetchUserByName } from '../hooks/useFetchUserByName';
import { useCreateComment } from '../hooks/useCreateComment';
import { getRelativeTime, getExactTime } from '../utils/timeUtils';

import './Post.css';

function Post({_id, title, author, createdAt, updatedAt, content, upvotes, isPreview, tags = [], comments = []}) {
    
    const { data: authorProfile } = useFetchUserByName(author.username);
    const { data: current_user } = useFetchCurrentUser();
    const createCommentMutation = useCreateComment();

    const isAuthor = current_user?.username === author.username;
    const relativeDate = getRelativeTime(createdAt);
    const exactDate = getExactTime(createdAt);
    const isEdited = createdAt !== updatedAt;

    /* If we are in Preview (Home), hide comments. If Full Page, show them */
    const [showComments, setShowComments] = useState(!isPreview);

    /* Reply */
    const [isReplying, setIsReplying] = useState(false);

    const navigate = useNavigate();

    /* Navigates to the specific post page */
    const handlePostClick = () => {

        if (isPreview) {
            navigate(`/post/${_id}`);
        }
    };

    const handleReply = (text) => { 

        if (!text.trim()) 
            return;

        createCommentMutation.mutate({
            postId: _id,
            updatedComments: text,
            parentCommentId: null
        });

        setReplyText("");
        setIsReplying(false);
        setShowComments(true);
    }

    return (
        
        <div className = "post_container">

            <div className = {`post_block ${isPreview ? 'clickable_post' : ''}`} onClick={handlePostClick}>

                {/* Section 1: Post Header */}
                <div className = 'post_header'>

                    <Link 
                        to = {`/profile/${author.username}`}
                        onClick = {(e) => e.stopPropagation()}>

                        <img 
                            src = {authorProfile?.avatar}
                            className = "post_avatar"
                        />
                    </Link>

                    <div className = "post_info">

                        {/* Post author */}
                        <span className = "post_author"> 
                            @{author.username}
                        </span>

                        {/* Post date */}
                        <span className = "post_date" title = {exactDate}>
                            • {relativeDate}

                            {isEdited && <span style={{ fontStyle: 'italic', marginLeft: '4px', opacity: 0.7 }}>(edited: {updatedAt})</span>}
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
                
                <div className="post_tags">
                    {tags.map((tag, index) => (
                        <span 
                            key = {index} 
                            className = "tag_pill"
                            onClick = {(e) => {
                                e.stopPropagation();
                            }}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Post content */}
                <p className = "post_content">
                    {content}
                </p>

                {/* Section 2: Post Footer */}
                <div className = "post_footer">

                    <div onClick = {(e) => e.stopPropagation()}>

                        {/* Vote_Button component */}
                        <Vote_Button 
                            initialScore = {upvotes.length}>
                        </Vote_Button>

                    </div>

                    {/* Reply Button */}
                    <Pill_Button 
                        icon = "✍️" 
                        text = "Reply" 
                        onClick = {(e) => {
                            e.stopPropagation(); // Prevent navigating to post page if clicking here
                            
                            if (isPreview)
                                navigate(`/post/${_id}`)
                            
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
                        {comments.map((commentData) => (
                            <Comment 
                                key = {commentData._id} 
                                postId = {_id}
                                {...commentData}
                            />
                        ))}
                    </div>
            )}

        </div>
    );
}

export default Post;