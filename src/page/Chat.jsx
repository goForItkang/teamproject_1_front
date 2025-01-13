import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";

const Chat = () => {
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(''); // 새로운 메시지를 위한 상태 추가
    const [stompClient, setStompClient] = useState(null); // stompClient 상태 추가
    const {userName}=  useParams();
    const decodeUserName = decodeURIComponent(userName);
    useEffect(() => {
        const jwtToken = Cookies.get('JwtCookie');

        if (!jwtToken) {
            console.error('JWT 토큰이 없습니다. 연결할 수 없습니다.');
            return;
        }

        const socket = new SockJS('http://localhost:8080/ws/chat');
        const client = Stomp.over(socket);

        // WebSocket 연결 시 Authorization 헤더에 JWT 토큰 추가
        client.connect(
            { Authorization: `Bearer ${jwtToken}` },
            () => {
                console.log('WebSocket 연결 성공');
                setConnected(true);
                // console.log("userName확인 부분",decodeUserName); checking*
                // 채팅 주소 /sub/chat/1
                client.subscribe(`/sub/chat/${decodeUserName}`, (response) => {
                    const newMessage = response.body;
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                    console.log('WebSocket 메시지:', newMessage);
                });

                // stompClient 저장
                setStompClient(client);
            },
            (error) => {
                console.error('WebSocket 연결 실패:', error);
            }
        );

        return () => {
            if (client) {
                client.disconnect(() => {
                    console.log('WebSocket 연결 종료');
                    setConnected(false);
                });
            }
        };
    }, []);

    const sendMessage = () => {
        if (!message.trim()) return; // 빈 메시지 방지
        const chatDTO = {
            userId: "", // 예시로 1로 설정, 실제로는 로그인한 사용자 ID를 사용
            message: message,
            sentAt: new Date().toISOString(),
        };

        const jwtToken = Cookies.get('JwtCookie');
        if (!jwtToken) {
            console.error('JWT 토큰이 없습니다.');
            return;
        }

        if (stompClient) {
            // 메시지 전송 시에도 Authorization 헤더에 JWT 토큰을 추가
            stompClient.send(
                '/pub/chat/message',
                { Authorization: `Bearer ${jwtToken}` }, // JWT 토큰 포함
                JSON.stringify(chatDTO)
            );
            setMessage(''); // 메시지 전송 후 입력창 초기화
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            {connected ? (
                <p>WebSocket 연결됨</p>
            ) : (
                <p>WebSocket 연결 대기 중...</p>
            )}
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <div>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} // 입력값 상태 업데이트
                    placeholder="메시지를 입력하세요"
                    rows="3"
                    style={{ width: '100%' }}
                />
                <button onClick={sendMessage}>보내기</button>
            </div>
        </div>
    );
};

export default Chat;