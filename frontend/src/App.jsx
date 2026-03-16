/* This is the root of the application */

import { Routes, Route } from 'react-router-dom';
import TopScroll from './components/TopScroll';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Post_Page from './pages/Post_Page';
import Profile_Page from './pages/Profile_Page';

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