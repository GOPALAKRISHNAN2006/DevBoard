import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');

    // Clean up legacy unique index on user field in resumes collection
    try {
      const collection = mongoose.connection.collection('resumes');
      const indexes = await collection.indexes();
      const userIndex = indexes.find((idx) => idx.name === 'user_1');
      if (userIndex && userIndex.unique) {
        await collection.dropIndex('user_1');
        console.log('Dropped legacy unique user_1 index on resumes collection');
      }
    } catch (e) {
      // Ignore if collection doesn't exist yet
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;