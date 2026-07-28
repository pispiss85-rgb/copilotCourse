import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  type: string;
  durationMinutes: number;
  difficulty: string;
  description: string;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  description: { type: String, required: true },
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
