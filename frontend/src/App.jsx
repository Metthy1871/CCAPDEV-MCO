/* This is the root of the application */

import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import TopScroll from './components/TopScroll';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Post_Page from './pages/Post_Page';
import Profile_Page from './pages/Profile_Page';

// Interceptor for Remember Me
axios.interceptors.response.use(

    (response) => {
        // Look for the rolling session header
        const refreshedToken = response.headers['x-refreshed-token'];

        // If the backend sent a new 3-week extension, save it
        if (refreshedToken) {
            localStorage.setItem('token', refreshedToken);
            console.log("Session seamlessly extended by 3 weeks!");
        }

        return response;
    },
    
    (error) => {
        // If the token is completely expired or invalid, kick them to login
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            // Only redirect if they aren't already on the login page
            if (window.location.pathname !== '/login') {
                window.location.href = '/login'; 
            }
        }
        return Promise.reject(error);
    }
);

function App() {

    return (

        <>

            <TopScroll/>

            {/* Client-side routes are managed here*/}
            <Routes>

                <Route path = "/" element = {<Home/>}/>
                <Route path = "/login" element = {<Login/>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path = "/post/:id" element = {<Post_Page/>}/>
                <Route path = "/profile/:username" element = {<Profile_Page/>}/>
            
            </Routes>

        </>
    );
}

export default App;