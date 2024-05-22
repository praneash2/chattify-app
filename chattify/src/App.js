import { useState } from 'react';
import './App.css';

function App({socket}) {
  let [message,setMessage]=useState({input:"",groupId:""});
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
  

  
  const handleChange=(e)=>{
      setMessage({...message,[e.target.name]:e.target.value});
  }
  socket.on("send-message",(message,room)=>{
    console.log(message,room);
  });
  const handleSubmit=(e)=>{
    e.preventDefault();
    joinGroup();
    socket.emit("send-message",JSON.stringify(message),message.groupId);
    setMessage({input:"",groupId:message.groupId});
  } 

  const joinGroup=()=>{
    socket.emit("join-group",message.groupId);
  }
  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <input className="message-box" name="input" value={message.input} onChange={handleChange}>
          </input>
          <input className="group-join" name="groupId" value={message.groupId} onChange={handleChange}>
          </input>
          <button>
            Send
          </button>
        </form>
    </div>
  );
}

export default App;
