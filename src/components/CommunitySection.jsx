import React, { useState } from "react";

const groups = [
  { id: "daily", name: "Daily Contributors", desc: "Chat with fellow daily contributors" },
  { id: "weekly", name: "Weekly Contributors", desc: "Discuss weekly savings and updates" },
  { id: "mogul", name: "Monthly Mogul", desc: "Share insights with Mogul members" },
  { id: "mastermind", name: "Monthly Mastermind", desc: "Connect with Mastermind investors" },
  { id: "elite", name: "Elite Contributors", desc: "Exclusive chat for Elite members" },
];

const CommunitySection = ({ onBack }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const handleSend = () => {
    if (newMsg.trim() === "") return;
    setMessages([...messages, { sender: "You", text: newMsg }]);
    setNewMsg("");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-[#14213d] text-white rounded-[32px] m-4 p-6 relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        {selectedGroup ? (
          <button
            onClick={() => setSelectedGroup(null)}
            className="text-sm text-gray-300 hover:text-white"
          >
            ← Back
          </button>
        ) : (
          <button
            onClick={onBack}
            className="text-sm text-gray-300 hover:text-white"
          >
            ← Back to Menu
          </button>
        )}
        <h2 className="text-lg font-semibold">
          {selectedGroup ? selectedGroup.name : "Community Groups"}
        </h2>
      </div>

      {/* GROUP LIST */}
      {!selectedGroup && (
        <div className="grid gap-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white text-[#14213d] rounded-xl p-4 shadow hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedGroup(group)}
            >
              <h3 className="font-semibold text-lg">{group.name}</h3>
              <p className="text-sm text-gray-600">{group.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* CHAT INTERFACE */}
      {selectedGroup && (
        <div className="flex flex-col flex-1">
          <div className="flex-1 overflow-y-auto bg-gray-100 rounded-xl p-4 text-[#14213d]">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">
                No messages yet. Start chatting!
              </p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex mb-3 ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-3 py-2 max-w-[75%] ${
                      msg.sender === "You"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-[#14213d]"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* INPUT BAR */}
          <div className="flex items-center mt-4 bg-white rounded-xl px-3 py-2">
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-2 py-1 text-sm text-[#14213d] focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunitySection;
