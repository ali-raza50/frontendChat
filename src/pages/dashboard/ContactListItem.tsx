import React from 'react';
import { Button } from 'react-bootstrap';
import { MdCheck, MdClose } from 'react-icons/md';

interface ContactListItemProps {
    imageSrc: string;
    name: string;
    status?: string;
    email: string;
    key: string;
    requestId: string;
    handleAcceptRequest: (requestId: string) => void;
    handleRejectRequest: (requestId: string) => void;
}

const ContactListItem: React.FC<ContactListItemProps> = ({ imageSrc, name, email, requestId, handleAcceptRequest, handleRejectRequest }) => {
    return (
        <div className="chat-list-item position-relative">
            <div className="mask-group">
                <div className="ellipse">
                    <img
                        src={imageSrc}
                        alt="Profile"
                        className="profile-image"
                    />
                </div>
            </div>
            <div className="chat-content">
                <div className="chat-title mb-1">{name}</div>

                <div className="chat-status" style={{ 'color': '#767876' }}>{email}</div>
            </div>
            <div className="d-flex gap-1 action-buttons">
                <Button
                    onClick={() => handleAcceptRequest(requestId)}
                    variant="success"
                    className="p-1 text-sm font-medium rounded-circle"
                >
                    <MdCheck size={20} />
                </Button>
                <Button
                    onClick={() => handleRejectRequest(requestId)}
                    variant="danger"
                    className="p-1 text-sm font-medium rounded-circle"
                >
                    <MdClose size={20} />
                </Button>
            </div>
        </div>
    );
};

export default ContactListItem;
