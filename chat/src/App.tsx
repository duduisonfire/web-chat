import { useState } from 'react';
import './App.css';
import Chat from './components/chat/chat';
import Join from './components/join/join';
import { Socket } from 'socket.io-client';

function App() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [socket, setSocket] = useState<Socket>();

  return (
    <>
      {chatVisibility ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />}
    </>
  );
}

export default App;
