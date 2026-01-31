// frontend/src/components/Menu.jsx
import React, { useState, useEffect, useRef } from "react";
import { FiBell, FiLogOut, FiArrowDownCircle, FiTrendingUp, FiArrowUpCircle } from "react-icons/fi";

const Menu = ({
  onGoToHome,
  onGoToAdmin,
  onGoToLoan,
  onGoToReport,
  onGoToContribution,
  onGoToInvestment,
  onGoToCommunity,
  onGoToProfile,
  onGoToSettings,
  onGoToSupport,
  totalContributions,
  totalInvestments,
  totalWithdrawals,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.fullName || storedUser?.name || "User";
  const role = localStorage.getItem("role");

  const balance = (totalContributions || 0) + 
  (totalInvestments || 0) - 
  (totalWithdrawals || 0);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Notifications offline");
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.isread).length;
  const readNotifications = notifications.filter(n => n.isread); // ONLY READ ONES

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${import.meta.env.VITE_API_URL}/api/user/notifications/read/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotifications();
    } catch (err) {}
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");

  window.location.href = "/login";
};

  return (
    <div className="w-full h-screen flex bg-white text-[#14213d] font-inter relative overflow-hidden">
      {/* Hamburger */}
      {!isOpen && (
        <div
          className="absolute top-6 left-6 z-30 cursor-pointer space-y-1 mt-9 ml-4"
          onClick={() => setIsOpen(true)}
        >
          <span className="block h-1 w-6 bg-white rounded shadow-sm"></span>
          <span className="block h-1 w-6 bg-white rounded shadow-sm"></span>
          <span className="block h-1 w-6 bg-white rounded shadow-sm"></span>
        </div>
      )}

      {/* NOTIFICATION BELL */}
      <div className="absolute top-10 right-10 z-50" ref={notifRef}>
        <div className="relative mt-4.5">
          <FiBell
            size={25}
            className="text-yellow-400 cursor-pointer hover:text-yellow-300 transition"
            onClick={() => setShowNotif(!showNotif)}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse shadow-lg">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>

        {/* DROPDOWN */}
        {showNotif && (
          <div className="absolute right-0 mt-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
            <div className="p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-t-2xl">
              Notifications ({unreadCount} new)
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-8 text-center text-gray-500">No notifications</p>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition ${
                      !notif.isread ? "bg-blue-50 font-medium" : "bg-white"
                    }`}
                  >
                    <p className="font-bold text-[#14213d]">{notif.title}</p>
                    <p className="text-sm text-gray-700 mt-1">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(notif.createdat).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>



      {/* YOUR ORIGINAL SIDEBAR — 100% UNCHANGED */}
      <aside className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 p-6 flex flex-col justify-between transform transition-transform duration-500 ease-in-out z-60 ${isOpen ? "translate-x-0 w-42" : "-translate-x-full w-42"}`}>
        <div className="absolute top-6 right-6 cursor-pointer" onClick={() => setIsOpen(false)}>
          <div className="relative w-8 h-8">
            <span className="absolute top-1/2 left-0 w-7 h-1 bg-black rotate-45 rounded"></span>
            <span className="absolute top-1/ left-0 w-7 h-1 bg-black -rotate-45 rounded"></span>
          </div>
        </div>

        <div className="space-y-6 mt-12">
          <h1 className="text-2xl font-bold">Menu</h1>
          <nav className="flex flex-col space-y-4 text-white bg-[#14213d] w-43 h-97 -ml-7">
            <button onClick={() => { setIsOpen(false); onGoToInvestment(); }} className="text-left ml-2 mt-7 border-t border-b yellow">Investment</button>
            <button onClick={() => { setIsOpen(false); onGoToLoan(); }} className="text-left ml-2 border-t border-b yellow">Loans</button>
            <button onClick={() => { setIsOpen(false); onGoToReport(); }} className="text-left ml-2 border-t border-b yellow">Reports</button>
            <button onClick={() => { setIsOpen(false); onGoToSupport(); }} className="text-left border-t border-b yellow ml-2">Support</button>
            {role === "admin" && (
              <button onClick={() => { setIsOpen(false); onGoToAdmin(); }} className="text-left ml-2 border-t border-b yellow">Admin</button>
            )}
            <button onClick={() => { setIsOpen(false); onGoToCommunity(); }} className="text-left ml-2 border-t border-b yellow">Community</button>
          </nav>
        </div>

        <button  onClick={handleLogout} className="flex items-center gap-2 text-blue-950 shadow font-semibold hover:underline border rounded-r-xl border-[#ecb555] px-3 py-1">
          <FiLogOut className="text-blue-900" /> Sign Out
        </button>
      </aside>

       {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20" onClick={() => setIsOpen(false)}></div>}

      {/* MAIN CONTENT — RECENT TRANSACTIONS SHOWS ONLY READ NOTIFICATIONS */}
      <main className="flex-1 bg-[#14213d] text-white rounded-[32px] m-4 p-6 flex flex-col z-0">
  <header className="mb-6">
          <h2 className="text-lg font-bold mt-14 ml-17">Hello {userName}</h2>
          <p className="text-sm text-gray-300 ml-18">Your Balance</p>
          <h1 className="text-xl font-bold ml-17"> ₦{balance.toLocaleString()}
</h1>

          <button
            onClick={() => onGoToContribution()}
            className="mt-4 -ml-5 w-70 bg-[#ecb555] px-4 py-2 rounded-lg font-medium"
          >
            Make Contribution
          </button>
        </header>

       <div className="bg-white mt-4 -ml-5 w-70 h-148 rounded-2xl flex flex-col overflow-hidden">

          <div className="grid grid-cols-3 gap-3 mt-4">
  {/* CONTRIBUTION */}
  <div className="bg-blue-50 p-3 rounded-xl text-center">
    <FiArrowDownCircle className="mx-auto text-blue-600 text-xl mb-1" />
    <p className="text-xs text-gray-500">Contributions</p>
    <p className="font-bold text-sm  text-gray-500">
      ₦{(totalContributions || 0).toLocaleString()}
    </p>
  </div>

  {/* INVESTMENT */}
  <div className="bg-green-50 p-3 rounded-xl text-center">
    <FiTrendingUp className="mx-auto text-green-600 text-xl mb-1" />
    <p className="text-xs text-gray-500">Investments</p>
    <p className="font-bold text-sm  text-gray-500">
      ₦{(totalInvestments || 0).toLocaleString()}
    </p>
  </div>

  {/* WITHDRAWAL */}
  <div className="bg-red-50 p-3 rounded-xl text-center">
    <FiArrowUpCircle className="mx-auto text-red-600 text-xl mb-1" />
    <p className="text-xs text-gray-500">Withdrawals</p>
    <p className="font-bold text-sm  text-gray-500">
      ₦{(totalWithdrawals || 0).toLocaleString()}
    </p>
  </div>
</div>

          <section className="flex-1 mt-2 -ml-3">
            <h3 className="text-base font-semibold mb-3 text-[#14213d] ml-4">
              Recent Transactions
            </h3>

            {/* SCROLLABLE CONTAINER — ALL READ NOTIFICATIONS */}
           <div className="flex-1 overflow-y-auto pr-2 -mr-4">

              <div className="space-y-3">
                {readNotifications.length > 0 ? (
                  readNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="flex items-center justify-between text-[#14213d] p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition shadow-sm"
                    >
                      <div className="flex-1">
                        <p className="font-bold text-lg">{notif.title}</p>
                        <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(notif.createdat).toLocaleDateString()} • {new Date(notif.createdat).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      
                      <div className="ml-4">
                        <span className={`px-4 py-2 rounded-full font-bold text-sm ${
                          notif.title.includes("Approved") 
                            ? "bg-green-100 text-green-700" 
                            : notif.title.includes("Rejected")
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {notif.title.includes("Approved") ? "APPROVED" : 
                           notif.title.includes("Rejected") ? "REJECTED" : "INFO"}
                        </span>
                      
                      </div>
                    </div>
                  ))
                ) : (
                  /* Your original static transactions when no notifications */
                  <>
                    <div className="flex items-center justify-between text-[#14213d] pl-4 pr-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-sm">Contribution Amount</p>
                        <p className="text-xs text-gray-500">Today, 04:30PM</p>
                      </div>
                      <span className="text-green-600 text-sm font-bold">+₦2000.00</span>
                    </div>
                    <div className="flex items-center justify-between text-[#14213d] p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-sm">Contribution Amount</p>
                        <p className="text-xs text-gray-500">Oct 1, 2025</p>
                      </div>
                      <span className="text-green-600 text-sm font-bold">+₦10,000.00</span>
                    </div>
                    <div className="flex items-center justify-between text-[#14213d] p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-sm">Withdrawal Amount</p>
                        <p className="text-xs text-gray-500">Sep 20, 2025</p>
                      </div>
                      <span className="text-red-600 text-sm font-bold">-₦50,000.00</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

      
          
        </div>
 
      </main>

  <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex justify-center gap-3 py-3">
            <button onClick={() => { setIsOpen(false); onGoToHome(); }} className="text-sm font-medium hover:text-blue-400 bg-[#ecb555] px-4 py-2 rounded-sm -mt-3 -ml-4">
              Home
            </button>
            <button onClick={() => { setIsOpen(false); onGoToProfile(); }} className="text-sm text-white font-medium bg-[#14213d] px-5 py-2 rounded-sm -mt-3">
              Profile
            </button>
            <button onClick={() => { setIsOpen(false); onGoToSettings(); }} className="text-sm font-medium bg-[#ecb555] px-3 py-2 rounded-sm -mt-3">
              Settings
            </button>
          </footer>
    </div>
  );
};

export default Menu;
