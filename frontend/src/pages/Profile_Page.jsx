/* This page renders a users profile picture and information. */

import { useState } from 'react';
import { useParams } from 'react-router-dom'

import { useFetchCurrentUser } from '../hooks/useFetchCurrentUser';
import { useFetchPostHistory } from '../hooks/useFetchPostHistory';
import { useFetchUserByName } from '../hooks/useFetchUserByName';

import Nav_Bar from '../components/Nav_Bar';
import Post from '../components/Post';
import Post_Sort from '../components/Post_Sort';
import Edit_Profile from '../components/Edit_Profile';

import './Profile_Page.css';

function Profile_Page() {

    const { username }= useParams();
    const [isEditOpen, setIsEditOpen] = useState(false);

    // Fetch current user data
    const { data: current_user, isLoading: loadingAuth } = useFetchCurrentUser();

    // Fetch viewed user data
    const { data: viewed_user, isLoading: loadingUser, isError: userError } = useFetchUserByName(username);

    // Fetch user post history
    const [sortBy, setSortBy] = useState('recent');
    const { data: user_posts = [], isLoading: loadingPosts } = useFetchPostHistory(viewed_user?._id, sortBy);

    if (loadingAuth || loadingUser || loadingPosts) 
        return <h2 style={{ color: 'white', textAlign: 'center' }}>Loading Profile... ⏳</h2>;

    if (userError || !viewed_user) 
        return <h2 style={{ color: 'red', textAlign: 'center' }}>User not found! 🚨</h2>;

    const isOwner = current_user?.username === viewed_user?.username;

    const formattedDate = new Date(viewed_user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (

        <>
        
            <Nav_Bar/>

            <div className = "profile_page_container">

                <div className = "profile_content">
                
                    <div className = "profile_header">

                        <div className = "profile_info">

                            {/* Section 1: Profile Picture */}
                            <div className = "profile_picture_wrapper">

                                <div className = "profile_picture_mask">

                                    <img
                                        src = {viewed_user.avatar}
                                        alt = "profile"
                                        className = "profile_picture">
                                    </img>

                                </div>
                                
                            </div>

                            {/* Section 2: Profile Information */}
                            <div className = "profile_text_block">

                                <h1 className = "profile_name">
                                    {viewed_user.username}
                                </h1>

                                <span className = "profile_handle">
                                    {viewed_user.displayName}
                                </span>

                                <p className = "profile_bio">
                                    {viewed_user.bio}
                                </p>

                            </div>

                        </div>

                        {isOwner && (
                            
                            <button 
                                className = "edit_profile_button" 
                                onClick = {() => setIsEditOpen(true)}
                            >
                                ⚙ EDIT
                            </button>
                        )}
                        
                    </div>

                    {/* Section 3: Post History */}
                    <div>
                        
                        <h2 className = "section_title">
                            POST HISTORY
                        </h2>

                        <Post_Sort activeTab = {sortBy} setActiveTab = {setSortBy}/>

                        <div className = "profile_history_feed">

                            {user_posts.map(post => (
                                <Post key={post._id} 
                                    {...post} 
                                    isPreview={true} 
                                />
                            ))}

                        </div>

                    </div>

                </div>

                {/* Section 4: Profile Side Bar */}
                <div className = "profile_side_bar_container">

                    <div className = "profile_side_bar">

                        <div className="profile_stats_container">

                            <div className = "info_header">
                                Profile Info
                            </div>
                        
                            {/* Profile statistics */}
                            <div className = "stats_grid">

                                <div className = "stat_item">

                                    <span className = "stat_label">
                                        Posts:
                                    </span>

                                    <span className = "stat_value">
                                        {user_posts.length}
                                    </span>

                                </div>

                                <div className = "stat_item">

                                    <span className = "stat_label">
                                        Karma:
                                    </span>

                                    <span className = "stat_value highlight">
                                        {user_posts.length} {/* TO BE EDITED */}
                                    </span>

                                </div>

                                <div className = "stat_item">

                                    <span className = "stat_label">
                                        Joined on:
                                    </span>

                                    <span className = "stat_value">
                                        {formattedDate}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Edit Profile Modal */}
                
                {isEditOpen && current_user && (

                    <Edit_Profile 
                        isOpen = {isEditOpen} 
                        onClose = {() => setIsEditOpen(false)}
                        current_user = {current_user}
                    />
                )}
                
            </div>

        </>
    );
}

export default Profile_Page;