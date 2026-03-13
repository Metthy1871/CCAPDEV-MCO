/* This component renders the user's profile icon. */

import './Profile_Icon.css';

function Profile_Icon({user}) {

    const avatar = user?.avatar;
    const alt = user?.username;

    return (

        <div className="profile_container">

            <div className="profile_mask">

                <img 
                    src = {avatar}
                    alt = {alt}
                    className = "profile_pic"
                />

            </div>
            
        </div>
    );
}

export default Profile_Icon;