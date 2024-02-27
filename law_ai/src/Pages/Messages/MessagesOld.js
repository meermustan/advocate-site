import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { useCookies } from "react-cookie";
import HerosectionHeader from '../../Componet/Herosection/HerosectionHeader';
import LargeSpinner from '../../Componet/Spinners/LargeSpinner';
import Talk from 'talkjs';
import { toast } from "react-toastify";
const toastConfig = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

const MessagesTalk = () => {
    const { state } = useLocation();
    const [authState] = useCookies(["myAuthUser"]);
    const [loading, setLoading] = useState(true);
    const api_url = process.env.REACT_APP_API_URL;
    const inboxEl = useRef();

    // wait for TalkJS to load
    const [talkLoaded, markTalkLoaded] = useState(false);

    useEffect(() => {
        if (!state) {
            Talk.ready.then(() => {
                markTalkLoaded(true);
                setLoading(false);
            });
        } else {
            Talk.ready.then(() => {
                setLoading(false);
                addNew(state);
            });
        }
    }, []);

    useEffect(() => {
        if (talkLoaded) {
            loadChats();
            // return () => session.destroy();
        }
    }, [talkLoaded]);

    const loadChats = async () => {
        const result = await fetch(`${api_url}/user`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${authState.myAuthUser.token}`,
                'Content-Type': 'application/json'
            }
        });
        const response = await result.json();
        if (result.status === 200) {
            const currentUser = new Talk.User({
                id: response.user._id,
                name: response.user.name,
                email: response.user.email,
                photoUrl: response.user.photoUrl,
                welcomeMessage: 'Hello!',
                role: 'default',
            });
            const otherUser = new Talk.User({
                id: '12',
                name: 'Jessica Wells',
                email: 'jessicawells@example.com',
                photoUrl: 'jessica.jpeg',
                welcomeMessage: 'Hello!',
                role: 'default',
            });

            const session = new Talk.Session({
                appId: 't1FDa44u',
                me: currentUser,
            });

            const conversationId = Talk.oneOnOneId(currentUser, otherUser);
            const conversation = session.getOrCreateConversation(conversationId);
            conversation.setParticipant(currentUser);
            conversation.setParticipant(otherUser);

            const inbox = session.createInbox();
            inbox.select(conversation);
            inbox.mount(inboxEl.current);
        } else {
            toast.error(response.resultMessage.en, toastConfig);
        }
    }

    const addNew = async (profile) => {
        const result = await fetch(`${api_url}/user`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${authState.myAuthUser.token}`,
                'Content-Type': 'application/json'
            }
        });
        const response = await result.json();
        if (result.status === 200) {
            const currentUser = new Talk.User({
                id: response.user._id,
                name: response.user.name,
                email: response.user.email,
                photoUrl: response.user.photoUrl,
                welcomeMessage: 'Hello!',
                role: 'default',
            });
            const otherUser = new Talk.User({
                id: profile._id,
                name: profile.name,
                email: profile.email,
                photoUrl: profile.photoUrl,
                welcomeMessage: 'Hello!',
                role: 'default',
            });
            const session = new Talk.Session({
                appId: 't1FDa44u',
                me: currentUser,
            });
            const conversationId = Talk.oneOnOneId(currentUser, otherUser);
            const conversation = session.getOrCreateConversation(conversationId);
            conversation.setParticipant(currentUser);
            conversation.setParticipant(otherUser);
            const inbox = session.createInbox();
            // inbox.messageField.setText("Hey, is this item still available?");
            inbox.select(conversation);
            inbox.mount(inboxEl.current);
        } else {
            toast.error(response.resultMessage.en, toastConfig);
        }
    }

    return (
        <>
            <HerosectionHeader name={"Messages"} />
            {/* <button onClick={addNew}>
                add New Chat
            </button> */}
            <div className="page-content">
                {loading ?
                    <div className='row text-center my-5 py-5'>
                        <LargeSpinner />
                    </div>
                    :
                    <div style={{ height: '400px' }} ref={inboxEl} />
                }
            </div >
        </>
    )

}
export default MessagesTalk