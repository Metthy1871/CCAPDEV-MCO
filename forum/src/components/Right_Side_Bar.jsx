import './Right_Side_Bar.css';

function Right_Side_Bar() {

    const popularCommunities = [
        { id: 1, name: "r/WebDev", icon: "💻", member_count: "152" },
        { id: 2, name: "r/DLSU", icon: "🏹", member_count: "545" },
        { id: 3, name: "r/JokerMain", icon: "🤡", member_count: "888" },
        { id: 4, name: "r/Yuch403", icon: "🤨", member_count: "69" }
    ];

    return (

        <nav className = "right_side_bar">

            <div className = "popular_communities">

                <h3 className = "right_section_title">
                    Popular Communities:
                </h3>

                {popularCommunities.map((community) => (
                    
                    <button key={community.id} className="right_community_link">

                        <span className="com_icon">{community.icon}</span>

                        <div className = "com_info">

                            <span className="com_name">{community.name}</span>
                            <span className="com_members">{community.member_count} members</span>

                        </div>

                    </button>
                ))}

            </div>

        </nav>
    )
}

export default Right_Side_Bar;