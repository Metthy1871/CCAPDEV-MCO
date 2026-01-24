import './Trending_Topics.css';

function Trending_Topics() {

    const keywords = [
        { id: 1, text: "PhantomThieves", size: "1.2rem", color: "red" },
        { id: 2, text: "Kamoshida", size: "1rem", color: "white" },
        { id: 3, text: "ChangeOfHeart", size: "0.9rem", color: "#aaa" },
        { id: 4, text: "MentalShutdowns", size: "1.1rem", color: "red" },
        { id: 5, text: "Shujin", size: "0.8rem", color: "white" },
        { id: 6, text: "Medjed", size: "1rem", color: "#aaa" },
        { id: 7, text: "Yuch403", size: "1rem", color: "#aaa" },
        { id: 8, text: "Shido", size: "1rem", color: "#aaa" },
        { id: 9, text: "Okumura", size: "1rem", color: "#aaa" },
        { id: 10, text: "Elections", size: "1rem", color: "#aaa" }
    ];

    return (

        <div className = "trend_container">

                <h3 className = "trend_header">
                    Popular Topics
                </h3>

                <div className = "trend_cloud">

                    {keywords.map((word) => (

                        <span
                            key = {word.id}
                            className = "buzz_word"
                        >
                            {word.text}
                        </span>

                    ))}

                </div>
        </div>

    );
}

export default Trending_Topics;