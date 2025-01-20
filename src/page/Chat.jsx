import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const Chat = () => {
    const [connected, setConnected] = useState(false); // WebSocket 연결 여부
    const [messages, setMessages] = useState([]); // 메시지 목록
    const [message, setMessage] = useState(''); // 입력 메시지
    const [stompClient, setStompClient] = useState(null); // STOMP 클라이언트
    const { userName } = useParams(); // URL에서 사용자 이름 가져오기
    const decodeUserName = decodeURIComponent(userName); // 디코딩된 사용자 이름
    const messageEndRef = useRef(null); // 메시지 자동 스크롤

    // localStorage에서 role 정보 가져오기
    const role = localStorage.getItem('role');  // [ROLE_USER] 또는 [ROLE_ADMIN]

    useEffect(() => {
        const jwtToken = Cookies.get('JwtCookie'); // JWT 토큰 가져오기

        axios
            .get(`http://localhost:8080/api/chat/${decodeUserName}`, {
                headers: { Authorization: `Bearer ${jwtToken}` },
            })
            .then((res) => {
                const history = res.data.map((msg) => ({
                    ...msg,
                }));

                // 기존 메시지와 새로 받은 메시지가 중복되지 않도록 처리
                setMessages((prevMessages) => {
                    const newMessages = history.filter(
                        (msg) => !prevMessages.some(
                            (existingMsg) => existingMsg.sentAt === msg.sentAt
                        )
                    );
                    return [...prevMessages, ...newMessages].sort(
                        (a, b) => new Date(a.sentAt) - new Date(b.sentAt)
                    );
                });
            })
            .catch((err) => {
                console.error('채팅 기록 로드 실패:', err);
            });
    }, [decodeUserName]);

    useEffect(() => {
        const jwtToken = Cookies.get('JwtCookie');

        if (!jwtToken) {
            console.error('JWT 토큰이 없습니다. 연결할 수 없습니다.');
            return;
        }

        const socket = new SockJS('http://localhost:8080/ws/chat'); // SockJS 연결
        const client = Stomp.over(socket);

        client.connect(
            { Authorization: `Bearer ${jwtToken}` },
            () => {
                setConnected(true);

                client.subscribe(`/sub/chat/${decodeUserName}`, (response) => {
                    const receivedMessage = JSON.parse(response.body);
                    // 화면에 표시할 메시지 추가
                    setMessages((prev) => {
                        // 본인이 보낸 메시지는 추가하지 않음
                        if (receivedMessage.sender !== Cookies.get('username')) {
                            // 새로운 메시지가 이미 존재하는지 체크
                            const exists = prev.some(
                                (msg) =>
                                    msg.sender === receivedMessage.sender &&
                                    msg.message === receivedMessage.message &&
                                    msg.sentAt === receivedMessage.sentAt
                            );
                            if (!exists) {
                                return [...prev, receivedMessage].sort(
                                    (a, b) => new Date(a.sentAt) - new Date(b.sentAt)
                                );
                            }
                        }
                        return prev;
                    });
                });

                setStompClient(client); // STOMP 클라이언트 설정
            },
            (error) => {
                console.error('WebSocket 연결 실패:', error);
            }
        );

        return () => {
            if (client) {
                client.disconnect(() => {
                    setConnected(false);
                });
            }
        };
    }, [decodeUserName]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (!message.trim()) return;

        const jwtToken = Cookies.get('JwtCookie');
        const currentUserName = Cookies.get('username');

        const chatDTO = {
            sender: currentUserName,
            message,
            sentAt: new Date().toISOString(),
            fromAdmin: role === '[ROLE_ADMIN]',  // 관리자일 경우 true
        };

        if (stompClient) {
            // 서버로 메시지 전송 (화면에 표시하지 않음)
            stompClient.send(
                `/pub/chat/${decodeUserName}`,
                { Authorization: `Bearer ${jwtToken}` },
                JSON.stringify(chatDTO)
            );

            setMessage(''); // 메시지 입력창 비우기
        }
    };

    return (
        <div>
            <h2>채팅</h2>
            <div style={{ height: '400px', overflowY: 'auto' }}>
                {messages.map((msg, idx) => {
                    let align = 'flex-start'; // 기본값은 왼쪽
                    if (role === '[ROLE_ADMIN]') {
                        align = msg.fromAdmin ? 'flex-end' : 'flex-start'; // 관리자일 경우
                    } else if (role === '[ROLE_USER]') {
                        align = msg.fromAdmin ? 'flex-start' : 'flex-end'; // 사용자의 경우
                    }

                    return (
                        <div
                            key={idx}
                            style={{
                                display: 'flex',
                                justifyContent: align,
                                marginBottom: '10px',
                            }}
                        >
                            <div style={{ maxWidth: '60%' }}>
                                <p style={{ margin: 0 }}>
                                    <strong>{msg.sender}:</strong> {msg.message}
                                </p>
                                <small style={{ color: 'gray', fontSize: '0.8rem' }}>
                                    {new Date(msg.sentAt).toLocaleString()}
                                </small>
                            </div>
                        </div>
                    );
                })}
                <div ref={messageEndRef} />
            </div>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요"
                style={{ width: '100%', height: '60px' }}
            />
            <button onClick={sendMessage}>보내기</button>
        </div>
    );
};

export default Chat;
