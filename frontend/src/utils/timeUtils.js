/* This file handles frontend time formatting */

export function getRelativeTime(dateString) {

    if (!dateString) 
        return "";

    const postDate = new Date(dateString);
    const now = new Date();
    const secondsPast = Math.floor((now - postDate) / 1000);

    // Under 1 minute
    if (secondsPast < 60) {
        return "Just now";
    }

    // Under 1 hour
    if (secondsPast < 3600) {
        const minutes = Math.floor(secondsPast / 60);
        return `${minutes}minutes ago`;
    }

    // Under 24 hours
    if (secondsPast < 86400) {
        const hours = Math.floor(secondsPast / 3600);
        return `${hours}hours ago`;
    }

    // Under 31 days
    if (secondsPast < 2592000) {
        const days = Math.floor(secondsPast / 86400);
        return `${days}days ago`;
    }

    // Under 1 year
    if (secondsPast < 31536000) {
        const months = Math.floor(secondsPast / 2592000);
        return `${months}months ago`;
    }
    
    // Over 1 year
    const years = Math.floor(secondsPast / 31536000);
    return `${years}y ago`;
}

export function getExactTime(dateString) {

    if (!dateString) 
        return "";
    
    return new Date(dateString).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    }).replace(' at ', ' at ');
}