import React from 'react';
const image = require('/src/assets/video-call.png')
const imageSchedule = require('/src/assets/schedule.png')


interface CallListItemProps {
    imageSrc: string;
    chatTitle: string;
    status: string;
    key: number;
}

const CallListItem: React.FC<CallListItemProps> = ({ imageSrc, chatTitle, status, key }) => {

    return (
        <div className="chat-list-item position-relative">
            <div className="mask-group">
                <div className="ellipse">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="status-indicator">
                        <circle cx="7.5" cy="7.5" r="7.5" fill="#00FF38" />
                    </svg>
                    <img
                        src={imageSrc}
                        alt="Profile"
                        className="profile-image"
                    />
                </div>
            </div>
            <div className="chat-content">
                <div className="chat-title mb-1">{chatTitle}</div>

                <div className="chat-status" style={{ 'color': `${status === 'Typing...' ? 'rgba(33, 255, 95, 0.93)' : '#767876'}` }}>{status}</div>
            </div>
            <div className='d-flex justify-content-center align-items-center gap-2'>
                <img
                    src={image.default}
                    alt="Video call"
                    height={22}
                    width={22}
                />
                <img
                    src={imageSchedule.default}
                    alt="Schedule"
                    height={24}
                    width={24}
                />
            </div>
        </div>
    );
};

export default CallListItem;
