import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { sendingFriendRequest } from '../../redux/reducers/dashboard';
import { AppDispatch } from 'redux/store';
import { useDispatch } from 'react-redux';

interface SendFriendRequestModalProps {
    show: boolean;
    onHide: () => void;
    setActiveTabLink: (email: string) => void;
}

const SendFriendRequestModal: React.FC<SendFriendRequestModalProps> = ({ show, onHide, setActiveTabLink }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const onhandleClose = () => {
        setEmail('');
        setEmailError('');
        onHide()
    }

    const handleSendRequest = (email: string) => {

        if (!email.trim()) {
            setEmailError('Email address is required.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email address format.');
            return;
        }
        dispatch(sendingFriendRequest(email)).then((res) => {
            if (res.payload.success === true) {
                setEmail('');
                setEmailError('');
                onHide();
                setActiveTabLink('home')
            } else {
                setEmailError(res.payload.err.message);
            }
        })
    };


    return (
        <Modal show={show} onHide={onhandleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Send Friend Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError('');
                            }}
                            isInvalid={!!emailError}
                        />
                        <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onhandleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={() => handleSendRequest(email)}>
                    Send Request
                </Button>
            </Modal.Footer>
        </Modal>

    );
};

export default SendFriendRequestModal;
