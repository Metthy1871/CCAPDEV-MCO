/* This component contains the post creation menu. */

import { useState } from 'react';

import { useCreatePost } from '../hooks/useCreatePost';
import { useFetchCurrentUser } from '../hooks/useFetchCurrentUser';
import Pill_Button from './Pill_Button';

import './Create_Post.css';

function Create_Post({ isOpen, onClose }) {
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const { data: current_user } = useFetchCurrentUser();
    const createPostMutation = useCreatePost();

    /* If not open, don't render */
    if (!isOpen) 
        return null;
    
    const handlePostSubmit = () => {

        if (!title.trim() || !content.trim()) 
            return;

        const newPost = {
            title: title,
            user: current_user?.username,
            date: new Date().toISOString().replace('Z', '+08:00'),
            content: content,
            votes: 0,
            tags: ["Discussion"],
            comments: []
        };

        createPostMutation.mutate(newPost, {
            onSuccess: () => {
                setTitle("");
                setContent("");
                onClose(); 
            }
        });
    }

    return (

        <div className = "modal_overlay" onClick = {onClose}>
            
            <div className = "modal_card" onClick={(e) => e.stopPropagation()}>
                
                {/* Section 1: Modal Header */}
                <div className = "modal_header">

                    <h2 className = "modal_title">
                        Create Post
                    </h2>

                    <button 
                        className = "close_icon" 
                        onClick={onClose}>
                            ✕
                    </button>

                </div>

                {/* Section 2: Modal Body */}
                <div className = "modal_body">
                    
                    <div className = "input_group">

                        <input 
                            type = "text" 
                            placeholder = "Title..." 
                            value = {title}
                            className = "modal_input" 
                            onChange={(e) => setTitle(e.target.value)}
                        />

                    </div>

                    <div className = "input_group">
                   
                        <textarea 
                            placeholder = "Content..." 
                            className = "modal_textarea"
                            value = {content}
                            rows = "5"
                            onChange={(e) => setContent(e.target.value)}
                        />

                    </div>

                </div>

                {/* Section 3: Modal Footer */}
                <div className = "modal_footer">

                    <Pill_Button 
                        text = "CANCEL" 
                        onClick = {onClose} 
                        className = "cancel_button"
                    />

                    <Pill_Button 
                        text = {createPostMutation.isPending ? "Posting..." : "Post"}
                        icon = {createPostMutation.isPending ? "⏳" : "🪶"}
                        onClick = {handlePostSubmit}
                        className = "send_button"
                        disabled = {createPostMutation.isPending}
                    />

                </div>

            </div>
        </div>
    );
}

export default Create_Post;