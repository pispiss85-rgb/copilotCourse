import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: string[];
  score: number;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  sport: { type: String, required: true },
  members: { type: [String], default: [] },
  score: { type: Number, default: 0 },
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
