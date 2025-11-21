import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import './chat.css';
import message from "sockjs-client/lib/transport/lib/buffered-sender";


const Chat = () => {
    // user : 현재 로그인한 사용자 정보(이름, 이메일 등)
    // isAuthenticated : 로그인 여부(true/false)
    const{user, isAuthenticated }  = useAuth();
    // 페이지 이동시키는 함수 로 로그인 페이지 이동 처리
    const navigate = useNavigate();
    // messages        : 채팅 메세지 목록 채팅방의 모든 메세지들을 저장하는 배열
    // setMessages     : 메세지 값을 변경하는 함수
    const [messages, setMessages] = useState([]);
    // messageInput    : 사용자가 입력하고 있는 메세지 내용
    // setMessageInput : 입력값을 업데이트하는 함수
    // 입력창에 타이핑할 때 마다 값이 변경됨
    const [messageInput, setMessageInput] = useState("");
    // WebSocket 연결 객체
    // 서버와 실시간 통신을 담당
    // 메세지를 보내고 받는 역할
    const [stompClient, setStompClient] = useState(null);
    // 서버와 연결되어있는지 확인 true/false 로 연결 상태 확인
    const [isConnected, setIsConnected] = useState(false);
    // 현재 채팅방에 있는 사용자들의 목록
    // 사이드바에 참여자 리스트로 표시됨
    const [users, setUsers] = useState([]);
    // 채팅 메세지 맨 아래 위치를 가리키는 참조
    // 새로운 메세지가 오면 자동으로 스크롤을 맨 아래로 이동시킬 때 사용
    const messagesEndRef = useRef(null);
    // 채팅방 전체
    // 채팅 메세지 박스 전체를 가리키는 참조
    // 스크롤 위치 제어나 DOM 조작이 필요할 때 사용
    const chatBoxRef = useRef(null);

    // 채팅하기 전에 로그인 상태를 확인하고, 로그인이 되어 있으면  채팅참여 가능하도록 설정
    useEffect(() => {
        if(!isAuthenticated){
            alert("로그인 후 채팅에 참여가능합니다.");
            navigate("/login");
        }
    },[isAuthenticated, navigate]);

    // 스크롤을 맨 아래로 이동시키고 현재 이동한 스크롤 위치를 유지
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }

    //스크롤 위치의 경우 메세지를 보내거나 메세지가 올 때 마다 맨 아래 유지
    // messages 메세지통의 변화가 있을 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    // webSocket 연결
    useEffect(() => {
        if(!isAuthenticated || !user) return;

        const socket = new SockJS('http://localhost:8085/ws');
        const client = new Client({
            webSocketFactory : () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("채팅 서버 연결 성공");
                setIsConnected(true);
                client.subscribe("/topic/public", (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    setMessages((prev) => [...prev, {
                        id: Date.now() + Math.random() , ...receivedMessage
                    }]);
                    if(receivedMessage.type === "JOIN") {
                        setUsers( (p) => [...new Set([...p,receivedMessage.sender])]);
                    } else if(receivedMessage.type === "LEAVE") {
                        setUsers( (p) => p.filter( u => u !== receivedMessage.sender));
                    }
                });
                client.publish({
                    destination : '/app/chat.addUser',
                    body : JSON.stringify({
                        sender : user.memberName || user.memberEmail,
                        type:'JOIN'
                    })
                });
            },
            onStompError : (error) =>{
                console.log("STOMP 오류 : ", error);
                setIsConnected(false);
            },
            onDisconnect: () => {
                console.log("채팅 서버 연결 해제");
                setIsConnected(false);
            }
        });
        client.activate();
        setStompClient(client);

        // 컴포넌트 언마운트 시 연결 해제
        return () => {
            if(client.connected){
                client.publish({
                    destination : '/app/chat.sendMessage',
                    body : JSON.stringify({
                        sender : user.memberName || user.memberEmail,
                        content : '',
                        type:'LEAVE'
                    })
                });
            }
            client.deactivate();
        };
    },[isAuthenticated, user]);

    // 메세지 전송
    const sendMessage = (e) => {
        e.preventDefault();

        if(!messageInput.trim()) {
            alert('메세지를 입력하세요.');
            return;
        }

        const chatMessage = {
            sender : user.memberName || user.memberEmail,
            content : messageInput,
            type:'CHAT'
        };
        stompClient.publish({
            destination : '/app/chat.sendMessage',
            body : JSON.stringify(chatMessage)
        });
        setMessageInput(''); // 메세지를 전송하고나서 input 창 비우기
    };


    // 메세지 타입에 따른 렌더링
    const renderMessage = (msg) => {
        if(msg.type === "JOIN"){
            return (
                <div key={msg.id} className="system-message">
                    <span> {msg.sender} 님이 입장하셨습니다.</span>
                </div>
            );
        }
        if(msg.type === "LEAVE"){
            return (
                <div key={msg.id} className="system-message">
                    <span> {msg.sender} 님이 퇴장하셨습니다.</span>
                </div>
            );
        }

        const isMyMessage = msg.sender === (user.memberName || user.memberEmail);

        return (
            <div key={msg.id}
                 className={`message 
                 ${isMyMessage ?
                     'my-message':
                     'other-message'
                 }`
                 }>
                {!isMyMessage &&
                    <div className="message-sender">
                        {msg.sender}
                    </div>}
                <div className="message-content">
                    {msg.content}
                </div>
                <div className="message-time">
                    {msg.timeStamp}
                </div>
            </div>
        );
    };
    if(!isAuthenticated){
        return null;
    }


    return (
        <div className="page-container">
            <div className="chat-container">
                <div className="chat-header">
                    <h2>실시간 채팅</h2>
                    <div className="connection-status">
                        {isConnected ? (
                            <span className="status-connected">연결되었습니다.</span>
                        ):(
                            <span className="status-disconnected">연결되지 않았습니다.</span>
                        )}
                    </div>
                </div>
                <div className="chat-content">
                    <div className="chat-sidebar">
                        <h3>참여자 ({users.length})</h3>
                        <ul className="user-list">
                            {users.map((username, index) => (
                                <li key={index} className="user-item">
                                    <span className="user-status">🟢</span>
                                    {username}
                                    {username ===(user.memberName || user.memberEmail) &&
                                        <span className="me-badge">(나)</span>
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="chat-main">
                        <div
                            className="chat-messages"
                            ref={chatBoxRef}>
                            {messages.length === 0 ? (
                                <div className="no-messages">
                                    메세지가 없습니다. 첫 메세지를 보내보세요.
                                </div>
                            ) :(
                                messages.map((message, index) => renderMessage(message))
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={sendMessage} className="chat-input-form">
                            <input
                                type="text"
                                value={messageInput}
                                onChange={
                                    (e) =>
                                        setMessageInput(e.target.value)}
                                placeholder="메세지를 입력하세요."
                                className="chat-input"
                                disabled={!isConnected}
                            />
                            <button
                                type="submit"
                                className="chat-send-btn"
                                disabled={!isConnected || !messageInput.trim()}>
                                전송
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Chat;