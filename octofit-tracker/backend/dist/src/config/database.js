import mongoose from 'mongoose';
export function buildConnectionString(uri = process.env.MONGODB_URI) {
    return uri ?? 'mongodb://localhost:27017/octofit_db';
}
export async function connectToDatabase(uri) {
    const connectionString = buildConnectionString(uri);
    mongoose.set('strictQuery', true);
    if (mongoose.connection.readyState === 1) {
        return mongoose;
    }
    try {
        await mongoose.connect(connectionString);
        return mongoose;
    }
    catch (error) {
        console.warn('MongoDB connection unavailable; continuing with in-memory-safe behavior.', error);
        throw error;
    }
}
export async function disconnectFromDatabase() {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
}
export default mongoose.connection;
