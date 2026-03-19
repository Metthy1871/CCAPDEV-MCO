/* This component renders a single comment to a post. */
import 'quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

import { useFetchCurrentUser } from '../hooks/useFetchCurrentUser';
import { useFetchUserByName } from '../hooks/useFetchUserByName';
import { useCreateComment } from '../hooks/useCreateComment';
import { useDeleteComment } from '../hooks/useDeleteComment';
import { useEditComment } from '../hooks/useEditComment';
import { getRelativeTime, getExactTime } from '../utils/timeUtils';

import Vote_Button from './Vote_Button';
import Pill_Button from './Pill_Button';
import Rich_Text from './Rich_Text';

import './Comment.css';

function getTextLength(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent.length;
}

function Comment({ postId, _id, author, createdAt, updatedAt, content, upvotes, isDeleted, comments, isGuest}) {

    const { data: authorProfile } = useFetchUserByName(author.username);
    const { data: current_user } = useFetchCurrentUser();

    const createCommentMutation = useCreateComment();
    const deleteCommentMutation = useDeleteComment();
    const editCommentMutation = useEditComment();

    const isAuthor = current_user?.username === author.username;
    const relativeDate = getRelativeTime(createdAt);
    const exactDate = getExactTime(createdAt);
    const formattedEditDte = getExactTime(updatedAt);
    const isEdited = createdAt !== updatedAt;

    const [showComments, setShowComments] = useState(true);

    /* Edit */
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(content);

    /* Reply */
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");

    useEffect(() => {
        setEditText(content);
    }, [content]);

    const handleReply = () => { 
        const html = replyText;
        if (!html || html === "<p><br></p>") return;

        createCommentMutation.mutate({
            postId,
            content: DOMPurify.sanitize(html),
            parentCommentId: _id
        });

        setIsReplying(false);
        setReplyText("");
    };

    return (

        <div className = "comment_container">

            {isDeleted ? (
                <div className = "deleted_comment_block">
                    <p style = {{ fontStyle: 'italic', color: 'gray' }}>
                        [This comment was deleted]
                    </p>
                </div>
            ) : (
                <div className="comment_block">
                   
                    {/* Section 1: Comment Header */}
                    <div className = "comment_header">

                        <Link 
                            to = {`/profile/${author.username}`}
                            onClick = {(e) => e.stopPropagation()}>

                            <img 
                                src = {authorProfile?.avatar}
                                className = "post_avatar"
                            />
                        </Link>

                        <div className = "post_info">

                            {/* Comment author */}
                            <span className = "comment_user">
                                @{author.username} 
                            </span>

                            {/* Comment date */}
                            <span className = "comment_date" title = {exactDate}> 
                                • {relativeDate} 

                                {isEdited && <span style={{ fontStyle: 'italic', marginLeft: '4px', opacity: 0.7 }}>(edited: {formattedEditDte})</span>}
                            </span>

                        </div>

                        <span className = "modify_post_container">

                            {/* Edit Button */}
                            {isAuthor && (
                                <button 
                                    className = "edit_button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsEditing(true);
                                        setEditText(content);
                                    }}
                                >
                                    ✎
                                </button>
                            )}

                            {/* Delete Button */}
                            {isAuthor && (
                                <button 
                                    className = "delete_button"
                                    disabled = {deleteCommentMutation.isPending}
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        if (window.confirm("Are you sure you want to delete this comment?")) {
                                            deleteCommentMutation.mutate({
                                                postId: postId,
                                                commentId: _id
                                            });
                                        }
                                    }}
                                >
                                    🗑
                                </button>
                            )}

                        </span>
                    </div>
                    
                    {/* Comment content */}
                    {isEditing ? (

                        <div 
                            className="reply_box" 
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Rich_Text
                                className="rich_text_editor"
                                key={_id + "_edit"} 
                                value={editText}
                                setValue={setEditText}
                            />

                            <span style = {{ fontSize: '12px', color: editText.trim().length > 10000 ? '#ff4d4d' : '#888' }}>
                                    {getTextLength(editText)}/10000
                            </span>
                            
                            <div className = "reply_box_footer" style = {{ marginTop: '5px' }}>

                                <Pill_Button
                                    icon = "" text = "Cancel"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditText(content); // revert to original
                                    }}
                                />

                                <Pill_Button 
                                    icon = "" text = "Save"
                                    disabled = {editCommentMutation.isPending || editText.trim().length < 5 || editText === content}
                                    onClick = {() => {
                                        editCommentMutation.mutate(
                                            { postId, commentId: _id, content: DOMPurify.sanitize(editText) },
                                            { onSuccess: () => setIsEditing(false) } // Close box on success
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <p
                            className="comment_content"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(content)
                            }}
                        />
                    )}

                    {/* Section 2: Comment Footer */}
                    <div className = "comment_footer">

                        {/* Vote_Button component */}
                        <Vote_Button 
                            initialScore = {upvotes.length}
                            isGuest = {isGuest}>
                        </Vote_Button>

                        {/* Reply Button */}
                        <Pill_Button 
                            icon = "✍️" 
                            text = "Reply" 
                            className = {`${isGuest ? 'locked' : ''}`}
                            onClick = {(e) => {
                                e.stopPropagation(); // Prevent navigating to post page if clicking here

                                if (isGuest) 
                                    return
                                
                                setIsReplying(!isReplying);
                            }} 
                        />
                    </div>

                    {isReplying && (

                        <div className = "reply_box">
                            <Rich_Text
                                className="rich_text_editor"
                                key={_id + "_reply"}
                                value={replyText}
                                setValue={setReplyText}
                            />

                            <span style = {{ fontSize: '12px', color: replyText.trim().length > 10000 ? '#ff4d4d' : '#888' }}>
                                    {getTextLength(replyText)}/10000
                            </span>
                                
                            <div className = "reply_box_footer">
                                    
                                <Pill_Button
                                    icon = ""
                                    text = "Cancel"
                                    onClick = {() => {
                                        setIsReplying(false);
                                        setReplyText("");
                                    }}
                                />

                                <Pill_Button 
                                    icon = ""
                                    text = "Comment"
                                    onClick = {handleReply}
                                />

                            </div>

                        </div>
                    )}
            
                </div>
            )}

            {/* Section 3: Comment Section */}
            {showComments && comments?.length > 0 && (
                <div className = "nested_thread_container">
                    {comments.map((commentData) => (
                        <Comment 
                            key = {commentData._id} 
                            postId = {postId}
                            isGuest = {isGuest}
                            {...commentData} 
                        />
                    ))}
                </div>
            )}
            
            {/* The child comments STILL RENDER safely down here! */}
            {showComments && comments?.length > 0}

        </div>
    );
}

export default Comment;