import './Post_Page.css';
import { sample_posts } from '../data/sample_posts.js';
import { useParams } from 'react-router-dom';
import Nav_bar from '../components/Nav_Bar.jsx';
import Left_Side_Bar from '../components/Left_Side_Bar.jsx';
import Right_Side_Bar from '../components/Right_Side_Bar.jsx';
import Post from '../components/Post.jsx';

function Post_Page() {

    const { id } = useParams();

    // 2. Find the specific post in your data
    // (Note: URL params are strings, so we convert to Number)
    const post = sample_posts.find(p => p.id === Number(id));

    if (!post) {
        return <div>Post not found!</div>;
    }

    return (

        <>
        
            <Nav_bar />

            <div className="post_page_container">

                <div className = "left_side_container">

                    <Left_Side_Bar/>
                    
                </div>

                <div className = "post_page_view">

                    <Post 
                        id={post.id}
                        title={post.title}
                        author={post.author}
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