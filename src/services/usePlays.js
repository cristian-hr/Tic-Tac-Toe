import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://192.168.1.112:4000";

const useChat = (roomId) => {

    const [play, setPlay] = useState({turn: "X", plays:[]});
    const socketRef = useRef();

    useEffect(() => {        

        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId },
        });

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            setPlay(message);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);
    
    const sendPlay = (messageBody) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, messageBody);
    };

    return { play, sendPlay };
};

export default useChat;