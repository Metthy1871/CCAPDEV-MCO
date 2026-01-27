import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Post_Page from './pages/Post_Page';

function App() {

    return (

        <div className = "App">

            <Routes>

                <Route path = "/" element = {<Home/>}/>
                <Route path = "/login" element = {<Login/>}/>

                <Route path = "/post/:id" element = {<Post_Page/>}/>
            
            </Routes>

        </div>
    );
}

export default App;