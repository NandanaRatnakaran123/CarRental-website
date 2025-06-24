import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(process.env.connection_string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(" MongoDB Connected");
  } catch (err) {
    console.error(" MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
