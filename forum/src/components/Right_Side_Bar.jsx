/* This component displays the forum information and rules. */

import './Right_Side_Bar.css';
import { forum_rules } from '../data/forum_rules.js';

function Right_Side_Bar() {

    return (

        <nav className = "right_side_bar">

            {/* Section 1: Forum Information */}
            <div className="forum_info_container">

                <div className="info_header">Forum Info</div>
                
                {/* Forum statistics */}
                <div className="stats_grid">

                    <div className="stat_item">
                        <span className="stat_label">Members</span>
                        <span className="stat_value">12,405</span>
                    </div>

                    <div className="stat_item">
                        <span className="stat_label">Active</span>
                        <span className="stat_value highlight">892</span>
                    </div>

                    <div className="stat_item">
                        <span className="stat_label">Founding Date</span>
                        <span className="stat_value">04/04/2016</span>
                    </div>

                </div>

                {/* Forum description */}
                <div className="forum_description">
                    <p>
                        An online forum to discuss Phanthom Thief activity.
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
                        <li key = {rule.id}>
                            <span> {rule.id}. {rule.title}</span>
                        </li>
                    ))}
                </ul>

            </div>
            
        </nav>
    )
}

export default Right_Side_Bar;