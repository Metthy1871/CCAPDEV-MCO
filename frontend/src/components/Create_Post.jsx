/* This component renders the post creation menu. */

import { useQuill } from 'react-quilljs';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

import { useState } from 'react';

import { useCreatePost } from '../hooks/useCreatePost';

import Pill_Button from './Pill_Button';

import './Create_Post.css';

function Create_Post({ isOpen, onClose }) {
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");
    const createPostMutation = useCreatePost();

    
    const { quill: postQuill, quillRef: postRef } = useQuill({
        theme: 'snow',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }],
                ['link']
            ]
        }
    }, Quill.default ? Quill.default : Quill);
    
    const handleCreateTag = (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();
    
            const newTag = tagInput.trim();
            
            if (newTag && !tags.includes(newTag) && tags.length < 5) {
                setTags([...tags, newTag]);
                setTagInput(""); 
            }

            if (e.key === 'Backspace' && tagInput === "" && tags.length > 0) {
                setTags(tags.slice(0, -1));
            }
        }
    }

    const removeTag = (tagToRemove) => {

        setTags(tags.filter(tag => tag !== tagToRemove));
    }

    const handlePostSubmit = () => {

        if (!title.trim() || !postQuill) return;

        const html = postQuill.root.innerHTML;

        if (!html || html === "<p><br></p>") return;

        const newPost = {
            title: title,
            content: DOMPurify.sanitize(html),
            tags: tags.length > 0 ? tags : ["Discussion"]
        };

        createPostMutation.mutate(newPost, {
            onSuccess: () => {
                setTitle("");
                postQuill.root.innerHTML = ""; 
                onClose(); 
            }
        });
    }

    return (

        <div
            className={`modal_overlay ${isOpen ? 'open' : 'closed'}`}
            onClick={onClose}
        >
            
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
                        
                        <div className="post_tags">
                            {tags?.map((tag, index) => (
                                <span 
                                    key={index} 
                                    className="tag_pill"
                                    title="Click to remove"
                                    style={{ cursor: 'pointer' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeTag(tag);
                                    }}
                                >
                                    #{tag} ✕
                                </span>
                            ))}

                        </div>

                        <input 
                            type = "text" 
                            placeholder = {tags.length < 5 ? "Add tags (press Enter)..." : "Tag limit reached"}
                            value = {tagInput}
                            className = "modal_input" 
                            onChange = {(e) => setTagInput(e.target.value)}
                            onKeyDown = {handleCreateTag}
                            disabled = {tags.length >= 5}
                        />

                    </div>

                    <div className = "input_group">
                   
                        <div ref={postRef} />

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