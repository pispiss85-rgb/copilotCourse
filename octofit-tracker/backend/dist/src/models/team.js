import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    sport: { type: String, required: true },
    members: { type: [String], default: [] },
    score: { type: Number, default: 0 },
});
export const Team = mongoose.model('Team', teamSchema);
