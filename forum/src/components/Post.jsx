import './Post.css';
import Pill_Button from './Pill_Button';
import Vote_Button from './Vote_Button';

function Post({title, author, date, content, votes}) {
    
    return (
        
        <div className = "post">
            
            <div className = 'post_header'>

                <span className = "post_author">@{author}</span>
                <span className = "post_date">• {date}</span>

            </div>

            <h2 className = "post_title">
                {title}
            </h2>

            <p className = "post_content">
                {content}
            </p>

            <div className = "post_footer">

                <Vote_Button 
                    initialScore = {votes}>
                </Vote_Button>

                <Pill_Button 
                    className = "comment_button"
                    icon = "💬"
                    text = "Comment">
                </Pill_Button>
                
            </div>

        </div>
    );
}

export default Post;