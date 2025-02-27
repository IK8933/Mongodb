import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';
// import { ObjectId } from 'mongodb';

// get all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        
        res.json({ users }); 
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// get single user by id
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params; 

    try {
        const user = await User.findById(userId);
        
        if (user) {
            res.json({ user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = new User(req.body); 
        await newUser.save(); 

        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// update a user
export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            req.body,
            { new: true, runValidators: true }
        );

        if (updatedUser) {
            return res.json({ message: "User updated successfully", user: updatedUser }); 
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// delete user (BONUS: and delete associated thoughts)
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId }); 

        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        await Thought.deleteMany({ userId: req.params.userId }); 

        return res.json({ message: 'User and associated thoughts successfully deleted' });
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};

// add friend to friend list
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        );

        if (user) {
            return res.json({ message: "Friend added successfully", user }); 
        } else {
            return res.status(404).json({ message: "User not found" }); 
        }
    } catch (err) {
        return res.status(500).json({ message: (err as Error).message }); 
    }
};

// Remove friend from friend list
export const removeFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params; 

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } }, 
            { new: true }
        );

        if (user) {
            return res.json({ message: "Friend removed successfully", user }); 
        } else {
            return res.status(404).json({ message: "User not found" }); 
        }
    } catch (err) {
        return res.status(500).json({ message: (err as Error).message }); 
    }
};

