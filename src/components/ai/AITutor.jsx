import { useState } from "react";
 import api from "../../api/axios"; // ⬅️ make sure this import exists

const AITutor = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

 
const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { sender: "user", text: input };

  // show user message immediately
  setMessages((prev) => [...prev, userMessage]);
  setInput("");

  try {
    const res = await api.post("/ai/ask", {
      question: userMessage.text,
    });

    const aiMessage = {
      sender: "ai",
      text: res.data.data, // backend sends text here
    };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (err) {
    console.error("AI error:", err);

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: `⚠️ AI failed to respond. Please try again.${err}`,
      },
    ]);
  }
};


  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50
  bg-gradient-to-r from-indigo-600 to-purple-600
  text-white px-5 py-3 rounded-full
  shadow-xl hover:scale-105 transition"
      >
        AI Tutor
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-25 right-6 w-80 bg-white border rounded-lg shadow-lg flex flex-col">
          
          {/* Header */}
          <div className="p-3 border-b font-semibold text-gray-800">
            AI Tutor
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-5  overflow-y-auto text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded ${
                  msg.sender === "user"
                    ? "bg-indigo-100 text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your doubt..."
              className="flex-1 border rounded px-2 py-1 text-sm"
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white px-3 rounded text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AITutor;
