/* This component contains the post creation menu. */

import { useState } from 'react';
import Pill_Button from './Pill_Button';
import './Create_Post.css';

function Create_Post({ isOpen, onClose, onCreate }) {
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
    /* If not open, don't render */
    if (!isOpen) 
        return null;

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
                        text = "POST" 
                        icon = "🪶"
                        onClick ={() => onCreate(title, content)} 
                        className = "send_button"
                    />

                </div>

            </div>
        </div>
    );
}

export default Create_Post;