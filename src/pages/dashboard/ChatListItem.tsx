import React from 'react';
import { BsPinAngleFill } from "react-icons/bs";



interface ChatListItemProps {
    imageSrc: string;
    chatTitle: string;
    status: string;
    key: number;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ imageSrc, chatTitle, status, key }) => {
    return (
        <div className="chat-list-item position-relative">
            {
                status === 'Typing...' && (
                    <BsPinAngleFill size={20} className="chat-pin-icon" />
                )
            }
            <div className="mask-group">
                <div className="ellipse">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="status-indicator">
                        <circle cx="7.5" cy="7.5" r="7.5" fill="#00FF38" />
                    </svg>
                    <img
                        src={imageSrc}
                        alt="Profile"
                        className="profile-image"
                        onError={(e) => {
                            e.currentTarget.src = 'path-to-fallback-image.jpg'; // Fallback image path
                            console.error('Failed to load image:', imageSrc); // Debugging
                        }}
                    />
                </div>
            </div>
            <div className="chat-content">
                <div className="chat-title mb-1">{chatTitle}</div>

                <div className="chat-status" style={{ 'color': `${status === 'Typing...' ? 'rgba(33, 255, 95, 0.93)' : '#767876'}` }}>{status}</div>
            </div>
            {
                status === 'Typing...' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        className="chat-status-indicator d-flex justify-content-center align-items-center"
                    >
                        <circle cx="12" cy="12" r="12" fill="#00FF38" />
                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#000" fontSize="12">
                            3
                        </text>
                    </svg>

                )
            }
        </div>
    );
};

export default ChatListItem;
