import { createRef, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import IMessage from './IMessage';

export default function Chat({ socket }: { socket: Socket | undefined }) {
  const messageRef = createRef<HTMLInputElement>();
  const [messageList, setMessageList] = useState<IMessage[]>([]);

  useEffect(() => {
    socket!.on('receive_message', (data) => setMessageList((current) => [...current, data]));

    return () => {
      socket?.off('receive_message');
    };
  }, [socket]);

  const clearInput = () => {
    messageRef.current!.value = '';
  };

  const handleSubmit = () => {
    const message = messageRef.current!.value;
    if (!message.trim()) return;

    socket?.emit('message', message);
    clearInput();
  };

  return (
    <div>
      <h1>Chat</h1>
      {messageList.map((message, index) => (
        <p key={index}>
          {message.author} : {message.text}
        </p>
      ))}
      <input type="text" ref={messageRef} placeholder="Mensagem" />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}
