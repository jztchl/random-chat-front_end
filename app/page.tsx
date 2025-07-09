'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Room {
  name: string;
  active_members: number;
}

export default function Home() {
  const [username, setUsername] = useState('');
  const [usernameSet, setUsernameSet] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const baseHttp = process.env.NEXT_PUBLIC_BACKEND_URL_HTTPS;

  useEffect(() => {
    const savedUsername = localStorage.getItem('chatUsername');
    if (savedUsername) {
      setUsername(savedUsername);
      setUsernameSet(true);
    }
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${baseHttp}/list_rooms/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRooms(data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setRooms([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetUsername = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('chatUsername', username);
      setUsernameSet(true);
    }
  };


  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      {!usernameSet ? (
        <div className="max-w-xl mx-auto">
          <p className="mb-4">[SYSTEM] Welcome to <span className="text-green-300 font-bold">ByteChat Terminal</span></p>
          <form onSubmit={handleSetUsername}>
            <label htmlFor="username" className="block mb-2">
              &gt; Enter username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black text-green-400 border border-green-400 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-600"
              autoFocus
            />
            <button type="submit" className="mt-4 px-4 py-1 border border-green-400 hover:bg-green-600 hover:text-black transition">
              [SET USERNAME]
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <p>&gt; User: <span className="text-green-300">{username}</span></p>
            <p>&gt; Type a command below or join a room</p>
          </div>

         
            <label htmlFor="newRoomName">&gt; Create Room:</label>
            <input
              id="newRoomName"
              type="text"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="w-full bg-black text-green-400 border border-green-400 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="room-name"
            />
            <button onClick={() => router.push(`/chat/${newRoomName}`)} className="px-4 py-1 border border-green-400 hover:bg-green-600 hover:text-black transition">
              [CREATE]
            </button>
        

          <div>
            <p className="mb-2">&gt; Available Rooms:</p>
            {isLoading ? (
              <p>[LOADING ROOMS...]</p>
            ) : rooms.length === 0 ? (
              <p>[NO ROOMS FOUND. CREATE ONE ABOVE.]</p>
            ) : (
              <div className="space-y-2">
                {rooms.map((room) => (
                  <div
                    key={room.name}
                    className="p-2 border border-green-500 hover:bg-green-800 hover:text-black cursor-pointer"
                    onClick={() => router.push(`/chat/${room.name}`)}
                  >
                    <p># {room.name}</p>
                    <p className="text-xs text-green-300">{room.active_members} user(s) online</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
