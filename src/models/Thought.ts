import { Schema, model, type Document, Types } from 'mongoose';
import { reactionSchema, IReaction } from './Reaction.js';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    userId: Types.ObjectId;  // ✅ Add this field to reference the User model
    reactions: IReaction[];
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        userId: {  // ✅ Reference to the User model
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reactions: [reactionSchema], 
    },
    {
        toJSON: {
            virtuals: true, 
            getters: true, 
        },
        timestamps: true,
        id: false,
    }
);

// ✅ Virtual for counting reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;



















// import { Schema, model, type Document } from 'mongoose';
// import { reactionSchema, IReaction } from './Reaction.js';



// interface IThought extends Document {
//     thoughtText: string;
//     createdAt: Date;
//     username: string;
//     reactions: IReaction[];
// }


// const thoughtSchema = new Schema<IThought>(
//     {
//         thoughtText: {
//             type: String,
//             required: true,
//             minlength: 1,
//             maxlength: 280,
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
            

//         },
//         username: {
//             type: String,
//             required: true,
//         },
//         reactions: [reactionSchema], 
//     },
//     {
//         toJSON: {
//             virtuals: true, 
//             getters: true, 
//         },
//         timestamps: true,
//         id: false,
//     }
// );


// thoughtSchema.virtual('reactionCount').get(function () {
//     return this.reactions.length;
// });

// const Thought = model<IThought>('Thought', thoughtSchema);
// export default Thought;
