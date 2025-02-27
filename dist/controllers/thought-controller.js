import { Thought, User } from '../models/index.js';
// get all thoughts
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json({ thoughts });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// get single thought by id
export const getThoughtById = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json({ thought });
        }
        else {
            res.status(404).json({ message: 'Thought not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// create a thought
export const createThought = async (req, res) => {
    try {
        const newThought = new Thought(req.body);
        await newThought.save();
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } }, { new: true });
        res.status(201).json(newThought);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// update a thought
export const updateThought = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true, runValidators: true });
        if (updatedThought) {
            return res.json({ message: "Thought updated successfully", thought: updatedThought });
        }
        else {
            return res.status(404).json({ message: "Thought not found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// delete a thought
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No such thought exists' });
        }
        await User.findByIdAndUpdate(thought.username, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        return res.json({ message: 'Thought successfully deleted' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};
// add a reaction to a thought
export const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
        if (thought) {
            return res.json({ message: "Reaction added successfully", thought });
        }
        else {
            return res.status(404).json({ message: "Thought not found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// remove a reaction from a thought
export const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        if (thought) {
            return res.json({ message: "Reaction removed successfully", thought });
        }
        else {
            return res.status(404).json({ message: "Thought not found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
