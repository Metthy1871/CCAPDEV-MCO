/* This component allows the user to filter posts on the feed. */

import './Feed_Filter.css';

function Feed_Filter( {activeTab, setActiveTab} ) {

    return (

        <div className="feed_filter_container">

            {/* Sort by recency */}
            <button 
                className={`filter_button ${activeTab === 'recent' ? 'active' : ''}`}
                onClick={() => setActiveTab('recent')}
            >
                ✨ RECENT
            </button>

            {/* Sort by popularity all time */}
            <button 
                className={`filter_button ${activeTab === 'popular_all_time' ? 'active' : ''}`}
                onClick={() => setActiveTab('popular_all_time')}
            >
                🔥 POPULAR (all time)
            </button>

            {/* Sort by recent popularity */}
            <button 
                className={`filter_button ${activeTab === 'popular_recent' ? 'active' : ''}`}
                onClick={() => setActiveTab('popular_recent')}
            >
                🔥 POPULAR (recent)
            </button>

        </div>
    );
}

export default Feed_Filter;