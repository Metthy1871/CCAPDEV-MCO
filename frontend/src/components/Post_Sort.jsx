/* This component allows the user to sort posts on the feed. */

import './Post_Sort.css';

function Post_Sort( {activeTab, setActiveTab} ) {

    return (

        <div className = "post_sort_container">

            {/* Sort by recency */}
            <button 
                className = {`sort_button ${activeTab === 'recent' ? 'active' : ''}`}
                onClick = {() => setActiveTab('recent')}
            >
                ✨ RECENT
            </button>

            {/* Sort by popularity all time */}
            <button 
                className = {`sort_button ${activeTab === 'popular_all_time' ? 'active' : ''}`}
                onClick = {() => setActiveTab('popular_all_time')}
            >
                🔥 POPULAR (all time)
            </button>

            {/* Sort by recent popularity */}
            <button 
                className = {`sort_button ${activeTab === 'popular_recent' ? 'active' : ''}`}
                onClick = {() => setActiveTab('popular_recent')}
            >
                🔥 POPULAR (recent)
            </button>

        </div>
    );
}

export default Post_Sort;