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
            }
        ]);
        
        console.log('5 Users created.');

        // Create posts with time travel (for testing sorting algorithm)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // Pre-generate IDs so we can reference them in comments below
        const postId1 = new mongoose.Types.ObjectId();
        const postId2 = new mongoose.Types.ObjectId();
        const postId3 = new mongoose.Types.ObjectId();

        // Use the raw MongoDB driver to bypass Mongoose's automatic timestamp handling,
        // allowing us to manually set createdAt for testing the sorting algorithms
        await Post.collection.insertMany([
            {
                _id: postId1,
                title: 'The Shujin Teacher Conspiracy',
                content: 'This post is very old but has the most votes. (Popular All-Time)',
                author: users[0]._id, // Joker
                tags: ['shujin', 'rumor'],
                upvotes: [users[1]._id, users[2]._id, users[3]._id, users[4]._id], // 4 Votes
                createdAt: sixMonthsAgo,
                updatedAt: sixMonthsAgo
            },
            {
                _id: postId2,
                title: 'Warning: Shibuya Scams',
                content: 'This post is new and has decent votes. (Popular Recent)',
                author: users[4]._id, // Queen
                tags: ['shibuya', 'warning'],
                upvotes: [users[0]._id, users[1]._id, users[2]._id], // 3 Votes
                createdAt: yesterday,
                updatedAt: yesterday
            },
            {
                _id: postId3,
                title: 'Did anyone see that calling card?',
                content: 'Brand new, zero votes. Should be at the bottom of popular sorts.',
                author: users[1]._id, // Skull
                tags: ['callingcard'],
                upvotes: [], // 0 Votes
                createdAt: new Date(),
                updatedAt: new Date()
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
            createdAt: twoDaysAgo
        });

        // Top-Level Comment 2: Newest, but highly upvoted (Most Popular)
        const rootComment2 = await Comment.create({
            content: 'Wait, I have proof. Look at this picture I took at the courtyard.',
            author: users[3]._id, // Fox
            post: postId1,
            parentComment: null,
            upvotes: [users[0]._id, users[1]._id, users[2]._id, users[4]._id], // 4 Upvotes
            createdAt: oneHourAgo
        });

        // Reply to Root Comment 1 (A nested thread)
        const reply1 = await Comment.create({
            content: 'Let me know if you find anything. I can ask around.',
            author: users[1]._id, // Skull
            post: postId1,
            parentComment: rootComment1._id,
            upvotes: [], // 0 Upvotes
            createdAt: new Date()
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