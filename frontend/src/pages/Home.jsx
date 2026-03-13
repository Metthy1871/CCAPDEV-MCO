/* This is the home page of the application. */

import { useState } from 'react';

import { useFetchPosts } from '../hooks/useFetchPosts.js';

import Left_Side_Bar from '../components/Left_Side_Bar.jsx';
import Nav_Bar from '../components/Nav_Bar.jsx';
import Right_Side_Bar from '../components/Right_Side_Bar.jsx'
import Post from '../components/Post.jsx';
import Feed_Filter from '../components/Feed_Filter.jsx';
import Create_Post from '../components/Create_Post.jsx';

import './Home.css';

function Home() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: posts, isLoading, isError } = useFetchPosts();
    
    const handleCreatePost = (title, content) => { 

        if (!title.trim() || !content.trim()) 
            return;

        alert("WIP!");
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

                    {/* Handle the waiting period */}
                    {isLoading && (
                        <h2 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
                            Loading Content... ⏳
                        </h2>
                    )}

                    {isError && (
                        <h2 style={{ color: 'var(--p5-red)', textAlign: 'center', marginTop: '20px' }}>
                            Connection Failed. 🚨
                        </h2>
                    )}

                    {/* Render posts */}
                    {!isLoading && !isError && posts?.map((post) => (
                        <Post 
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            user={post.user}
                            date={post.date}
                            content={post.content}
                            votes={post.votes}
                            tags={post.tags}
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
