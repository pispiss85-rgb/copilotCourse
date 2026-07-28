import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    description: { type: String, required: true },
});
export const Workout = mongoose.model('Workout', workoutSchema);
