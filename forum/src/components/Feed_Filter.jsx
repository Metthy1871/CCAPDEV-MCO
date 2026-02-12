/* This component allows the user to filter posts on the feed. */

import { useState } from 'react';
import './Feed_Filter.css';

function Feed_Filter() {

    const [activeTab, setActiveTab] = useState('all');

    return (

        <div className="feed_filter_container">

            {/* No sorting */}
            <button 
                className={`filter_button ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
            >
                ALL 
            </button>

            {/* Sort by popularity */}
            <button 
                className={`filter_button ${activeTab === 'discussion' ? 'active' : ''}`}
                onClick={() => setActiveTab('discussion')}
            >
                🔥 POPULAR 
            </button>

            {/* Sort by recency */}
            <button 
                className={`filter_button ${activeTab === 'recent' ? 'active' : ''}`}
                onClick={() => setActiveTab('recent')}
            >
                ✨ RECENT
            </button>

        </div>
    );
}

export default Feed_Filter;