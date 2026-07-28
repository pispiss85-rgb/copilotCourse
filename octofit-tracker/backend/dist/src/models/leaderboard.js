import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
});
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
