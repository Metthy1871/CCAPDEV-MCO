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
    const { data: post, isLoading: postLoading, isError: postError } = useFetchPostById(id);

    if (postLoading) 
        return <h2 style={{ color: 'white', textAlign: 'center' }}>Loading... ⏳</h2>;

    if (postError) 
        return <h2 style={{ color: 'red', textAlign: 'center' }}>Error! 🚨</h2>;

    return (

        <>
        
            <Nav_bar />

            <div className="post_page_container">

                <div className = "post_page_view">

                    {post && (
                        <Post 
                            {...post}
                            isPreview = {false}
                        />
                    )}
                    

                </div>

                <div className = "right_side_container">

                    <Right_Side_Bar/>

                </div>

            </div>

        </>
    );
}

export default Post_Page;