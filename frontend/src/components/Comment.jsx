/* This component renders a single comment to a post. */

import { useState } from 'react';
import { Link } from 'react-router-dom'

import Vote_Button from './Vote_Button';
import Pill_Button from './Pill_Button';

import { useFetchCurrentUser } from '../hooks/useFetchCurrentUser';
import { useFetchUserByName } from '../hooks/useFetchUserByName';
import { useCreateComment } from '../hooks/useCreateComment';
import { getRelativeTime, getExactTime } from '../utils/timeUtils';

import './Comment.css';

function Comment({ postId, topComments, user, date, content, votes, comments}) {

    const { data: author } = useFetchUserByName(user);
    const { data: current_user } = useFetchCurrentUser();
    const createCommentMutation = useCreateComment();

    const isAuthor = current_user?.username === user;
    const relativeDate = getRelativeTime(date);
    const exactDate = getExactTime(date);

    const [showComments, setShowComments] = useState(true);

    /* Reply */
    const [isReplying, setIsReplying] = useState(false);
    const [allNestedComments, setAllNestedComments] = useState(comments || []);
    const [replyText, setReplyText] = useState("");

    const handleReply = () => { 

        if (!replyText.trim()) 
            return;

        const newReply = {
            user: current_user?.username,
            date: new Date().toISOString().replace('Z', '+08:00'),
            content: replyText,
            votes: 0,
            comments: []
        }
        
        const updatedLocalComments = [...allNestedComments, newReply];
        setAllNestedComments(updatedLocalComments);
        
        const fullTreeClone = JSON.parse(JSON.stringify(topComments));

        const insertReplyIntoTree = (tree) => {

            for (let i = 0; i < tree.length; i++) {

                if (tree[i].user === user && tree[i].content === content) {
                    tree[i].comments.push(newReply);
                    return true;
                }

                if (tree[i].comments && tree[i].comments.length > 0) {
                    if (insertReplyIntoTree(tree[i].comments)) return true;
                }
            }
            return false;
        };

        insertReplyIntoTree(fullTreeClone);

        createCommentMutation.mutate({
            postId: postId,
            updatedComments: fullTreeClone
        })


        setReplyText("");
        setIsReplying(false);
        setShowComments(true);
    }

    return (

        <div className = "comment_container">

            <div className = "comment_block">

                {/* Section 1: Comment Header */}
                <div className = "comment_header">

                    <Link 
                        to = {`/profile/${user}`}
                        onClick = {(e) => e.stopPropagation()}>

                        <img 
                            src = {author?.avatar}
                            className = "post_avatar"
                        />
                    </Link>

                    <div className = "post_info">

                        {/* Comment author */}
                        <span className = "comment_user">
                            @{user} 
                        </span>

                        {/* Comment date */}
                        <span className = "comment_date" title = {exactDate}> 
                            • {relativeDate} 
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

                {/* Comment content */}
                <p className = "comment_content"> 
                    {content} 
                </p>

                {/* Section 2: Comment Footer */}
                <div className = "comment_footer">

                    {/* Vote_Button component */}
                    <Vote_Button 
                        initialScore = {votes}>
                    </Vote_Button>

                    {/* Reply Button */}
                    <Pill_Button 
                        icon = "✍️" 
                        text = "Reply" 
                        onClick = {(e) => {
                            e.stopPropagation(); // Prevent navigating to post page if clicking here
                            setIsReplying(!isReplying);
                        }} 
                    />
                </div>

                {isReplying && (

                        <div className = "reply_box">
                            <textarea
                                placeholder = "What are your thoughts?" 
                                id = "comment-reply"
                                value = {replyText}
                                onChange = {(e) =>{
                                    setReplyText(e.target.value);
                                    e.target.style.height = 'auto';
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                }}
                            />
                            
                            <div class = "reply_box_footer">
                                
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

            {/* Section 3: Comment Section */}
            {showComments && allNestedComments.length > 0 && (
                <div className = "nested_thread_container">
                    {allNestedComments.map((commentData, index) => (
                        <Comment 
                            key = {index} 
                            postId = {postId}
                            topComments = {topComments}
                            {...commentData} 
                        />
                    ))}
                </div>
            )}

        </div>
    );
}

export default Comment;