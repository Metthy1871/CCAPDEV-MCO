import './Post.css';

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

                <div className = "post_pill">
                    <span className = "post_vote_arrow">▲</span>
                    <span className = "post_vote_count">{votes}</span>
                    <span className = "post_vote_arrow">▼</span>
                </div>

                <button className = "post_pill">Comment</button>
            </div>

        </div>
    );
}

export default Post;