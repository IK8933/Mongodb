// import mongoose from 'mongoose';
// import { User, Thought } from '../models/index.js';
export {};
// // ✅ Sample Users
// const userData = [
//     {
//         username: 'john_doe',
//         email: 'john@example.com',
//     },
//     {
//         username: 'jane_smith',
//         email: 'jane@example.com',
//     },
// ];
// // ✅ Sample Thoughts
// const thoughtData = [
//     {
//         thoughtText: "This is my first thought!",
//         username: 'john_doe',
//     },
//     {
//         thoughtText: "I love coding in TypeScript!",
//         username: 'jane_smith',
//     },
// ];
// const seedDatabase = async () => {
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/socialmedia'); // ✅ Connect to local MongoDB
//         console.log('🔥 Connected to MongoDB.');
//         // ✅ Clear existing data
//         await User.deleteMany({});
//         await Thought.deleteMany({});
// console.log('✅ Database cleared.');
//         // ✅ Insert Users
//         const users = await User.insertMany(userData);
//         console.log('✅ Users seeded.');
//         // ✅ Insert Thoughts (and link them to users)
//         for (const thought of thoughtData) {
//             const user = users.find((u) => u.username === thought.username);
//             if (user) {
//                 const newThought = await Thought.create({ ...thought, userId: user._id });
//                 await User.findByIdAndUpdate(user._id, { $push: { thoughts: newThought._id } });
//             }
//         }
//         console.log('✅ Thoughts seeded.');
//         console.log('🎉 Seeding complete!');
//         process.exit(0); // ✅ Exit script after seeding
//     } catch (error) {
//         console.error('❌ Seeding error:', error);
//         process.exit(1);
//     }
// };
// // ✅ Run the seed function
// seedDatabase();
