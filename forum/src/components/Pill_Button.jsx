import './Pill_Button.css';

function Pill_Button({icon, text, className}) {

    return (

        <button className={`pill_button ${className ? className : ''}`}>

            <span className = "pill_button_icon">{icon}</span>
            <span className = "pill_button_text">{text}</span>
            
        </button>
    );
}

export default Pill_Button;