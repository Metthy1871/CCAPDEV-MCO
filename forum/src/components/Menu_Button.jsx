import './Menu_Button.css';

function Menu_Button({icon, text}) {

    return (

        <button className = "menu_button">

            <span className = "menu_button_icon">{icon}</span>
            <span className = "menu_button_text">{text}</span>
            
        </button>
    );
}

export default Menu_Button;