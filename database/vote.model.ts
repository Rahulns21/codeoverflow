import { model, models, Schema, Types } from "mongoose";

type ContentType = 'question' | 'answer';
type VoteType = 'upvote' | 'downvote';

interface IVote {
    author: Types.ObjectId;
    actionId: Types.ObjectId;
    type: ContentType;
    voteType: VoteType;
}

const VoteSchema = new Schema<IVote>({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    actionId: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, enum: ['question', 'answer'], required: true },
    voteType: { type: String, enum: ['upvote', 'downvote'], required: true },
}, { timestamps: true });

const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);

export default Vote;