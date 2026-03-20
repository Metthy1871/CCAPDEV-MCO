/* This is the search page of the application. */

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetchCurrentUser } from '../hooks/useFetchCurrentUser.js';
import { useFetchPosts } from '../hooks/useFetchPosts.js';

import Left_Side_Bar from '../components/Left_Side_Bar.jsx';
import Nav_Bar from '../components/Nav_Bar.jsx';
import Right_Side_Bar from '../components/Right_Side_Bar.jsx'
import Post from '../components/Post.jsx';
import Post_Sort from '../components/Post_Sort.jsx';
import Create_Post from '../components/Create_Post.jsx';

import './Search.css';

function Search() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: current_user } = useFetchCurrentUser();
    const [sortBy, setSortBy] = useState('recent');
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const { data: posts, isLoading, isError } = useFetchPosts(sortBy, query);
    const isGuest = !current_user;
    

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
                    <Left_Side_Bar 
                        onOpenModal = {() => setIsModalOpen(true)}
                        isGuest = {isGuest}
                    />
                    
                </div>

                <div className = "feed_container">

                    {/* Place Post_Sort component on the center */}
                    <Post_Sort activeTab = {sortBy} setActiveTab = {setSortBy}/>

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

                    <h2 className = "results_for">
                        Results for: {query}
                    </h2>

                    {!isLoading && posts?.length === 0 && (
                        <h2>
                            No results found 😢
                        </h2>
                    )}

                    {/* Render posts */}
                    {!isLoading && !isError && posts?.map((post) => (
                        <Post 
                            key = {post._id}
                            {...post}
                            isPreview = {true}
                            isGuest = {isGuest}
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
            />
        
        </>
    );
}

export default Search;
