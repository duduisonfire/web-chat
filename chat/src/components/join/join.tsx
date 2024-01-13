import { RefObject, createRef } from 'react';
import { Socket, io } from 'socket.io-client';

export default function Join({
  setChatVisibility,
  setSocket,
}: {
  setChatVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>;
}) {
  const userNameRef: RefObject<HTMLInputElement> = createRef();

  const handleSubmit = async () => {
    const username = userNameRef.current!.value;
    if (!username.trim()) return;
    const socket = io('http://localhost:3001').connect();
    socket.emit('set_username', username);

    setSocket(socket);
    setChatVisibility(true);
  };

  return (
    <div>
      <h1>Join</h1>
      <input type="text" ref={userNameRef} placeholder="Nome de usuário" />
      <button onClick={handleSubmit}>Entrar</button>
    </div>
  );
}
