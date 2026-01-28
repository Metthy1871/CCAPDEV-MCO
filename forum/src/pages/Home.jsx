import './Home.css';
import { sample_posts } from '../data/sample_posts.js';
import Left_Side_Bar from '../components/Left_Side_Bar.jsx';
import Nav_Bar from '../components/Nav_Bar.jsx';
import Right_Side_Bar from '../components/Right_Side_Bar.jsx'
import Post from '../components/Post.jsx';
import Feed_Filter from '../components/Feed_Filter.jsx';


function Home() {

    return (
    
        <>

            <title>The Phantom Aficionado Forum</title>
        
            {/* Place Nav_Bar component on top */}
            <Nav_Bar/>
            
            <div className = "home_container">

                <div className = "left_side_container">

                    <Left_Side_Bar/>
                    
                </div>

                <div className = "feed_container">

                    <Feed_Filter/>

                    {sample_posts.map((post) => (
                        <Post 
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            author={post.author}
                            date={post.date}
                            content={post.content}
                            votes={post.votes}
                            isPreview={true}
                            comments={post.comments}
                        />
                    ))}
                
                </div>

                <div className = "right_side_container">

                    <Right_Side_Bar/>

                </div>

            </div>
        
        </>
    );
}

export default Home;
