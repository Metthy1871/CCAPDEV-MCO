/* Renders a page dedicated to a single post and its comments. */

import Nav_bar from '../components/Nav_Bar.jsx';
import Right_Side_Bar from '../components/Right_Side_Bar.jsx';
import Post from '../components/Post.jsx';
import { sample_posts } from '../data/sample_posts.js';
import { useParams } from 'react-router-dom';
import './Post_Page.css';

function Post_Page() {

    const { id } = useParams();

    /* Find the specific post in your data */
    const post = sample_posts.find(p => p.id === Number(id));

    if (!post) {
        return <div>Post not found!</div>;
    }

    return (

        <>
        
            <Nav_bar />

            <div className="post_page_container">

                <div className = "post_page_view">

                    <Post 
                        id={post.id}
                        title={post.title}
                        user={post.user}
                        date={post.date}
                        content={post.content}
                        votes={post.votes}
                        isPreview={false}
                        comments={post.comments}
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