import React, { useState } from "react";
import { FiBell } from "react-icons/fi";

const Menu = ({
  onGoToHome,
  onGoToAdmin,
  onGoToLoan,
  onGoToReport,
  onGoToContribution,
  onGoToInvestment,
  onGoToCommunity,
  onGoToProfile,
  onGoToSettings
}) => {


  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle

  return (
    <div className="w-full h-screen flex bg-white text-[#14213d] font-inter relative overflow-hidden">
      {/* Hamburger Icon (Always Visible) */}
      {!isOpen && (
        <div
          className="absolute top-6 left-6 z-30 cursor-pointer space-y-2 mt-9 ml-4"
          onClick={() => setIsOpen(true)}
        >
          <span className="block h-1 w-7 bg-white rounded shadow-sm"></span>
          <span className="block h-1 w-7 bg-white rounded shadow-sm"></span>
          <span className="block h-1 w-7 bg-white rounded shadow-sm"></span>
        </div>
      )}

      {/* Notification Bell */}
      <div className="absolute top-10 right-10 z-30">
        <FiBell
          size={28}
          className="text-blue-400 cursor-pointer hover:text-yellow-300 mt-4"
        />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 p-6 flex flex-col rounded-3xl justify-between transform transition-transform duration-500 ease-in-out z-40 ${
          isOpen ? "translate-x-0 w-42" : "-translate-x-full w-42"
        }`}
      >
        {/* Close (X) Icon inside sidebar */}
        <div
          className="absolute top-6 right-6 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative w-8 h-8">
            <span className="absolute top-1/2 left-0 w-8 h-1 bg-black rotate-45 rounded"></span>
            <span className="absolute top-1/2 left-0 w-8 h-1 bg-black -rotate-45 rounded"></span>
          </div>
        </div>

        <div className="space-y-6 mt-12">
          <h1 className="text-2xl font-bold">Menu</h1>
          <nav className="flex flex-col space-y-4 text-gray-700">
<button
  onClick={() => {
    setIsOpen(false);
    onGoToInvestment();
  }}
  className="text-left hover:text-blue-600"
>
  Investment
</button>


            {/* ✅ Loan Navigation */}
            <button
              onClick={() => {
                setIsOpen(false);
                onGoToLoan();
              }}
              className="text-left hover:text-blue-600"
            >
              Loans
            </button>

            {/* ✅ Report Navigation */}
            <button
              onClick={() => {
                setIsOpen(false);
                onGoToReport();
              }}
              className="text-left hover:text-blue-600"
            >
              Reports
            </button>

            <a href="#" className="hover:text-blue-600">
              Support
            </a>

            {/* ✅ Admin Navigation */}
            <button
              onClick={() => {
                setIsOpen(false);
                onGoToAdmin();
              }}
              className="text-left hover:text-blue-600"
            >
              Admin
            </button>
            <button
  onClick={() => {
    setIsOpen(false);
    onGoToCommunity();
  }}
  className="text-left hover:text-blue-600"
>
  Community
</button>

          </nav>
        </div>

        <button className="text-red-600 font-semibold hover:underline">
          Sign Out
        </button>
      </aside>

      {/* Overlay background when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-[#14213d] text-white rounded-[32px] m-4 p-6 flex flex-col z-0">
        <header className="mb-6">
          <h2 className="text-lg font-bold mt-14 ml-17">Hello Israel</h2>
          <p className="text-sm text-gray-300 ml-18">Your Balance</p>
          <h1 className="text-xl font-bold ml-17">₦2,000.00</h1>
        <button
  onClick={() => onGoToContribution()}
  className="mt-4 -ml-3 w-70 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium"
>
  Make Contribution
</button>

        </header>

        <div className="grid grid-cols-2 gap-4 -ml-3">
          <div className="bg-gray-600 w-33 h-47 rounded-2xl"></div>
          <div className="bg-blue-500 w-33 h-47 rounded-2xl"></div>
        </div>

        <section className="flex-1 mt-2 -ml-3">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white text-[#14213d] px-2 rounded-lg shadow">
              <div>
                <p className="font-medium">Contribution Amount</p>
                <p className="text-xs text-gray-500">Today, 04:30PM</p>
              </div>
              <span className="text-green-600 font-bold">+₦2000.00</span>
            </div>

            <div className="flex items-center justify-between bg-white text-[#14213d] px-2 rounded-lg shadow">
              <div>
                <p className="font-medium">Contribution Amount</p>
                <p className="text-xs text-gray-500">Oct 1, 2025</p>
              </div>
              <span className="text-green-600 font-bold">+₦10,000.00</span>
            </div>

            <div className="flex items-center justify-between bg-white text-[#14213d] px-2 rounded-lg shadow">
              <div>
                <p className="font-medium">Withdrawal Amount</p>
                <p className="text-xs text-gray-500">Sep 20, 2025</p>
              </div>
              <span className="text-red-600 font-bold">-₦50,000.00</span>
            </div>
          </div>
        </section>

        <footer className="mt-1 flex justify-around border-t border-gray-600 pt-1">
  <button
    onClick={() => {
      setIsOpen(false);
      onGoToHome(); // ✅ leads to Menu.jsx (home)
    }}
    className="text-sm font-medium hover:text-blue-400"
  >
    Home
  </button>

  <button
    onClick={() => {
      setIsOpen(false);
      onGoToProfile(); // ✅ go to profile
    }}
    className="text-sm font-medium hover:text-blue-400"
  >
    Profile
  </button>

 <button
  onClick={() => {
    setIsOpen(false);
    onGoToSettings(); // ✅ Go to Settings page
  }}
  className="text-sm font-medium hover:text-blue-400"
>
  Settings
</button>

</footer>

      </main>
    </div>
  );
};

export default Menu;
