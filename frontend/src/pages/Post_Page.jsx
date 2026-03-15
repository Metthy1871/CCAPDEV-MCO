/* Renders a page dedicated to a single post and its comments. */

import { useParams } from 'react-router-dom';

import { useFetchPostById } from '../hooks/useFetchPostById.js';
import Nav_bar from '../components/Nav_Bar.jsx';
import Right_Side_Bar from '../components/Right_Side_Bar.jsx';
import Post from '../components/Post.jsx';

import './Post_Page.css';

function Post_Page() {

    const { id } = useParams();

    // Find the specific post
    const { data: post, isLoading, isError } = useFetchPostById(id);

    if (isLoading) 
        return <h2 style={{ color: 'white', textAlign: 'center' }}>Loading Post... ⏳</h2>;

    if (isError) 
        return <h2 style={{ color: 'red', textAlign: 'center' }}>Post not found! 🚨</h2>;

    return (

        <>
        
            <Nav_bar />

            <div className="post_page_container">

                <div className = "post_page_view">

                    <Post 
                        id = {post.id}
                        title = {post.title}
                        user = {post.user}
                        date = {post.date}
                        content = {post.content}
                        votes = {post.votes}
                        tags = {post.tags}
                        isPreview = {false}
                        comments = {post.comments}
                    />

                </div>

                <div className = "right_side_container">

                    <Right_Side_Bar/>

                </div>

            </div>

        </>
    );
}

export default Post_Page;