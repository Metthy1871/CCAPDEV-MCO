/* This component displays the forum information and rules. */

import { useState } from 'react';

import { useFetchTotalMembers } from '../hooks/useFetchTotalMembers.js';
import { forum_rules } from '../data/forum_rules.js';

import './Right_Side_Bar.css';

function Right_Side_Bar() {

    const {data: totalMembers, isLoading } = useFetchTotalMembers();
    
    const [activeRule, setActiveRule] = useState(null);

    const toggleRule = (id) => {
        setActiveRule(activeRule === id ? null : id);
    };

    return (

        <nav className = "right_side_bar">

            {/* Section 1: Forum Information */}
            <div className="forum_info_container">

                <div className="info_header">
                    Forum Info
                </div>
                
                {/* Forum statistics */}
                <div className="stats_grid">

                    <div className="stat_item">

                        <span className="stat_label">
                            Members:
                        </span>

                        <span className="stat_value">
                            {isLoading ? "..." : totalMembers?.totalMembers || totalMembers || 0}
                        </span>

                    </div>

                    <div className="stat_item">

                        <span className="stat_label">
                            Formed on:
                        </span>

                        <span className="stat_value">
                            April 4, 2016
                        </span>

                    </div>

                </div>

                {/* Forum description */}
                <div className="forum_description">
                    <p>
                        An online forum to discuss Phantom Thief activity.
                    </p>
                </div>

            </div>

            {/* Section 2: Forum Rules */}
            <div className = "rules_container">

                <h4 className = "rules_header"> 
                    Forum Rules 
                </h4>

                {/* Map the rules list */}
                <ul className = "rules_list">

                    {forum_rules.map((rule) => (

                        <li 
                            key = {rule.id}
                            onClick = {() => toggleRule(rule.id)}
                            style = {{ cursor: 'pointer', marginBottom: '10px' }}
                        >
                            <div style = {{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                <span>{rule.id}. {rule.title}</span>
                                <span>{activeRule === rule.id ? '▼' : '▶'}</span>
                            </div>
                            
                            {activeRule === rule.id && rule.description && (
                                <div style = {{ fontSize: '0.85rem', color: 'var(--text-secondary, #ccc)', marginTop: '5px', paddingLeft: '15px' }}>
                                    {rule.description}
                                </div>
                            )}

                        </li>

                    ))}

                </ul>

            </div>
            
        </nav>
    )
}

export default Right_Side_Bar;