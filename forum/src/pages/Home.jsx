import Left_Side_Bar from '../components/Left_Side_Bar.jsx';
import Nav_Bar from '../components/Nav_Bar.jsx';
import Post from '../components/Post.jsx';
import './Home.css';

function App() {
  
  const samplePosts = [
    {
      id: 1,
      title: "The Phantom Thieves Strike Again!",
      author: "JokerFan22",
      date: "2 hours ago",
      content: "Did anyone else see the calling card on the news? Kamoshida is done for.",
      votes: 1205
    },
    {
      id: 2,
      title: "Is the Metaverse Real?",
      author: "Mishima",
      date: "5 hours ago",
      content: "I have a theory that cognitive psience is actually based on Jungian psychology...",
      votes: 85
    },
    {
      id: 3,
      title: "Looking for a part-time job",
      author: "Ryuuji_Rules",
      date: "1 day ago",
      content: "Does anyone know if the beef bowl shop is hiring? I need cash for... equipment.",
      votes: 42
    }
  ];

  return (
    
    <>
      <Nav_Bar/>

      <div className = "home_container">

        <title>The Phantom Aficionado Forum</title>
        
        <div className = "left_side_container">

            <Left_Side_Bar/>
            
        </div>

        <div className = "feed_container">

          {samplePosts.map((post) => (
            <Post 
              key={post.id}
              title={post.title}
              author={post.author}
              date={post.date}
              content={post.content}
              votes={post.votes}
            />
          ))}
          
        </div>

      </div>
    
    </>
  )
}

export default App
