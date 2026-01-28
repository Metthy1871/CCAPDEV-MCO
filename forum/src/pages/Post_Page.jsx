import './Post_Page.css';
import { useParams } from 'react-router-dom';
import Nav_bar from '../components/Nav_Bar.jsx';
import Left_Side_Bar from '../components/Left_Side_Bar.jsx';
import Right_Side_Bar from '../components/Right_Side_Bar.jsx';
import Post from '../components/Post.jsx';


{/* Placeholder posts */}
    const samplePosts = [
        {
            id: 1,
            title: "The Phantom Thieves Strike Again!",
            author: "JokerFan22",
            date: "3 hours ago",
            content: "Did anyone else see the calling card on the news? Kamoshida is done for.",
            votes: 1205,
            comments: [
                {
                    user: "Morgana", 
                    date: "2 hour ago", 
                    content: "Go to sleep",
                    votes: 67,
                    comments: [
                        {
                            user: "Ann", 
                            date: "1 hour ago", 
                            content: "silence cat",
                            votes: 69,
                            comments: []
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "Is the Metaverse Real?",
            author: "Mishima",
            date: "5 hours ago",
            content: "I have a theory that cognitive psience is actually based on Jungian psychology...",
            votes: 85,
            comments: [
                {
                    user: "Ryuji",
                    date: "3 hours ago",
                    content: "For real?!",
                    votes: 67,
                    comments: []
                }
            ]
        },
        {
            id: 3,
            title: "Looking for a part-time job",
            author: "Ryuuji_Rules",
            date: "1 day ago",
            content: "Does anyone know if the beef bowl shop is hiring? I need cash for... equipment.",
            votes: 42,
            comments: [
                {
                    user: "Mishima",
                    date: "14 hours ago",
                    content: "Working conditions there are horrid",
                    votes: 67,
                    comments: []
                }
            ]
        },
        {
            id: 4,
            title: "Anyone see what happened in Yuchengko?",
            author: "P. Diddy",
            date: "3 days ago",
            content: "Is it something in the air, the water, or whatever cursed potion is brewing inside their vape juice? I genuinely cannot comprehend why some of my fellow Lasallians are perpetually in heat, as if the campus operates on a year-round mating season, nor why public spaces seem to be their venue of choice." +
            "During a vacancy, I decided to stroll around campus to kill time. I passed by SJ, LS, then Yuch. While walking through the halls, I heard a faint rhythmic thumping. To my surprise, it was a conyo Neanderthal enthusiastically treating an empty classroom like a discount motel, stuffing his girlfriend like a Thanksgiving turkey with zero shame and even less rhythm. Traumatized, I fled to the library to cleanse my soul, only to spot another couple in my peripheral vision aggressively sampling each other’s necks in a so-called blind spot." +
            "When did Yuch and the library turn into SOGO? If you cannot get a room, at least have the human decency to remember that desks are for studying, not a canvas to leave your jizz. SMH.",
            votes: 1100,
            comments: [
                {
                    user: "Maruki",
                    date: "1 day ago",
                    content: "More funding for mental health please!",
                    votes: 67,
                    comments: []
                }
            ]
        },
    ];

function Post_Page() {

    const { id } = useParams();

    // 2. Find the specific post in your data
    // (Note: URL params are strings, so we convert to Number)
    const post = samplePosts.find(p => p.id === Number(id));

    if (!post) {
        return <div>Post not found!</div>;
    }

    return (

        <>
        
            <Nav_bar />

            <div className="post_page_container">

                <div className = "left_side_container">

                    <Left_Side_Bar/>
                    
                </div>

                <div className = "post_page_view">

                    <Post 
                        id={post.id}
                        title={post.title}
                        author={post.author}
                        date={post.date}
                        content={post.content}
                        votes={post.votes}
                        isPreview={false}
                        comments={post.comments}
                    />

                </div>

                <div className = "right_side_container">

                    <Right_Side_Bar/>

                </div>

            </div>

        </>
    );
}

export default Post_Page;