{/* Sample posts */}
export const sample_posts = [

    {
        id: 1,
        title: "The Phantom Thieves Strike Again!",
        user: "Morgana",
        date: "3 hours ago",
        content: "Did anyone else see the calling card on the news? Kamoshida is done for.",
        votes: 1205,
        tags: ["news", "phantomthieves", "justice", "kamoshida"],
        comments: [
            {
                user: "Joker", 
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
        user: "Mishima",            
        date: "5 hours ago",
        content: "I have a theory that cognitive psience is actually based on Jungian psychology...",
        votes: 85,
        tags: ["metaverse", "science", "cognition"],
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
        user: "Ryuji",
        date: "1 day ago",
        content: "Does anyone know if the beef bowl shop is hiring? I need cash for... equipment.",
        votes: 42,
        tags: ["jobs", "cash"],
        comments: [
            {
                user: "Joker",
                date: "14 hours ago",
                content: "Working conditions there are horrid",
                votes: 67,
                comments: []
            }
        ]
    },
    {
        id: 4,
        title: "BEACH IS FULL LOBSTERS",
        user: "Yusuke",
        date: "3 days ago",
        content: "I went to the beach recently and caught over 100 lobsters",
        votes: 47,
        tags: ["lobsters", "beach", "food"],
        comments: [
            {
                user: "Morgana",
                date: "1 day ago",
                content: "(,,> ᴗ <,,)",
                votes: 67,
                comments: []
            },
            {
                user: "Futaba",
                date: "1 day ago",
                content: "No one cares Inari",
                votes: 100,
                comments: []
            }
        ]
    },
    {
        id: 5,
        title: "Looking for book recommendations",
        user: "Makoto",
        date: "6 days ago",
        content: "As the title suggests.",
        votes: 1100,
        tags: ["books", "recommendations"],
        comments: [
            {
                user: "Haru",
                date: "4 days ago",
                content: "What genres are you interested in?",
                votes: 67,
                comments: [
                    {
                        user: "Makoto",
                        date: "4 days ago",
                        content: "Hmm I want one that'll move me to tears",
                        votes: 35,
                        comments: [
                            {
                                user: "Haru",
                                date: "4 days ago",
                                content: "All Quiet on the Western Front. War never changes.",
                                votes: 26,
                                comments: []
                            },
                            {
                                user: "Futaba",
                                date: "4 days ago",
                                content: "Introduction to Algorithms by Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein " +
                                    "https://www.goodreads.com/book/show/108986.Introduction_to_Algorithms",
                                votes: -4,
                                comments: []
                            }
                        ]
                    }
                ]
            },
            {
                user: "Joker",
                date: "2 day ago",
                content: "Why are you posting here? Just go to the library",
                votes: -1000,
                comments: [
                    {
                        user: "Ryuji",
                        date: "1 days ago",
                        content: "Get ratio'd",
                        votes: 89,
                        comments: []
                    }
                ]
            }
        ]
    },
    {
        id: 6,
        title: "Why do ice cream prices keep going up",
        user: "Ann",
        date: "7 days ago",
        content: "I swear it used to be 200 yen. Why is it almost 400 now",
        votes: 420,
        tags: ["food", "icecream", "inflation"],
        comments: [
            {
                user: "Haru",
                date: "6 day ago",
                content: "Capitalism...",
                votes: 67,
                comments: []
            },
            {
                user: "Joker",
                date: "3 day ago",
                content: "Are you sure you should be eating ice cream? Careful of your weight",
                votes: -100,
                comments: []
            }
        ]
    },
];
