/* This component renders a single post. */
import 'quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

import { useState, useMemo, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Pill_Button from './Pill_Button';
import Vote_Button from './Vote_Button';
import Comment from './Comment';
import Rich_Text from './Rich_Text';

import { useFetchCurrentUser } from '../hooks/useFetchCurrentUser';
import { useFetchUserByName } from '../hooks/useFetchUserByName';
import { useCreateComment } from '../hooks/useCreateComment';
import { useFetchComments } from '../hooks/useFetchComments';
import { useDeletePost } from '../hooks/useDeletePost';
import { useEditPost } from '../hooks/useEditPost';
import { usePostVote } from '../hooks/usePostVote';
import { getRelativeTime, getExactTime } from '../utils/timeUtils';

import './Post.css';

function getTextLength(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent.length;
}

function Post({_id, title, author, createdAt, updatedAt, content, upvotes, downvotes, tags = [], isPreview, isGuest}) {
    
    const { data: authorProfile } = useFetchUserByName(author.username);
    const { data: current_user } = useFetchCurrentUser();
    const { data: fetchedComments = [], isLoading} = useFetchComments(_id);

    const createCommentMutation = useCreateComment();
    const deletePostMutation = useDeletePost();
    const editPostMutation = useEditPost();
    const voteMutation = usePostVote();

    const isAuthor = current_user?.username === author.username;
    const relativeDate = getRelativeTime(createdAt);
    const exactDate = getExactTime(createdAt);
    const formattedEditDate = getExactTime(updatedAt);
    const isEdited = createdAt !== updatedAt;

    /* If we are in Preview (Home), hide comments. If Full Page, show them */
    const [showComments, setShowComments] = useState(!isPreview);

     /* Edit */
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(content);

    /* Reply */
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");

    const navigate = useNavigate();
    const [currentContent, setCurrentContent] = useState(content);

    const currentScore = upvotes.length - downvotes.length;
    const hasUpvoted = current_user ? upvotes.includes(current_user._id) : false;
    const hasDownvoted = current_user ? downvotes.includes(current_user._id) : false;

    useEffect(() => {
        setCurrentContent(content);
    }, [content]);

    useEffect(() => {
        if (isEditing) {
            setEditText(currentContent);
        }
    }, [isEditing, currentContent]);

    /* Navigates to the specific post page */
    const handlePostClick = () => {

        if (isPreview) {
            navigate(`/post/${_id}`);
        }
    };

    const handleReply = () => { 

        const html = replyText;
        if (!html || html === "<p><br></p>") return;

        createCommentMutation.mutate({
            postId: _id,
            content: DOMPurify.sanitize(html),
            parentCommentId: null,
        });

        setReplyText("");
        setIsReplying(false);
        setShowComments(true);
    }

    const handleVote = (action, e) => {

        e.stopPropagation();

        if (isGuest || voteMutation.isPending)
            return;

        voteMutation.mutate({ postId: _id, action});
    };

    /* Turn the MongoDB list into a nested tree */
    const commentTree = useMemo(() => {

        const commentsById = {};
        const rootComments = [];

        // Give every single comment an empty 'comments' array
        fetchedComments.forEach(comment => {
            commentsById[comment._id] = { ...comment, comments: [] };
        });

        fetchedComments.forEach(comment => {
            if (comment.parentComment) {

                // If it's a reply, push it inside its parent's array
                if (commentsById[comment.parentComment]) {
                    commentsById[comment.parentComment].comments.push(commentsById[comment._id]);
                }
                
            } else {
                // If it has no parent, it goes on the main post
                rootComments.push(commentsById[comment._id]);
            }
        });

        return rootComments;
    }, [fetchedComments]);

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

                            {isEdited && <span style={{ fontStyle: 'italic', marginLeft: '4px', opacity: 0.7 }}>(edited: {formattedEditDate})</span>}
                        </span>

                    </div>

                    <span className = "modify_post_container">

                        {/* Edit Button */}
                        {isAuthor && (
                            <button 
                                className = "edit_button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditing(!isEditing);
                                }}
                            >
                                ✎
                            </button>
                        )}

                        {/* Delete Button */}
                        {isAuthor && (
                            <button 
                                className = "delete_button"
                                disabled = {deletePostMutation.isPending}
                                onClick={(e) => {
                                    e.stopPropagation();

                                    if (window.confirm("Are you sure you want to delete this post?")) {
                                        deletePostMutation.mutate(_id);
                                    }
                                    
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
                {isEditing ? (

                        <div className = "reply_box" onClick={(e) => e.stopPropagation()}>
                            <div
                                style={{
                                    minHeight: '100px',
                                    display: 'block'
                                }}
                            >
                                <Rich_Text
                                    className="rich_text_editor"
                                    key={_id + "_post_edit"}
                                    value={editText}
                                    setValue={setEditText}
                                />
                            </div>

                            <span style={{ fontSize: '12px', color: editText.length > 50000 ? '#ff4d4d' : '#888' }}>
                                {getTextLength(editText)}/50000
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
                                    disabled = {editPostMutation.isPending || editText.trim().length < 5 || editText === currentContent}
                                    onClick = {() => {
                                        editPostMutation.mutate(
                                            { postId: _id, content: DOMPurify.sanitize(editText) },
                                            { onSuccess: () => {
                                                setCurrentContent(DOMPurify.sanitize(editText));
                                                setIsEditing(false);                             // close editor
                                            } } // Close box on success
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                            className="post_content"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentContent) }}
                        />
                )}
               
                {/* Section 2: Post Footer */}
                <div className = "post_footer">

                    <div onClick = {(e) => e.stopPropagation()}>

                        {/* Vote_Button component */}
                        <Vote_Button 
                            score = {currentScore}
                            hasUpvoted = {hasUpvoted}
                            hasDownvoted = {hasDownvoted}
                            onVote = {handleVote}
                            isGuest = {isGuest}>
                        </Vote_Button>

                    </div>

                    {/* Reply Button */}
                    <Pill_Button 
                        icon = "✍️" 
                        text = "Reply" 
                        className = {`${isGuest ? 'locked' : ''}`}
                        onClick = {(e) => {
                            e.stopPropagation(); // Prevent navigating to post page if clicking here
                            
                            if (isGuest)
                                return 

                            if (isPreview)
                                navigate(`/post/${_id}`)
                            
                            else
                                setIsReplying(!isReplying);
                        }} 
                    />
                    
                </div>
                
                {isReplying && (

                        <div className = "reply_box" onClick = {(e) => e.stopPropagation()}>
                            <Rich_Text
                                className="rich_text_editor"
                                key={_id + "_reply"}
                                value={replyText}
                                setValue={setReplyText}
                            />

                            <span style={{ fontSize: '12px', color: replyText.trim().length > 50000 ? '#ff4d4d' : '#888' }}>
                                    {getTextLength(replyText)}/50000
                            </span>
                            
                            <div className = "reply_box_footer">
                                
                                <Pill_Button
                                    icon = ""
                                    text = "Cancel"
                                    onClick = {() => {
                                        setIsReplying(false);
                                        setReplyText("");
                                    } }
                                />

                                <Pill_Button 
                                    icon = ""
                                    text = "Comment"
                                    disabled = {createCommentMutation.isPending}
                                    onClick = {handleReply}
                                />

                            </div>

                        </div>
                    )}

            </div>
            
            {/* Section 3: Comment Section */}
            {showComments && (

                    <div className="comment_section_container">

                        {isLoading && <p>Loading comments...</p>}

                        {commentTree.map((commentData) => (
                            <Comment 
                                key = {commentData._id} 
                                postId = {_id}
                                isGuest = {isGuest}
                                {...commentData}
                            />
                        ))}
                    </div>
            )}

        </div>
    );
}

export default Post;