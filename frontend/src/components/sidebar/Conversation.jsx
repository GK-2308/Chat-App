import { useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    // State to track the availability status
    const [isAvailable, setIsAvailable] = useState(true);

    // Toggle availability status
    const toggleAvailability = () => {
        setIsAvailable(!isAvailable);
    };

    return (
        <>
            <div
                className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
                    ${selectedConversation === conversation ? "bg-sky-500" : ""}
                `}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className='w-12 rounded-full'>
                        <img src={conversation.profilePic} alt='user avatar' />
                    </div>
                    {isOnline && <div className="online-dot"></div>}
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                        <span className='text-xl'>{emoji}</span>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}

            {/* Available and Busy buttons */}
            <div className="flex justify-end mt-2">
                <button
                    className={`btn ${isAvailable ? "btn-success" : "btn-secondary"}`}
                    onClick={toggleAvailability}
                >
                    {isAvailable ? "Available" : "Busy"}
                </button>
            </div>
        </>
    );
};

export default Conversation;
