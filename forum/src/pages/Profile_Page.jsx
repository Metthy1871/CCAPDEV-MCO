/* This page renders a users profile picture and information. */

import './Profile_Page.css';
import Nav_Bar from '../components/Nav_Bar';
import Post from '../components/Post';
import { users, current_user } from '../data/users';
import { sample_posts } from '../data/sample_posts';

function Profile_Page() {

    const userPosts = sample_posts.slice(0, 2);

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

                </div>

                {/* Section 3: Post History */}
                <div>
                    
                    <h2 className = "section_title">
                        POST HISTORY
                    </h2>

                    <div className = "profile_history_feed">

                        {userPosts.map(post => (
                            <Post key={post.id} {...post} isPreview={true} />
                        ))}

                    </div>

                </div>

             </div>

        </div>
    );
}

export default Profile_Page;