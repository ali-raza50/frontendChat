import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DesktopItem from './DesktopItem';
import useRoutes from './useRoutes';
import { Button, Col, Row, } from 'react-bootstrap';
import { BsEmojiSmile } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
const image = require('/src/assets/avatar-placeholder.png')
const imageVideo = require('/src/assets/video-call.png')
const imageSchedule = require('/src/assets/schedule.png')
import { BsSearch } from "react-icons/bs";
import ChatListItem from './ChatListItem';
import CallListItem from './CallListItem';
import MessageItem from './MessageItemProps';
import ContactListItem from './ContactListItem';
import SendFriendRequestModal from '../Modals/SendFriendRequestModal';
import { acceptingRequest, getAllContacts, getAllRequest, rejectingRequest } from '../../redux/reducers/dashboard';
import { AppDispatch, RootState } from 'redux/store';


const Main: React.FC = () => {
  const { routes, activeTabLink, setActiveTabLink } = useRoutes();
  const { name, email } = useSelector((state: RootState) => state.auth);
  const { requests, contacts } = useSelector((state: RootState) => state.dashboard);

  const [activeTab, setActivetab] = useState('all-chats');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleMessageButton = (tab: string) => {
    setActivetab(tab);
    if (tab === 'all-chats') {
      dispatch(getAllContacts());
    } else if (tab === 'contacts') {
      dispatch(getAllRequest());
      dispatch(getAllContacts());
    }
  }
  const handleAcceptRequest = (requestId: string) => {
    dispatch(acceptingRequest(requestId)).then((res) => {
      if (res.payload.success === true) {
        dispatch(getAllRequest());
        dispatch(getAllContacts());
      }
    })
  }

  const handleRejectRequest = (requestId: string) => {
    dispatch(rejectingRequest(requestId)).then((res) => {
      if (res.payload.success === true) {
        dispatch(getAllRequest());
        dispatch(getAllContacts());
      }
    })
  }

  useEffect(() => {
    dispatch(getAllContacts());
    dispatch(getAllRequest());
  }, []);

  useEffect(() => {
    if (activeTabLink === 'addFriend') {
      setShowModal(true);
    }
  }, [activeTabLink]);

  const friendRequests = [
    {
      id: 1,
      sender: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
    },
    {
      id: 2,
      sender: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
    },
    {
      id: 3,
      sender: {
        name: 'Michael Johnson',
        email: 'michael.johnson@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
    },
  ];

  const dummyData = [
    {
      id: 1,
      imageSrc: 'https://randomuser.me/api/portraits/men/1.jpg',
      chatTitle: 'Figma Teams',
      status: 'Typing...',
    },
    {
      id: 2,
      imageSrc: 'https://randomuser.me/api/portraits/men/3.jpg',
      chatTitle: 'Design Squad',
      status: 'Online',
    },
    {
      id: 3,
      imageSrc: 'https://randomuser.me/api/portraits/men/1.jpg',
      chatTitle: 'Test example',
      status: 'Online',
    },
  ];

  const dummyDataCalls = [
    {
      id: 1,
      imageSrc: 'https://randomuser.me/api/portraits/men/5.jpg',
      chatTitle: 'john Wick',
      status: 'Taking...',
    },
    {
      id: 2,
      imageSrc: 'https://randomuser.me/api/portraits/men/3.jpg',
      chatTitle: 'Cafia Squad',
      status: 'Today',
    },
    {
      id: 3,
      imageSrc: 'https://randomuser.me/api/portraits/men/4.jpg',
      chatTitle: 'Angila',
      status: 'Yesterday',
    },
    {
      id: 4,
      chatTitle: 'Canak',
      status: 'Yesterday',
      imageSrc: 'https://randomuser.me/api/portraits/men/6.jpg',
    },
    {
      id: 5,
      chatTitle: 'Dum',
      status: 'Yesterday',
      imageSrc: 'https://randomuser.me/api/portraits/men/6.jpg',
    },
  ];

  const messages = [
    { text: 'Hello!', isSender: true },
    { text: 'Hi there!', isSender: false },
    { text: 'How are you?', isSender: true },
    { text: 'I am good, thanks!', isSender: false },
    { text: 'What have you been up to lately?', isSender: true },
    { text: 'Just working on some new projects. How about you?', isSender: false },
    { text: 'Same here. Trying to finish up some deadlines.', isSender: true },
    { text: 'That sounds hectic. Hope you get some rest too.', isSender: false },
    { text: 'Thanks! Will do. Have you watched any good movies recently?', isSender: true },
    { text: 'Yes, I watched the new superhero movie. It was fantastic!', isSender: false },
    { text: 'Oh, I need to catch up on that. Everyone’s talking about it.', isSender: true },
    { text: 'You definitely should. It’s worth the watch.', isSender: false },
    { text: 'Will add it to my list for this weekend.', isSender: true },
    { text: 'Great! Let me know how you like it.', isSender: false },
    { text: 'Will do. Thanks for the recommendation!', isSender: true },
    { text: 'Anytime! Talk to you later.', isSender: false },
    { text: 'Sure, take care!', isSender: true },
    { text: 'You too!', isSender: false },
  ];


  return (
    <>
      <Row className='min-vh-100 g-0'>
        <Col lg={1} sm={2} xl={1} className="main-sidebar p-0 d-flex flex-column" style={{ width: '85px' }}>
          <nav className="mt-4 flex-grow-1 d-flex justify-content-around flex-column">
            <ul className="d-flex flex-column align-items-center  list-unstyled mb-0 w-100">
              {routes.map((item: any, index: number) => (
                <DesktopItem
                  key={index}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={item.active}
                  onClick={item.onClick}
                />
              ))}
            </ul>
            <div className="profile-imae d-flex justify-content-center align-items-center">
              <img src={'https://randomuser.me/api/portraits/men/4.jpg'} alt="User Image" style={{ width: '50%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </div>
          </nav>
        </Col>
        <Col lg={4} sm={4} xl={3} className='main-container-chat'>
          <div className="custom-container">
            <div className="custom-button">
              <div className="search-bar">
                <div className="search-input mt-2">
                  <BsSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
            <h3 className='message-title mt-3'>Message</h3>
            <div className='px-2'>

              <div className="capsule-button-group d-flex justify-content-between align-items-center">
                <Button variant={activeTab === 'all-chats' ? 'dark' : 'light'} onClick={() => handleMessageButton('all-chats')} className="capsule-button position-relative">
                  {'All Chats'}
                </Button>
                <Button variant={activeTab === 'groups' ? 'dark' : 'light'} onClick={() => handleMessageButton('groups')} className="capsule-button position-relative">
                  {'Groups'}
                </Button>
                <Button variant={activeTab === 'contacts' ? 'dark' : 'light'} onClick={() => handleMessageButton('contacts')} className="capsule-button position-relative">
                  {'Contacts'}
                  {
                    requests?.receivedRequests?.length > 0 && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"
                        className="message-status-indicator d-flex justify-content-center align-items-center"
                      >
                        <circle cx="9" cy="9" r="9" fill="#00FF38" />
                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#000" fontSize="10">
                          {requests.receivedRequests.length}
                        </text>
                      </svg>
                    )
                  }
                </Button>
              </div>
            </div>
            <div className='d-flex scrollable-div flex-column align-items-center overflow-scroll-chats-list pt-2'>
              {
                activeTab === 'contacts' && (
                  requests?.receivedRequests?.map((request: any) => (
                    <ContactListItem
                      key={request?._id}
                      requestId={request?._id}
                      imageSrc={"https://randomuser.me/api/portraits/men/3.jpg"}
                      name={request?.sender?.name}
                      email={request?.sender?.email}
                      handleAcceptRequest={handleAcceptRequest}
                      handleRejectRequest={handleRejectRequest}
                      status='pending'
                    />
                  )))
              }
              {
                activeTab === 'contacts' && (
                  contacts?.map((item: any) => (
                    <ContactListItem
                      key={item?.contact?._id}
                      requestId={item?._id}
                      imageSrc={"https://randomuser.me/api/portraits/men/3.jpg"}
                      name={item?.contact?.name}
                      email={item?.contact?.email}
                      handleAcceptRequest={handleAcceptRequest}
                      handleRejectRequest={handleRejectRequest}
                    />
                  )))
              }
              {
                activeTab === 'all-chats' && (
                  contacts?.map((item: any, index: number) => (
                    <ChatListItem
                      key={item.contact._id}
                      imageSrc={"https://randomuser.me/api/portraits/men/3.jpg"}
                      chatTitle={item.contact.name}
                      status={dummyData[index]?.status}
                    />
                  ))
                )
              }
              {/* {
                  activeTab === 'all-chats' && (
                    dummyData?.map((item) => (
                      <ChatListItem
                        key={item.id}
                        imageSrc={item.imageSrc}
                        chatTitle={item.chatTitle}
                        status={item.status}
                      />
                    ))
                  )
                } */}
            </div>
          </div>
          <div className="second-div">
            <div className='d-flex justify-content-between align-items-center my-2 px-2'>
              <div className="calls">Calls</div>
              <div className="new-meet d-flex justify-content-between align-items-center gap-1">
                <IoMdAddCircleOutline size={22} />
                New Meet
              </div>
            </div>
            <div className='d-flex flex-column align-items-center overflow-scroll-call-list scrollable-div pt-2'>
              {dummyDataCalls?.map((item, index) => (
                <CallListItem
                  key={item.id}
                  imageSrc={item.imageSrc}
                  chatTitle={item.chatTitle}
                  status={item.status}
                />
              ))}
            </div>
          </div>
        </Col>
        <Col lg={7} sm={6} xl={8} className='main-chat p-0 d-flex flex-column' style={{ marginLeft: 'auto' }}>
          {/* <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 h-full d-flex justify-content-center align-items-center bg-gray-100 dark:bg-dusk">
            <div className="text-center d-flex flex-column">
              <h4 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-200"><strong>Select a chat or start a new conversation</strong></h4>
            </div>
          </div> */}

          <div className='d-flex justify-content-center align-items-center'>
            <div className="single-chat-item position-relative">
              <div className="mask-group">
                <div className="ellipse">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="status-indicator">
                    <circle cx="7.5" cy="7.5" r="7.5" fill="#00FF38" />
                  </svg>
                  <img
                    src={'https://randomuser.me/api/portraits/men/4.jpg'}
                    alt="Profile"
                    className="profile-image"
                  />
                </div>
              </div>
              <div className="chat-content">
                <div className="chat-title mb-1">{name}</div>
                <div className="chat-status" style={{ 'color': "rgba(33, 255, 95, 0.93)" }}>Online</div>
              </div>
              <div className='d-flex justify-content-center align-items-center gap-2'>
                <img
                  src={imageVideo.default}
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
          </div>
          <div className='chat-time'>
            Today, 9:30 am
          </div>
          <div className="message-list scrollable-div">
            {messages.map((message, index) => (
              <MessageItem key={index} text={message.text} isSender={message.isSender} />
            ))}
          </div>
          <div className='d-flex justify-content-center align-items-end gap-1 pe-2 mb-2' style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
            <div className="search-input-send px-2">
              <BsEmojiSmile size={24} className='search-icon-send' />
              <input
                type="text"
                placeholder="Message..."
              />
              <GrAttachment />
              <img
                src={imageVideo.default}
                alt="Video call"
                height={22}
                width={22}
              />
            </div>
            <div className='ellipsis-icon-container'>
              <IoSend size={18} color="#000" />
            </div>
          </div>
        </Col>
      </Row>

      <div>
        <SendFriendRequestModal show={showModal} onHide={() => setShowModal(false)} setActiveTabLink={setActiveTabLink} />
      </div>

    </>
  );
};

export default Main;
