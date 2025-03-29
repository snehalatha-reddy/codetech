import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const socket = io("http://localhost:5000");

const Editor = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.on("loadDocument", (data) => {
      setContent(data);
    });

    socket.on("updateDocument", (data) => {
      setContent(data);
    });

    return () => {
      socket.off("loadDocument");
      socket.off("updateDocument");
    };
  }, []);

  const handleChange = (value) => {
    setContent(value);
    socket.emit("editDocument", value);
  };

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "20px" }}>
      <h2>Real-Time Collaborative Editor</h2>
      <ReactQuill value={content} onChange={handleChange} />
    </div>
  );
};

export default Editor;
