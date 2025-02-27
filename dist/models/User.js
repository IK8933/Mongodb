import { Schema, model } from 'mongoose';
// Define the User Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: {
        virtuals: true,
        getters: true,
        transform: (_doc, ret) => {
            ret.createdAt = ret.createdAt ? new Date(ret.createdAt).toLocaleString() : null;
            return ret;
        },
    },
    timestamps: true,
    id: false
});
userSchema.virtual('friendCount').get(function () {
    return this.friends?.length ?? 0;
});
// Create and export the User model
const User = model('User', userSchema);
export default User;
