/* This is the home page of the application. */

import './Home.css';
import { sample_posts } from '../data/sample_posts.js';
import { useState, useEffect } from 'react';
import Left_Side_Bar from '../components/Left_Side_Bar.jsx';
import Nav_Bar from '../components/Nav_Bar.jsx';
import Right_Side_Bar from '../components/Right_Side_Bar.jsx'
import Post from '../components/Post.jsx';
import Feed_Filter from '../components/Feed_Filter.jsx';
import Create_Post from '../components/Create_Post.jsx';

function Home() {

    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    {sample_posts.map((post) => (
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

            <Create_Post 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        
        </>
    );
}

export default Home;
