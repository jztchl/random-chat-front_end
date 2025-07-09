'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ChatRoom() {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const socket = useRef<WebSocket | null>(null);
  const { room } = useParams();
  const baseWs = process.env.NEXT_PUBLIC_BACKEND_URL_WSS;

  useEffect(() => {
    const storedUsername = localStorage.getItem('chatUsername') || 'User';
    setNickname(storedUsername);

    const wsUrl = `${baseWs}/ws/chat/${room}/`;
    socket.current = new WebSocket(wsUrl);

    socket.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data.message]);
    };

    socket.current.onclose = () => console.log('[SYSTEM] WebSocket disconnected');

    return () => socket.current?.close();
  }, [room]);

  const sendMessage = () => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN && message.trim()) {
      socket.current.send(
        JSON.stringify({
          message: {
            message,
            nick_name: nickname,
          },
        })
      );
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="border-b border-green-700 pb-2 mb-4">
          <p className="text-green-300">[CONNECTED TO ROOM]: <span className="font-bold">{room}</span></p>
          <p className="text-green-500">[USERNAME]: <span className="text-green-300">{nickname}</span></p>
          <p className="text-green-500">[COMMANDS]: Type message and press Enter or click [SEND]</p>
        </div>

        <div className="border border-green-700 p-4 h-[400px] overflow-y-auto space-y-2 bg-black">
          {messages.map((msg, idx) => (
            <p key={idx} className="whitespace-pre-wrap">
              <span className="text-green-300">{msg.nick_name}</span>: {msg.message}
            </p>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="> Enter your message"
            className="flex-1 bg-black border border-green-600 text-green-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 border border-green-500 hover:bg-green-700 hover:text-black transition"
          >
            [SEND]
          </button>
        </div>
      </div>
    </div>
  );
}
