import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { User } from './models/User.js';
import Post from './models/Post.js';
import Comment from './models/Comment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');

        // Avoid duplicate data errors
        await User.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});
        console.log('Database cleared.');

        // Create 5 users
        const users = await User.create([
            { 
                username: 'Joker', email: 'leader@phantom.com', password: 'password123',
                bio: "hehe", avatar: "https://i.pinimg.com/474x/ba/a1/41/baa141603b6595a462b8fea1743310f9.jpg" 
            },
            { 
                username: 'Skull', email: 'trackstar@phantom.com', password: 'password123', 
                bio: "athlete", avatar: "https://preview.redd.it/osh0zg2xjtc41.png?auto=webp&s=fdc89aa46138a8de734f2fe52e0cc774cc34e092" 
            },
            { 
                username: 'Panther', email: 'model@phantom.com', password: 'password123',
                bio: "hehe", avatar: "https://avatarfiles.alphacoders.com/865/thumb-1920-86522.png" 
            },
            { 
                username: 'Fox', email: 'artist@phantom.com', password: 'password123',
                bio: "hehe", avatar: "https://i.pinimg.com/474x/47/76/d5/4776d5ba413f83bd49a16eca36b6652b.jpg" 
            },
            { 
                username: 'Queen', email: 'studentcouncil@phantom.com', password: 'password123',
                bio: "hehe", avatar: "https://i.redd.it/20ld74wraawa1.jpg" 
            },
            { 
                username: 'Oracle', email: 'navi@phantom.com', password: 'password123',
                bio: "Computers are awesome", avatar: "https://assetsio.gnwcdn.com/persona-5-royal-futaba-confidant.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp" 
            },
            { 
                username: 'Noir', email: 'capitalist@phantom.com', password: 'password123',
                bio: "Tending to the garden", avatar: "https://images8.alphacoders.com/121/1210979.png" 
            },
            { 
                username: 'Crow', email: 'crow@phantom.com', password: 'password123',
                bio: "Justice will prevail.", avatar: "https://images.steamusercontent.com/ugc/1021698695532836540/A09520054CE27FBFE73300DB7953DF173E33F209/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" 
            }
        ]);
        
        console.log('8 Users created.');

        // Create posts with time travel (for testing sorting algorithm)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // Pre-generate IDs so we can reference them in comments below
        const postId1 = new mongoose.Types.ObjectId();
        const postId2 = new mongoose.Types.ObjectId();
        const postId3 = new mongoose.Types.ObjectId();
        const postId4 = new mongoose.Types.ObjectId();
        const postId5 = new mongoose.Types.ObjectId();
        const postId6 = new mongoose.Types.ObjectId();
        const postId7 = new mongoose.Types.ObjectId();
        const postId8 = new mongoose.Types.ObjectId();

        // Use the raw MongoDB driver to bypass Mongoose's automatic timestamp handling,
        // allowing us to manually set createdAt for testing the sorting algorithms
        await Post.collection.insertMany([
            {
                _id: postId1,
                title: 'The Shujin Teacher Conspiracy',
                content: "The pe teacher at Shujin Academy gives me bad vibes, am I the only one?",
                author: users[0]._id, // Joker
                tags: ['shujin', 'rumor'],
                upvotes: [users[1]._id, users[2]._id, users[3]._id, users[4]._id], // 4 Votes
                downvotes: [],
                createdAt: sixMonthsAgo,
                updatedAt: sixMonthsAgo
            },
            {
                _id: postId2,
                title: 'Warning: Shibuya Scams',
                content: "I've seen a growing number of scammers in Shibuya, stay vigilant",
                author: users[4]._id, // Queen
                tags: ['shibuya', 'warning'],
                upvotes: [users[0]._id, users[1]._id, users[2]._id], // 3 Votes
                downvotes: [],
                createdAt: yesterday,
                updatedAt: yesterday
            },
            {
                _id: postId3,
                title: 'Did anyone see that calling card?',
                content: "The Phantom Thieves just posted a new calling card on the bulletin board!",
                author: users[1]._id, // Skull
                tags: ['callingcard'],
                upvotes: [], // 0 Votes
                downvotes: [],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: postId4,
                title: 'Shido is sus?',
                content: "Shido seems suspicious, don't believe a word he says",
                author: users[2]._id, // Panther
                tags: ['politics', 'government', 'news'],
                upvotes: [users[0]._id], // 0 Votes
                downvotes: [],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: postId5,
                title: 'Lobsters at the beach',
                content: 'I just caught two massive lobsters at the beach.',
                author: users[3]._id, // Fox
                tags: ['food', 'beach', 'news'],
                upvotes: [], // 0 Votes
                downvotes: [users[0]._id], // 1 Downvote
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: postId6,
                title: 'Any good turn-based RPGs out right now?',
                content: "I've 100%'d every game in my backlog. Need something highly tactical. Bonus points if it has permadeath.",
                author: users[5]._id, // Oracle
                tags: ['gaming', 'rpg', 'help'],
                upvotes: [users[0]._id, users[1]._id, users[6]._id], // 3 Votes
                downvotes: [],
                createdAt: yesterday,
                updatedAt: yesterday
            },
            {
                _id: postId7,
                title: 'The strategy of the Napoleonic era...',
                content: "Fascinating how the tactics of the past mirror modern chess. Anyone here play? I hover around a 1300 rating online when I have free time between cases.",
                author: users[7]._id, // Crow
                tags: ['chess', 'history', 'strategy'],
                upvotes: [users[4]._id], // Queen approves
                downvotes: [users[1]._id], // Skull downvotes
                createdAt: sixMonthsAgo,
                updatedAt: new Date() // Edited recently!
            },
            {
                _id: postId8,
                title: 'Any good book recommendations?',
                content: "As the title says",
                author: users[6]._id, // Crow
                tags: ['books', 'education'],
                upvotes: [users[4]._id], // Queen approves
                downvotes: [],
                createdAt: sixMonthsAgo,
                updatedAt: yesterday
            }
        ]);

        console.log('Posts created with manipulated timestamps.');

        // Create nested comments w/ upvotes and time travel
        
        // Set up specific timestamps for our comments
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        const oneHourAgo = new Date();
        oneHourAgo.setHours(oneHourAgo.getHours() - 1);

        // Top-Level Comment 1: Oldest, but low upvotes
        const rootComment1 = await Comment.create({
            content: 'I heard about this too! We need to investigate.',
            author: users[4]._id, // Queen
            post: postId1,
            parentComment: null,
            upvotes: [users[0]._id], // 1 Upvote (Joker)
            downvotes: [],
            createdAt: twoDaysAgo
        });

        // Reply to Root Comment 1 (A nested thread)
        const reply1 = await Comment.create({
            content: 'Let me know if you find anything. I can ask around.',
            author: users[1]._id, // Skull
            post: postId1,
            parentComment: rootComment1._id,
            upvotes: [], // 0 Upvotes
            downvotes: [],
            createdAt: new Date()
        });

        // Top-Level Comment 2: Newest, but highly upvoted (Most Popular)
        const rootComment2 = await Comment.create({
            content: 'Wait, I have proof. Look at this picture I took at the courtyard.',
            author: users[3]._id, // Fox
            post: postId1,
            parentComment: null,
            upvotes: [users[0]._id, users[1]._id, users[2]._id, users[4]._id], // 4 Upvotes
            downvotes: [],
            createdAt: oneHourAgo
        });

        const reply2 = await Comment.create({
            content: 'Taking pictures without consent? Kinda sus',
            author: users[0]._id, // Joker
            post: postId1,
            parentComment: rootComment2._id,
            upvotes: [], // 0 Upvotes
            downvotes: [users[0]._id, users[1]._id, users[2]._id, users[4]._id],
            createdAt: new Date()
        });

        const reply3 = await Comment.create({
            content: "Get ratio'd",
            author: users[1]._id, // Skull
            post: postId1,
            parentComment: rootComment2._id,
            upvotes: [users[0]._id, users[1]._id, users[2]._id, users[4]._id], // 0 Upvotes
            downvotes: [],
            createdAt: new Date()
        });

        const rootComment3 = await Comment.create({
            content: 'Have you tried touching grass instead?',
            author: users[1]._id, // Skull
            post: postId6,
            parentComment: null,
            upvotes: [users[7]._id], 
            downvotes: [users[5]._id, users[0]._id],
            createdAt: yesterday
        });

        const reply4 = await Comment.create({
            content: 'I will hack your search history and post it on the calling card board.',
            author: users[5]._id, // Oracle
            post: postId6,
            parentComment: rootComment3._id,
            upvotes: [users[0]._id, users[4]._id, users[6]._id], // High upvotes
            downvotes: [],
            createdAt: yesterday
        });

        const rootComment4 = await Comment.create({
            content: '1300 is decent, but true strategy is found in the student council room. We should play sometime.',
            author: users[4]._id, // Queen
            post: postId7,
            parentComment: null,
            upvotes: [users[0]._id],
            downvotes: [],
            createdAt: new Date()
        });

        const rootComment5 = await Comment.create({
            content: 'If you want to talk about art history, the aesthetic of the French Empire is truly something to behold.',
            author: users[3]._id, // Fox
            post: postId7,
            parentComment: null,
            upvotes: [users[6]._id], // Noir upvotes
            downvotes: [],
            createdAt: new Date()
        });

        const rootComment6 = await Comment.create({
            content: 'Introduction to Algorithms by Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein',
            author: users[5]._id, // Oracle
            post: postId8,
            parentComment: null,
            upvotes: [],
            downvotes: [users[0]._id, users[4]._id, users[6]._id],
            createdAt: yesterday
        });

        const rootComment7 = await Comment.create({
            content: 'All Quiet on The Western Front',
            author: users[4]._id, // Queen
            post: postId8,
            parentComment: null,
            upvotes: [users[0]._id, users[4]._id, users[6]._id],
            downvotes: [],
            createdAt: yesterday
        });

        console.log('Nested comment tree created with upvotes and timestamps.');

        console.log('Database Seeding Complete!');
        process.exit();
        

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();