import { Schema, model, type Document, Types } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[]; 
    friends: Types.ObjectId[];  
    createdAt: Date;
}

// Define the User Schema
const userSchema = new Schema<IUser>({
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
},
{
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


userSchema.virtual('friendCount').get(function (this: IUser) {
    return this.friends?.length ?? 0;
});

// Create and export the User model
const User = model<IUser>('User', userSchema);
export default User;