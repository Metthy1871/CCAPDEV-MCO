import './Trending_Topics.css';
import { trending_topics } from '../data/trending_topics';

function Trending_Topics() {

    return (

        <div className = "trend_container">

                <h3 className = "trend_header">
                    Popular Topics
                </h3>

                <div className = "trend_cloud">

                    {trending_topics.map((word) => (

                        <span
                            key = {word.id}
                            className = "keyword"
                        >
                            {word.text}
                        </span>

                    ))}

                </div>
        </div>

    );
}

export default Trending_Topics;