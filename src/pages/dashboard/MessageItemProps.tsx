import React from 'react';
const image = require('/src/assets/avatar-placeholder.png')


interface MessageItemProps {
    text: string;
    isSender?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ text, isSender = false }) => {
    return (
        <>
            <div style={{ display: `${isSender ? 'contents' : 'flex'}` }} className='align-items-center'>

                <div className={`mask-group ${isSender ? 'd-none' : 'd-flex'}`}>
                    <div className="ellipse">
                        <img
                            src={image.default}
                            alt="Profile"
                            className="profile-image"
                            style={{ 'height': '41px' }}
                        />
                    </div>
                </div>
                <div className={`message-item ${isSender ? 'sender' : 'receiver'}`}>
                    {text}
                </div>
            </div>
        </>
    );
};

export default MessageItem;
