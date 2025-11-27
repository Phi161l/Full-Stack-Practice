import React, { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Get messages from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const res = await fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    const newMsg = await res.json();
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };  

  return (
    <div style={{ padding: "20px" }}>
      <h2>Simple Chat</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      /> 
      <button onClick={sendMessage}>Send</button>

      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.text}</li>
        ))}
      </ul>
    </div>
  ); 
}

export default App;
