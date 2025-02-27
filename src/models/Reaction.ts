// import { Schema, Types, type Document } from 'mongoose';

// export interface IReaction extends Document {
//     reactionId: Schema.Types.ObjectId,
//     reactionBody: string,
//     username: string
//     createdAt: Schema.Types.Date
// }

// export const reactionSchema = new Schema<IReaction>(
//     {
//         reactionId: {
//             type: Schema.Types.ObjectId,
//             default: () => new Types.ObjectId(),
//         },
//         reactionBody: {
//             type: String,
//             required: true,
//             maxlength: 280,
        
//         },
//         username: {
//             type: String,
//             required: true,
        

//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//         },
//     },
//     {
//         timestamps: true,
//         _id: false
//     }
// );
