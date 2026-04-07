import { useState, useEffect } from 'react';
import './RateLimitToast.css'; 

function RateLimitToast() {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

        const handleRateLimit = () => {

            setIsVisible(true);
            
            // Automatically hide the warning after 4 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 8000);
        };

        window.addEventListener('rate-limit-hit', handleRateLimit);

        return () => window.removeEventListener('rate-limit-hit', handleRateLimit);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="rate_limit_toast">
            <div className="toast_content">
                <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>⚠️</span>
                <span>
                    <strong>SECURITY LEVEL MAXIMUM!</strong> <br/>
                    You have the rate limit
                </span>
            </div>
        </div>
    );
}

export default RateLimitToast;