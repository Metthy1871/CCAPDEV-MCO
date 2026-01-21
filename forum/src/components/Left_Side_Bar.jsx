import './Left_Side_Bar.css';


function Left_Side_Bar() {

    const recentCommunities = [
        { id: 1, name: "r/Persona5", icon: "🎭" },
        { id: 2, name: "r/WebDev", icon: "💻" },
        { id: 3, name: "r/JokerMain", icon: "🃏" },
        { id: 4, name: "r/ShujinAcademy", icon: "🏫" }
    ];

    return (
        
        <nav className = "left_side_bar"> 
    
            <div className = "left_side_buttons">

                <button className = "side_button home_button"> 🏠 Home </button>
                <button className = "side_button popular_button"> 🔥 Popular </button>
                <button className = "side_button explore_button"> 🧭 Explore </button>

            </div>

            <hr className="separator" />

            <div className = "recent_communities">

                <h3 className = "left_section_title">
                    Recent Communities:
                </h3>

                {recentCommunities.map((community) => (
                    <button key={community.id} className="left_community_link">
                        <span className="com_icon">{community.icon}</span>
                        <span className="com_name">{community.name}</span>
                    </button>
                ))}

            </div>

            {/* Maybe add "my communities? */}

        </nav>
    )
}

export default Left_Side_Bar;

