/* This page renders a users profile picture and information. */

import './Profile_Page.css';
import Nav_Bar from '../components/Nav_Bar';
import Post from '../components/Post';
import { user_controller } from '../controllers/user_controller';
import { post_controller } from '../controllers/post_controller';
import { useState } from 'react';
import Feed_Filter from '../components/Feed_Filter';
import Edit_Profile from '../components/Edit_Profile';

function Profile_Page() {

    const current_user = user_controller.getCurrentUser();
    const user_posts = post_controller.getPostsByUser(current_user.username);
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (

        <div className = "profile_page_container">

            <Nav_Bar/>

            <div className = "profile_content">
            
                <div className = "profile_header">

                    <div className = "profile_info">

                        {/* Section 1: Profile Picture */}
                        <div className = "profile_picture_wrapper">

                            <div className = "profile_picture_mask">

                                <img
                                    src = {current_user.avatar}
                                    alt = "profile"
                                    className = "profile_picture">
                                </img>

                            </div>
                            
                        </div>

                        {/* Section 2: Profile Information */}
                        <div className = "profile_text_block">

                            <h1 className = "profile_name">
                                {current_user.username}
                            </h1>

                            <span className = "profile_handle">
                                {current_user.handle}
                            </span>

                            <p className = "profile_bio">
                                {current_user.bio}
                            </p>

                        </div>

                    </div>

                    <button 
                        className="edit_profile_button" 
                        onClick={() => setIsEditOpen(true)}
                    >
                        ⚙ EDIT
                    </button>

                </div>

                {/* Section 3: Post History */}
                <div>
                    
                    <h2 className = "section_title">
                        POST HISTORY
                    </h2>

                    <Feed_Filter/>

                    <div className = "profile_history_feed">

                        {user_posts.map(post => (
                            <Post key={post.id} 
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

                        <div className="info_header">
                            Profile Info
                        </div>
                    
                        {/* Profile statistics */}
                        <div className="stats_grid">

                            <div className="stat_item">

                                <span className="stat_label">
                                    Posts:
                                </span>

                                <span className="stat_value">
                                    {current_user.stats.posts}
                                </span>

                            </div>

                            <div className="stat_item">

                                <span className="stat_label">
                                    Karma:
                                </span>

                                <span className="stat_value highlight">
                                    {current_user.stats.karma}
                                </span>

                            </div>

                            <div className="stat_item">

                                <span className="stat_label">
                                    Joined on:
                                </span>

                                <span className="stat_value">
                                    {current_user.joinDate}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Edit_Profile 
                isOpen = {isEditOpen} 
                onClose = {() => setIsEditOpen(false)}
                current_user = {current_user}
            />

        </div>
    );
}

export default Profile_Page;