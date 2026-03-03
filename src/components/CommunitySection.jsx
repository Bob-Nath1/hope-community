import React, { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";

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
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const loggedInUserId = decoded?.id;

  /* ===============================
     FETCH MESSAGES
  ================================ */
  useEffect(() => {
    if (!selectedGroup) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/community/${selectedGroup.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Access denied");
        }

        setMessages(data.data || []);
      } catch (err) {
        console.error("Community fetch error:", err);
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedGroup]);

  /* ===============================
     AUTO SCROLL
  ================================ */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ===============================
     SEND MESSAGE
  ================================ */
  const handleSend = async () => {
    if (!newMsg.trim() || !selectedGroup) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/community/${selectedGroup.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: newMsg }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: data.data?.id || Date.now(),
          message: newMsg,
          userId: loggedInUserId,
          createdAt: new Date().toISOString(),
        },
      ]);

      setNewMsg("");
    } catch (err) {
      console.error("Send error:", err);
      alert(err.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-[#14213d] text-white rounded-[32px] m-4 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <button
          onClick={() => (selectedGroup ? setSelectedGroup(null) : onBack())}
          className="absolute top-8 left-7 ml-3.5 bg-white text-[#14213d] px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 xl:left-33 sm:ml-5 md:ml-9 lg:ml-12 xl:-ml-14 2xl:ml-15"
        >
          ← Back
        </button>

        <h2 className="text-lg mt-6 ml-0.5 font-semibold sm:ml-2 md:ml-6 lg:ml-8 2xl:ml-38">
          {selectedGroup ? selectedGroup.name : "Community Groups"}
        </h2>
      </div>

      {/* GROUP LIST */}
      {!selectedGroup && (
        <div className="grid gap-4 -ml-3 sm:-ml-1 sm:w-xl md:w-4xl lg:w-6xl xl:w-7xl">
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => setSelectedGroup(group)}
              className="bg-white text-[#14213d] rounded-xl  p-4 shadow hover:shadow-lg cursor-pointer"
            >
              <h3 className="font-semibold text-lg">{group.name}</h3>
              <p className="text-sm text-gray-600">{group.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* CHAT */}
      {selectedGroup && (
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto w-xs bg-gray-100 rounded-xl p-4 text-[#14213d] ml-0  min-h-0 sm:ml-2 sm:w-xl md:w-2xl md:ml-6 lg:w-4xl lg:ml-9 xl:w-6xl 2xl:ml-39">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : messages.length === 0 ? (
              <p className="text-center text-gray-500">No messages yet</p>
            ) : (
              messages.map((msg) => {
                const isMine = msg.userId === loggedInUserId;

                return (
                  <div
                    key={msg.id}
                    className={`flex mb-3 ${isMine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-3 py-2 rounded-lg text-sm max-w-[75%]
                        ${
                          isMine
                            ? "bg-blue-300 text-[#14213d] rounded-br-none"
                            : "bg-blue-600 text-white rounded-bl-none"
                        }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="flex items-center ml-0.5 mt-4 w-xs bg-white rounded-xl px-3 py-2 sm:ml-2 sm:w-xl md:w-2xl lg:w-4xl md:ml-6 xl:w-6xl lg:ml-9 2xl:ml-39">
            <input
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 text-sm text-[#14213d] outline-none"
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
