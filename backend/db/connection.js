import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(`mongodb+srv://geetanshkhurana2:${process.env.PASSWORD}@cluster0.r3vsoti.mongodb.net/`);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;