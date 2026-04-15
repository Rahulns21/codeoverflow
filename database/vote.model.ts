import { Document, model, models, Schema, Types } from "mongoose";

type ContentType = 'question' | 'answer';
type VoteType = 'upvote' | 'downvote';

export interface IVote {
    author: Types.ObjectId;
    actionId: Types.ObjectId;
    type: ContentType;
    voteType: VoteType;
}

export interface IVoteDoc extends IVote, Document {}

const VoteSchema = new Schema<IVote>({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    actionId: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, enum: ['question', 'answer'], required: true },
    voteType: { type: String, enum: ['upvote', 'downvote'], required: true },
}, { timestamps: true });

const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);

export default Vote;