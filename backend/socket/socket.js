import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", async (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId !== undefined) userSocketMap[userId] = socket.id;

	// Update user's online status to 'AVAILABLE' when they connect
    await User.findByIdAndUpdate(userId, { onlineStatus: 'AVAILABLE' });
    
    // Broadcast online status change to all clients
    io.emit("userStatusChanged", { userId, onlineStatus: 'AVAILABLE' });

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));


	socket.on("disconnect", async () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		
		// Update user's online status to 'OFFLINE' when they disconnect
		await User.findByIdAndUpdate(userId, { onlineStatus: 'OFFLINE' });
		
		// Broadcast online status change to all clients
		io.emit("userStatusChanged", { userId, onlineStatus: 'OFFLINE' });
		
		// Emit updated online users to all clients
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	  });
});

export { app, io, server };