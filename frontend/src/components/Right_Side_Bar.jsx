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

    const [activeAbout, setActiveAbout] = useState(null);

    const toggleAbout = (id) => {
        setActiveAbout(activeAbout === id ? null : id);
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

            {/* Section 3: About */}
            <div className="about_container">

                <h4 className="about_header"> 
                    About the App
                </h4>

                <ul className="about_list">

                    <li onClick={() => toggleAbout(1)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                            <span>Frontend Packages</span>
                            <span>{activeAbout === 1 ? '▼' : '▶'}</span>
                        </div>

                        {activeAbout === 1 && (
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #ccc)', marginTop: '5px', paddingLeft: '15px' }}>
                                <div>@tanstack/react-query</div>
                                <div>axios</div>
                                <div>dompurify</div>
                                <div>quill</div>
                                <div>react</div>
                                <div>react-dom</div>
                                <div>react-quill-new</div>
                                <div>react-quilljs</div>
                                <div>react-router-dom</div>
                            </div>
                        )}
                    </li>

                    <li onClick={() => toggleAbout(2)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                            <span>Backend Packages</span>
                            <span>{activeAbout === 2 ? '▼' : '▶'}</span>
                        </div>

                        {activeAbout === 2 && (
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #ccc)', marginTop: '5px', paddingLeft: '15px' }}>
                                <div>bcrypt</div>
                                <div>cookie-parser</div>
                                <div>cors</div>
                                <div>dompurify</div>
                                <div>dotenv</div>
                                <div>express</div>
                                <div>express-mongo-sanitize</div>
                                <div>express-rate-limit</div>
                                <div>helmet</div>
                                <div>jsdom</div>
                                <div>jsonwebtoken</div>
                                <div>mongodb</div>
                                <div>mongoose</div>
                                <div>morgan</div>
                            </div>
                        )}
                    </li>

                    <li onClick={() => toggleAbout(3)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                            <span>Development Dependencies</span>
                            <span>{activeAbout === 3 ? '▼' : '▶'}</span>
                        </div>

                        {activeAbout === 3 && (
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #ccc)', marginTop: '5px', paddingLeft: '15px' }}>
                                <div>@eslint/js</div>
                                <div>@types/react</div>
                                <div>@types/react-dom</div>
                                <div>@vitejs/plugin-react</div>
                                <div>eslint</div>
                                <div>eslint-plugin-react-hooks</div>
                                <div>eslint-plugin-react-refresh</div>
                                <div>globals</div>
                                <div>json-server</div>
                                <div>vite</div>
                                <div>nodemon</div>
                                <div>concurrently</div>
                            </div>
                        )}
                    </li>

                    <li onClick={() => toggleAbout(4)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                            <span>The Developers</span>
                            <span>{activeAbout === 4 ? '▼' : '▶'}</span>
                        </div>

                        {activeAbout === 4 && (
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #ccc)', marginTop: '5px', paddingLeft: '15px' }}>
                                <div className = "developers">
                                    <div >Dee, Adrian Matthew Lee</div>
                                    <div>Dela Cruz, Althea Leanne Luna</div>
                                    <div>Samonte, Anne Camille Tamayo</div>
                                    <div>Xu, Kai Wen Hong</div>
                                </div>
                            </div>
                        )}
                    </li>

                </ul>

            </div>
        </nav>
    )
}

export default Right_Side_Bar;