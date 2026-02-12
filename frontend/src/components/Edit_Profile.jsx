/* This component contains the edit profile menu. */

import { useState, useEffect } from 'react';
import Pill_Button from './Pill_Button';
import './Create_Post.css';
import './Edit_Profile.css';

function Edit_Profile({ isOpen, onClose, current_user }) {

    const [previewAvatar, setPreviewAvatar] = useState(current_user.avatar);

    // Reset when modal opens
    useEffect(() => {
        if(isOpen) setPreviewAvatar(current_user.avatar);
    }, [isOpen, current_user]);

    if (!isOpen) 
        return null;

    return (

        <div className = "modal_overlay" onClick = {onClose}>

            <div className =" modal_card profile_edit_card" onClick = {(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className="modal_header">

                    <h2 className = "modal_title">
                        Edit Profile
                    </h2>

                    <button className = "close_icon" onClick = {onClose}>
                        ✕
                    </button>

                </div>

                {/* Body */}
                <div className="modal_body">
                    
                    <div className = "modal_avatar">

                        <div className="avatar_preview_wrapper">

                            <img 
                                src = {previewAvatar} 
                                alt = "Current Avatar" 
                                className = "avatar_preview_img" 
                                onError = {(e) => e.target.src = "https://via.https://wallpapers.com/images/hd/blank-default-pfp-wue0zko1dfxs9z2c.jpg.com/150"} // Fallback if link breaks
                            />
                            
                        </div>

                        {/* 2. The Input Field */}
                        <div className = "input_group">

                            <label className = "p5_label">
                                Edit Avatar
                            </label>

                            <input 
                                type = "text" 
                                className = "modal_input" 
                                placeholder = "Paste new image link..."
                                value = {previewAvatar}
                                onChange = {(e) => setPreviewAvatar(e.target.value)}
                            />

                        </div>

                    </div>

                    {/* Name Edit */}
                    <div className = "input_group">

                        <label className = "p5_label">
                            Username
                        </label>

                        <input 
                            type = "text" 
                            defaultValue = {current_user.username} 
                            className = "modal_input" 
                        />
                    </div>

                    {/* Handle Edit */}
                    <div className="input_group">

                        <label className = "p5_label">
                            Handle
                        </label>

                        <input 
                            type = "text" 
                            defaultValue = {current_user.handle} 
                            className = "modal_input" 
                        />
                        
                    </div>

                    {/* Bio Edit */}
                    <div className = "input_group">

                        <label className = "p5_label">
                            Biography
                        </label>

                        <textarea 
                            defaultValue = {current_user.bio} 
                            className = "modal_textarea"
                            rows = "3"
                        ></textarea>

                    </div>

                </div>

                {/* Footer */}

                <div className="modal_footer">

                    <Pill_Button text = "CANCEL" onClick = {onClose} className = "cancel_button" />
                    <Pill_Button text = "SAVE CHANGES" onClick = {onClose} className = "send_button" />

                </div>

            </div>
        </div>
    );
}

export default Edit_Profile;