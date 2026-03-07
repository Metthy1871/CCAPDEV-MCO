import mongoose from 'mongoose';
import dotenv from 'dotenv';
import{ User } from './models/User.js';
import Post from './models/Post.js';
import Comment from './models/Comment.js';

dotenv.config({ path: '../.env' });

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
            { username: 'Joker', email: 'leader@phantom.com', password: 'password123' },
            { username: 'Skull', email: 'trackstar@phantom.com', password: 'password123' },
            { username: 'Panther', email: 'model@phantom.com', password: 'password123' },
            { username: 'Fox', email: 'artist@phantom.com', password: 'password123' },
            { username: 'Queen', email: 'studentcouncil@phantom.com', password: 'password123' }
        ]);
        console.log('5 Users created.');

        // Create posts with time travel (for testing sorting algorithm)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const posts = await Post.create([
            {
                title: 'The Shujin Teacher Conspiracy',
                content: 'This post is very old but has the most votes. (Popular All-Time)',
                author: users[0]._id, // Joker
                tags: ['shujin', 'rumor'],
                votes: [users[1]._id, users[2]._id, users[3]._id, users[4]._id], // 4 Votes
                createdAt: sixMonthsAgo 
            },
            {
                title: 'Warning: Shibuya Scams',
                content: 'This post is new and has decent votes. (Popular Recent)',
                author: users[4]._id, // Queen
                tags: ['shibuya', 'warning'],
                votes: [users[0]._id, users[1]._id, users[2]._id], // 3 Votes
                createdAt: yesterday
            },
            {
                title: 'Did anyone see that calling card?',
                content: 'Brand new, zero votes. Should be at the bottom of popular sorts.',
                author: users[1]._id, // Skull
                tags: ['callingcard'],
                votes: [], // 0 Votes
                createdAt: new Date() // Right now
            }
        ]);
        console.log('Posts created with manipulated timestamps.');

        // Create nested comments
        // Root Comment on Post 1
        const rootComment = await Comment.create({
            content: 'I heard about this too! We need to investigate.',
            author: users[4]._id, // Queen
            post: posts[0]._id,
            parentComment: null
        });

        // Reply to the Root Comment
        const reply1 = await Comment.create({
            content: 'Let me know if you find anything. I can ask around.',
            author: users[1]._id, // Skull
            post: posts[0]._id,
            parentComment: rootComment._id 
        });

        // Reply to the Reply (3rd Level Deep!)
        await Comment.create({
            content: 'Don\'t do anything reckless, Skull.',
            author: users[0]._id, // Joker
            post: posts[0]._id,
            parentComment: reply1._id
        });

        // A separate comment on Post 2
        await Comment.create({
            content: 'Thanks for the warning. I will stay away from Central Street.',
            author: users[3]._id, // Fox
            post: posts[1]._id,
            parentComment: null
        });

        console.log('Nested comment tree created.');
        console.log('Database Seeding Complete!');
        process.exit();

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();