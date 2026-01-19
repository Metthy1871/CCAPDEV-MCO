import './Nav_Bar.css';

function Nav_Bar(){

    return (

        <nav className = "nav_bar">

            <div className = "left">
                
                <img
                    src = "https://wallpaperaccess.com/full/13458433.jpg"
                    alt = "failed"
                    className = "logo"
                />

                <span className = "logo_text">
                    The Phantom Aficionado Forum
                </span>
            </div>
            
            <div className = "center">
                <div className = "search_bar">
                    <input type = "text" placeholder = "Search" className = "search_input"/>
                </div>    
            </div>


            <div className = "right">
                <div className = "links">
                    <button className = "pill home"> Home </button>
                    <button className = "pill register"> Register </button>
                    <button className = "pill log_in"> Log In </button>
                </div>
            </div>
            

        </nav>
    );
}

export default Nav_Bar