import { Schema, Types, model, type Document } from 'mongoose';
import { reactionSchema, IReaction } from './Reaction.js';

interface IThought extends Document {
    thoughtText: string,
    createdAt: Schema.Types.Date,
    username : string,
    reactions: IReaction[]
}

const thoughtSchema = new Schema<IThought>({
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
},
    {
        toJSON: {
            getters: true,
        },
        timestamps: true
    }
);

const Thought = model('Thought', thoughtSchema);

export default Thought;
