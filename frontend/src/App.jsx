import Editor from '@monaco-editor/react';
import { Code2, LogIn, Play, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [roomId, setRoomId] = useState('demo-room');
  const [name, setName] = useState('Guest');
  const [status, setStatus] = useState('Disconnected');
  const [users, setUsers] = useState([]);
  const [code, setCode] = useState('console.log("Hello from CodeFusion");');

  const socket = useMemo(
    () =>
      io(apiUrl, {
        autoConnect: false,
      }),
    []
  );

  useEffect(() => {
    socket.on('connect', () => setStatus('Connected'));
    socket.on('disconnect', () => setStatus('Disconnected'));
    socket.on('room:users', setUsers);
    socket.on('code:update', setCode);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('room:users');
      socket.off('code:update');
      socket.disconnect();
    };
  }, [socket]);

  function joinRoom(event) {
    event.preventDefault();

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('room:join', {
      roomId: roomId.trim(),
      name: name.trim() || 'Guest',
    });
  }

  function updateCode(nextCode) {
    setCode(nextCode);

    if (socket.connected && roomId.trim()) {
      socket.emit('code:change', {
        roomId: roomId.trim(),
        code: nextCode,
      });
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-5 py-6">
        <header className="flex flex-col gap-4 border-b border-zinc-800 pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3 text-emerald-300">
              <Code2 size={26} />
              <span className="text-sm font-semibold uppercase tracking-widest">CodeFusion</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold text-white">Collaborative coding room</h1>
          </div>
          <div className="rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm">
            Socket status: <span className="font-semibold text-emerald-300">{status}</span>
          </div>
        </header>

        <div className="grid flex-1 gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-4">
            <form onSubmit={joinRoom} className="rounded-md border border-zinc-800 bg-zinc-900 p-4">
              <label className="text-sm font-medium text-zinc-300" htmlFor="name">
                Display name
              </label>
              <input
                id="name"
                className="mt-2 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-emerald-400"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              <label className="mt-4 block text-sm font-medium text-zinc-300" htmlFor="roomId">
                Room ID
              </label>
              <input
                id="roomId"
                className="mt-2 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-emerald-400"
                value={roomId}
                onChange={(event) => setRoomId(event.target.value)}
              />

              <button
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
                type="submit"
              >
                <LogIn size={18} />
                Join room
              </button>
            </form>

            <section className="rounded-md border border-zinc-800 bg-zinc-900 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-200">
                <Users size={18} />
                Connected users
              </div>
              <div className="space-y-2">
                {users.length > 0 ? (
                  users.map((user) => (
                    <div key={user.id} className="rounded-md bg-zinc-950 px-3 py-2 text-sm text-zinc-300">
                      {user.name}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-zinc-500">Join a room to see participants.</p>
                )}
              </div>
            </section>
          </aside>

          <section className="flex min-h-[620px] flex-col overflow-hidden rounded-md border border-zinc-800 bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
              <div className="text-sm font-semibold text-zinc-200">main.js</div>
              <button className="flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-300">
                <Play size={16} />
                Run
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <Editor
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) => updateCode(value || '')}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default App;
