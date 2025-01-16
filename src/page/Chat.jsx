import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
    const [connected, setConnected] = useState(false); // WebSocket 연결 상태
    const [messages, setMessages] = useState([]); // 메시지 목록
    const [message, setMessage] = useState(''); // 입력 메시지
    const [stompClient, setStompClient] = useState(null); // Stomp 클라이언트
    const { userName } = useParams();
    const decodeUserName = decodeURIComponent(userName); // URL에서 사용자 이름 디코딩

    useEffect(() => {
        const jwtToken = Cookies.get('JwtCookie');

        if (!jwtToken) {
            console.error('JWT 토큰이 없습니다. 연결할 수 없습니다.');
            return;
        }

        const socket = new SockJS('http://localhost:8080/ws/chat');
        const client = Stomp.over(socket);

        client.connect(
            { Authorization: `Bearer ${jwtToken}` },
            () => {
                console.log('WebSocket 연결 성공');
                setConnected(true);

                // 수신자 경로 구독
                client.subscribe(`/sub/chat/${decodeUserName}`, (response) => {
                    const newMessage = JSON.parse(response.body);
                    console.log('수신 메시지:', newMessage);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });

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
    }, [decodeUserName]);

    const sendMessage = () => {
        if (!message.trim()) return; // 빈 메시지 방지

        const chatDTO = {
            username: decodeUserName,
            message,
            sentAt: new Date().toISOString(),
            isFromAdmin: false, // 기본값으로 일반 사용자
        };

        const jwtToken = Cookies.get('JwtCookie');
        if (!jwtToken) {
            console.error('JWT 토큰이 없습니다.');
            return;
        }

        if (stompClient) {
            stompClient.send(
                `/pub/chat/${decodeUserName}`,
                { Authorization: `Bearer ${jwtToken}` },
                JSON.stringify(chatDTO)
            );

            // 내가 보낸 메시지를 바로 추가
            setMessages((prevMessages) => [...prevMessages, { ...chatDTO, isFromAdmin: false }]);
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            {connected ? <p>WebSocket 연결됨</p> : <p>WebSocket 연결 대기 중...</p>}

            <div>
                {messages.map((msg, index) => (
                    <p
                        key={index}
                        style={{
                            color: msg.isFromAdmin ? 'red' : 'black', // 관리자 메시지는 빨간색
                            fontWeight: msg.isFromAdmin ? 'bold' : 'normal',
                        }}
                    >
                        <strong>{msg.username}: </strong>{msg.message}
                    </p>
                ))}
            </div>

            <div>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
