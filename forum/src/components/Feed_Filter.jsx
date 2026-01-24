import React, { useState } from 'react';
import './Feed_Filter.css';

function Feed_Filter() {

    const [activeTab, setActiveTab] = useState('all');

    return (

        <div className="feed_filter_container">

            <button 
                className={`filter_button ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
            >
                ALL 
            </button>

            <button 
                className={`filter_button ${activeTab === 'discussion' ? 'active' : ''}`}
                onClick={() => setActiveTab('discussion')}
            >
                🔥 POPULAR 
            </button>

            <button 
                className={`filter_button ${activeTab === 'requests' ? 'active' : ''}`}
                onClick={() => setActiveTab('requests')}
            >
                ✨ RECENT
            </button>

        </div>
    );
}

export default Feed_Filter;