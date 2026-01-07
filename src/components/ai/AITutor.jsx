import { useState } from "react";

const AITutor = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    // user message
    const userMessage = { sender: "user", text: input };

    // dummy AI reply
    const aiMessage = {
      sender: "ai",
      text: "I can help explain concepts, answer doubts, and guide your study."
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-full shadow"
      >
        AI Tutor
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white border rounded-lg shadow-lg flex flex-col">
          
          {/* Header */}
          <div className="p-3 border-b font-semibold text-gray-800">
            AI Tutor
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
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
