import { Schema, model } from 'mongoose';
import { reactionSchema } from './Reaction.js';
import { User } from './index.js';
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        max_length: 280,
        min_length: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        getters: true,
    },
    timestamps: true
});
const user = model('user', userSchema);
export default User;
