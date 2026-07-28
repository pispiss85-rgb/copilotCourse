import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'student' },
    points: { type: Number, default: 0 },
    team: { type: String },
});
export const User = mongoose.model('User', userSchema);
