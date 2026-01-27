import './Pill_Button.css';

function Pill_Button({icon, text, className, onClick}) {

    return (

        <div className={`pill_button ${className ? className : ''}`} onClick = {onClick}>

            <span className = "pill_button_icon">{icon}</span>
            <span className = "pill_button_text">{text}</span>
            
        </div>
    );
}

export default Pill_Button;