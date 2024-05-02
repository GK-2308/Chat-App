import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
        if (authUser) {
            const socket = io("https://chat-app-yt.onrender.com", {
                query: {
                    userId: authUser._id,
                },
            });

            setSocket(socket);

            // Emit user's status when it changes
            const handleStatusChange = (status) => {
                socket.emit('statusChange', status);
            };

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            // Listen for status updates of other users
            socket.on('statusChange', (status) => {
                // Update onlineUsers with the new status
                setOnlineUsers(prevUsers => prevUsers.map(user => {
                    if (user._id === status.userId) {
                        return { ...user, status: status.status };
                    }
                    return user;
                }));
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);
	// Function to prevent sending messages to users with 'busy' status
    const sendMessage = (message, recipientId) => {
        if (onlineUsers.find(user => user._id === recipientId && user.status === 'busy')) {
            // User is busy, handle accordingly (e.g., display a message or notification)
            console.log("User is busy. Message not sent.");
            return;
        }

        // Send message if recipient is not busy
        // Code to send message via socket
    };


	return <SocketContext.Provider value={{ socket, onlineUsers,sendMessage }}>{children}</SocketContext.Provider>;
};