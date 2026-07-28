import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    points: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now },
});
export const Activity = mongoose.model('Activity', activitySchema);
