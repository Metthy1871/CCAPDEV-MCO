/* This is the home page of the application. */

import { useState } from 'react';
import Left_Side_Bar from '../components/Left_Side_Bar.jsx';
import Nav_Bar from '../components/Nav_Bar.jsx';
import Right_Side_Bar from '../components/Right_Side_Bar.jsx'
import Post from '../components/Post.jsx';
import Feed_Filter from '../components/Feed_Filter.jsx';
import Create_Post from '../components/Create_Post.jsx';
import { user_controller } from '../controllers/user_controller.js';
import { sample_posts } from '../data/sample_posts.js';
import './Home.css';

function Home() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState(sample_posts);
    const current_user = user_controller.getCurrentUser();

    const handleCreatePost = (title, content) =>{ 

        if (!title.trim() || !content.trim()) return;

        const newPost = {
            id: Date.now(),
            title: title,
            user: current_user.username,
            date: "Just now",
            content: content,
            votes: 0,
            comments: []
        };

        setPosts([newPost, ...posts]); 
        
        setIsModalOpen(false);
    }

    return (
    
        <>
            {/* Set title of the page */}
            <title>
                The Phantom Forum
            </title>
        
            {/* Place Nav_Bar component on top */}
            <Nav_Bar/>
            
            <div className = "home_container">

                <div className = "left_side_container">

                    {/* Place Left_Side_Bar component on the left */}
                    <Left_Side_Bar onOpenModal={() => setIsModalOpen(true)}/>
                    
                </div>

                <div className = "feed_container">

                    {/* Place Feed_Filter component on the center */}
                    <Feed_Filter/>

                    {/* Place all posts below the Feed_Filter */}
                    {posts.map((post) => (
                        <Post 
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            user={post.user}
                            date={post.date}
                            content={post.content}
                            votes={post.votes}
                            isPreview={true}
                            comments={post.comments}
                        />
                    ))}
                
                </div>

                <div className = "right_side_container">

                    {/* Place Right_Side_Bar component on the right */}
                    <Right_Side_Bar/>

                </div>

            </div>

            {/* Create Post Modal */}
            <Create_Post 
                isOpen = {isModalOpen} 
                onClose = {() => setIsModalOpen(false)}
                onCreate = {handleCreatePost}
            />
        
        </>
    );
}

export default Home;
