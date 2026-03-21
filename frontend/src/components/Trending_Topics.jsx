/* This component renders the trending topics. */

import { useFetchPopularTopics } from '../hooks/useFetchPopularTopics';

import './Trending_Topics.css';

function Trending_Topics() {

    const { data: popularTopics, isLoading } = useFetchPopularTopics();

    if (isLoading) 
        return <div>Loading popular topics...</div>;

    return (

        <div className = "trend_container">

                <h3 className = "trend_header">
                    Popular Topics
                </h3>

                <ul className = "trend_list">

                    {/* Map the list of trending topics */}
                    {popularTopics?.map(tag => (

                        <li key = {tag.name} className = "topic">
                            <span className = "keyword">#{tag.name}</span>
                            <span className = "topic_count">{tag.count} posts</span>
                        </li>
                        
                    ))}

                </ul>
        </div>

    );
}

export default Trending_Topics;