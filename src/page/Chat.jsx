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
        <div style={styles.chatContainer}>
            <h2 style={styles.header}>채팅</h2>
            {connected ? (
                <p style={styles.status}>WebSocket 연결됨</p>
            ) : (
                <p style={styles.status}>WebSocket 연결 대기 중...</p>
            )}

            <div style={styles.messagesContainer}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.messageContainer,
                            alignSelf: msg.isFromAdmin ? 'flex-start' : 'flex-end', // 상대방은 왼쪽, 나의 메시지는 오른쪽
                        }}
                    >
                        <div style={styles.messageWrapper}>
                            <p
                                style={{
                                    ...styles.message,
                                    color: msg.isFromAdmin ? 'red' : 'black',
                                    fontWeight: msg.isFromAdmin ? 'bold' : 'normal',
                                }}
                            >
                                <strong>{msg.username}: </strong>{msg.message}
                            </p>
                            <span style={styles.time}>{new Date(msg.sentAt).toLocaleTimeString()}</span> {/* 시간 표시 */}
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.inputContainer}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    rows="3"
                    style={styles.textArea}
                />
                <button onClick={sendMessage} style={styles.sendButton}>
                    보내기
                </button>
            </div>
        </div>
    );
};

const styles = {
    chatContainer: {
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
    },
    status: {
        textAlign: 'center',
        fontSize: '16px',
        color: '#888',
    },
    messagesContainer: {
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.1)',
        maxHeight: '400px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    messageContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '15px',
        maxWidth: '80%', // 최대 너비
    },
    messageWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '5px',
    },
    message: {
        padding: '5px 0',
        lineHeight: '1.5',
        wordBreak: 'break-word',
        maxWidth: '80%',
        borderRadius: '5px',
    },
    time: {
        fontSize: '12px',
        color: '#888',
        marginTop: '5px',
        alignSelf: 'flex-end',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    textArea: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        marginBottom: '10px',
        fontSize: '16px',
        resize: 'none',
    },
    sendButton: {
        alignSelf: 'flex-end',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
};

export default Chat;
