import './CreatePostModal.css';
import Pill_Button from './Pill_Button';

function CreatePostModal({ isOpen, onClose }) {
    
    /* If not open, don't render */
    if (!isOpen) 
        return null;

    return (

        <div className="modal_overlay" onClick={onClose}>
            
            <div className="modal_card" onClick={(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className="modal_header">

                    <h2 className="modal_title">
                        SEND CALLING CARD
                    </h2>

                    <button 
                        className = "close_icon" 
                        onClick={onClose}>
                            ✕
                    </button>

                </div>

                {/* Form Body */}
                <div className = "modal_body">
                    
                    <div className = "input_group">

                        <input 
                            type = "text" 
                            placeholder = "Title" 
                            className = "modal_input" 
                        />

                    </div>

                    <div className="input_group">

                        <textarea 
                            placeholder = "Content" 
                            className = "modal_textarea"
                            rows="5"
                        />

                    </div>

                </div>

                {/* Footer Buttons */}
                <div className="modal_footer">

                    <Pill_Button 
                        text="CANCEL" 
                        onClick={onClose} 
                        className="cancel_btn"
                    />

                    <Pill_Button 
                        text="SEND CARD" 
                        icon="🪶"
                        onClick={() => alert("Animation playing... (Logic coming soon)")} 
                        className="send_btn"
                    />

                </div>

            </div>
        </div>
    );
}

export default CreatePostModal;