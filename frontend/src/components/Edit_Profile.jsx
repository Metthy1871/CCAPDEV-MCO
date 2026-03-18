/* This component contains the edit profile menu. */

import { useState, useEffect } from 'react';

import { useEditProfile } from '../hooks/useEditProfile';

import Pill_Button from './Pill_Button';

import './Create_Post.css';
import './Edit_Profile.css';

function Edit_Profile({ isOpen, onClose, current_user }) {

    const [avatar, setAvatar] = useState(current_user?.avatar);
    const [displayName, setDisplayName] = useState(current_user?.displayName);
    const [bio, setBio] = useState(current_user?.bio);
    
    const editProfileMutation = useEditProfile();
    
    // Reset when modal opens
    useEffect(() => {
        if(isOpen && current_user) {
            setAvatar(current_user.avatar);
            setDisplayName(current_user.displayName || current_user.username);
            setBio(current_user.bio);
        }
    }, [isOpen, current_user]);

    const handleSave = () => {

        editProfileMutation.mutate(
            {displayName, bio, avatar},
            {
                onSuccess: () => {
                    onClose();
                }
            }
        );
    };

    if (!isOpen || !current_user) 
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
                                src = {avatar} 
                                alt = "Current Avatar" 
                                className = "avatar_preview_img" 
                                onError = {(e) => e.target.src = "https://wallpapers.com/images/hd/blank-default-pfp-wue0zko1dfxs9z2c.jpg"} // Fallback if link breaks
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
                                value = {avatar}
                                onChange = {(e) => setAvatar(e.target.value)}
                            />

                        </div>

                    </div>

                    {/* Display Name Edit */}
                    <div className="input_group">

                        <label className = "p5_label">
                            Display Name
                        </label>

                        <input 
                            type = "text" 
                            value = {displayName}
                            onChange = {(e) => setDisplayName(e.target.value)}
                            className = "modal_input" 
                        />
                        
                    </div>

                    {/* Bio Edit */}
                    <div className = "input_group">

                        <label className = "p5_label">
                            Biography
                        </label>

                        <textarea 
                            value = {bio} 
                            onChange = {(e) => setBio(e.target.value)}
                            className = "modal_textarea"
                            rows = "3"
                        ></textarea>

                    </div>

                </div>

                {/* Footer */}

                <div className="modal_footer">

                    <Pill_Button text = "CANCEL" onClick = {onClose} className = "cancel_button" />

                    <Pill_Button 
                        text = "SAVE CHANGES" 
                        onClick = {handleSave} 
                        className = "send_button" 
                        disabled = {editProfileMutation.isPending}
                    />

                </div>

            </div>
        </div>
    );
}

export default Edit_Profile;