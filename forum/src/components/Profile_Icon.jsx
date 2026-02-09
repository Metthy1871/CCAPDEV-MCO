/* This component renders the user's profile icon. */

import './Profile_Icon.css';


function Profile_Icon({user}) {

    return (

        <div className="profile_container">

            <div className="profile_mask">

                <img 
                    src = {user.avatar}
                    alt = {user.username}
                    className = "profile_pic"
                />

            </div>
            
        </div>
    );
}

export default Profile_Icon;