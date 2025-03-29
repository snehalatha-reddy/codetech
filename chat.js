import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to backend

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", message); // Send message to server
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <p key={index} style={styles.message}>{msg}</p>
        ))}
      </div>
      <div style={styles.inputBox}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: { maxWidth: "400px", margin: "auto", textAlign: "center" },
  chatBox: { minHeight: "300px", border: "1px solid #ccc", padding: "10px", overflowY: "auto" },
  message: { background: "#ddd", padding: "5px", borderRadius: "5px", margin: "5px 0" },
  inputBox: { display: "flex", marginTop: "10px" },
  input: { flex: 1, padding: "5px" },
  button: { padding: "5px", background: "blue", color: "white", border: "none", cursor: "pointer" }
};

export default Chat;
