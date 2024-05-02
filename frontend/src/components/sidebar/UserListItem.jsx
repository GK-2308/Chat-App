// UI Component
import { useSocketContext } from "../../context/SocketContext";

const UserListItem = ({ user }) => {
    const { sendMessage } = useSocketContext();

    const handleSendMessage = () => {
        // Call sendMessage function to send message to the user
        sendMessage("Hello!", user._id);
    };

    return (
        <div>
            <span>{user.fullName}</span>
            <span>Status: {user.status}</span> {/* Display user status */}
            <button onClick={handleSendMessage} disabled={user.status === "busy"}>
                Send Message
            </button> {/* Disable button if user is busy */}
        </div>
    );
};

export default UserListItem;
