import Nav_Bar from './components/Nav_Bar.jsx';
import './App.css';

function App() {
  
  return (

    <>
      <title>The Phantom Aficionado Forum</title>
      
      <Nav_Bar/>

      <div className="app-container">
        {/* A static header */}
        <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '50px' }}>
          PHANTOM FORUM
        </h1>

        {/* Our Custom P5 Styled Element */}
        <div className="p5-box">
          <span>Start Game</span>
        </div>

        <br />

        <div className="p5-box">
          <span>Config</span>
        </div>
        
      </div>
    </>
  )
}

export default App