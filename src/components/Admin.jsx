import React, { useState } from "react";
import {
  FiBell,
  FiUsers,
  FiDollarSign,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";

const Admin = ({ onBack }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showReply, setShowReply] = useState(null);


  const savingsData = [
    {
      name: "Hope Ajayi",
      plan: "Daily Saver",
      total: "₦30,000",
      lastDeposit: "14 Sept 2024",
    },
    {
      name: "Michael Bamidele",
      plan: "Weekly Saver",
      total: "₦50,000",
      lastDeposit: "10 Sept 2024",
    },
    {
      name: "Tola A.",
      plan: "Monthly Saver",
      total: "₦120,000",
      lastDeposit: "30 Aug 2024",
    },
  ];

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsOpen(false);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-[#14213d] text-white font-inter relative overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 p-6 flex flex-col rounded-3xl justify-between transform transition-transform duration-500 ease-in-out z-20 ${
          isOpen ? "translate-x-0 w-52" : "-translate-x-full w-52"
        }`}
      >
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
          <h1 className="text-2xl font-bold text-[#14213d] ">Admin</h1>
          <nav className="flex flex-col space-y-4 text-gray-700">
            <button
              onClick={() => handleSectionChange("dashboard")}
              className="hover:text-blue-600 text-left"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleSectionChange("contributions")}
              className="hover:text-blue-600 text-left"
            >
              Contributions
            </button>
            <button
              onClick={() => handleSectionChange("savings")}
              className="hover:text-blue-600 text-left"
            >
              Savings
            </button>
            <button
              onClick={() => handleSectionChange("loans")}
              className="hover:text-blue-600 text-left"
            >
              Loans
            </button>
            <button
              onClick={() => handleSectionChange("investment")}
              className="hover:text-blue-600 text-left"
            >
              Investment
            </button>
            <button
              onClick={() => handleSectionChange("report")}
              className="hover:text-blue-600 text-left"
            >
              Report
            </button>
            <button
              onClick={() => handleSectionChange("management")}
              className="hover:text-blue-600 text-left"
            >
              Management
            </button>
          </nav>
        </div>

        <button className="text-red-600 font-semibold hover:underline">
          Logout
        </button>
      </aside>

      {/* Header */}
      <header className="flex justify-between items-center w-full px-8 py-6">
        {!isOpen && (
          <div
            className="cursor-pointer space-y-2"
            onClick={() => setIsOpen(true)}
          >
            <span className="block h-1 w-7 bg-white rounded"></span>
            <span className="block h-1 w-7 bg-white rounded"></span>
            <span className="block h-1 w-7 bg-white rounded"></span>
          </div>
        )}
        <h1 className="text-2xl font-bold capitalize">
          {activeSection === "dashboard" ? "Admin Dashboard" : activeSection}
        </h1>
        <div className="flex items-center space-x-4">
          <FiBell className="text-white text-2xl hover:text-yellow-400 cursor-pointer" />
          <div className="w-9 h-9 bg-gray-400 rounded-full flex items-center justify-center text-black font-semibold">
            A
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-8 pb-6">
        {/* 🏠 Dashboard Section */}
        {activeSection === "dashboard" && (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-5 rounded-2xl shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-200">Total Users</p>
                  <h2 className="text-2xl font-bold">1,230</h2>
                </div>
                <FiUsers className="text-3xl" />
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-700 p-5 rounded-2xl shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-200">Total Contributions</p>
                  <h2 className="text-2xl font-bold">₦2.5M</h2>
                </div>
                <FiDollarSign className="text-3xl" />
              </div>

              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-5 rounded-2xl shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-200">Pending Withdrawals</p>
                  <h2 className="text-2xl font-bold">₦350k</h2>
                </div>
                <FiClock className="text-3xl" />
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-5 rounded-2xl shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-200">Support Requests</p>
                  <h2 className="text-2xl font-bold">18</h2>
                </div>
                <FiMessageSquare className="text-3xl" />
              </div>
            </section>
          </>
        )}

        {/* 💰 Contributions Section */}
        {activeSection === "contributions" && (
          <section className="bg-white text-[#14213d] rounded-2xl p-6 shadow-md">
            <h3 className="text-base font-semibold mb-4">Contributions</h3>

            <div className="flex items-center space-x-1 -ml-4 mb-4">
              <button className="px-2 bg-gray-200 rounded hover:bg-gray-300">
                Pending
              </button>
              <button className="px-2 bg-gray-200 rounded hover:bg-gray-300">
                Approved
              </button>
              <button className="px-2 bg-gray-200 rounded hover:bg-gray-300">
                Rejected
              </button>
            </div>

            <table className="min-w-full text-left border-collapse text-sm -ml-4">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-2 px-2 text-sm">Member</th>
                  <th className="py-2 px-2 text-sm">Plan</th>
                  <th className="py-2 px-2 text-sm">Amount</th>
                  <th className="py-2 px-2 text-sm">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-1 pl-3 whitespace-nowrap">Hope <br />Ajayi</td>
                  <td className="px-1">Weekly Warrior</td>
                  <td className="px-1 pl-3">₦5,000</td>
                  <td className="px-1 pl-2">15 Sept 2025</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {/* 💸 Savings Section */}
        {activeSection === "savings" && (
          <section className="bg-white text-[#14213d] rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-6">Savings</h3>

            <div className="space-y-6">
              {savingsData.map((user, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{user.name}</h4>
                      <p className="text-sm text-gray-600">Plan: {user.plan}</p>
                      <p className="text-sm text-gray-600">
                        Total Saved: {user.total}
                      </p>
                      <p className="text-sm text-gray-600">
                        Last Deposit: {user.lastDeposit}
                      </p>
                    </div>
                    <button className="mt-2 sm:mt-0 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                      View
                    </button>
                  </div>

                  <div className="flex space-x-3 mt-3">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                      Verify Deposit
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                      Flag Issue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 💳 Loan Section */}
{activeSection === "loans" && (
  <section className="bg-white text-[#14213d] rounded-2xl p-6 shadow-md">
    <h3 className="text-base font-semibold mb-4">Loan Section</h3>

    {/* Loan #1 - Active */}
    <div className="border p-4 rounded-xl mb-4 shadow-sm">
      <p><strong>Loan ID:</strong> L-2025-001</p>
      <p><strong>Member:</strong> Esther</p>
      <p><strong>Amount:</strong> ₦90,000</p>
      <p><strong>Status:</strong> <span className="text-yellow-600 font-semibold">Active</span></p>
      <p><strong>Refund:</strong> 10 Oct 2027</p>
      <div className="mt-3 flex justify-between items-center">
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
        <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Verified</button>
      </div>
    </div>

    {/* Loan #2 - Pending Approval */}
    <div className="border p-4 rounded-xl mb-4 shadow-sm">
      <p><strong>Loan ID:</strong> L-2025-002</p>
      <p><strong>Member:</strong> John Doe</p>
      <p><strong>Amount:</strong> ₦150,000</p>
      <p><strong>Status:</strong> <span className="text-orange-500 font-semibold">Pending Approval</span></p>
      <p><strong>Refund:</strong> 20 Nov 2027</p>
      <div className="mt-3 flex justify-between items-center">
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
      </div>
      <div className="mt-3 flex justify-between">
        <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve Loan</button>
        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Reject Loan</button>
      </div>
    </div>

    {/* Loan #3 - Overdue */}
    <div className="border p-4 rounded-xl mb-4 shadow-sm">
      <p><strong>Loan ID:</strong> L-2025-003</p>
      <p><strong>Member:</strong> Grace</p>
      <p><strong>Amount:</strong> ₦70,000</p>
      <p><strong>Status:</strong> <span className="text-red-600 font-semibold">Overdue</span></p>
      <p><strong>Refund:</strong> 01 Oct 2025</p>
      <div className="mt-3 flex justify-between items-center">
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
      </div>
    </div>
  </section>
)}

{/* 💼 Investment Section */}
{activeSection === "investment" && (
  <section className="bg-white text-[#14213d] rounded-2xl p-6 shadow-md">
    <h3 className="text-base font-semibold mb-4">Investment Section</h3>

    {/* Investment #1 - Pending Receipt Verification */}
    <div className="border p-4 rounded-xl mb-4 shadow-sm">
      <p><strong>Investment ID:</strong> INV-2025-001</p>
      <p><strong>Member:</strong> Hope</p>
      <p><strong>Plan:</strong> Growth Plan</p>
      <p><strong>Amount:</strong> ₦50,000</p>
      <p><strong>Status:</strong> <span className="text-orange-500 font-semibold">Pending Receipt Verification</span></p>
      <div className="mt-3 flex justify-between items-center">
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
      </div>
      <div className="mt-3 flex justify-between">
        <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
      </div>
    </div>

    {/* Investment #2 - Received */}
    <div className="border p-4 rounded-xl mb-4 shadow-sm">
      <p><strong>Investment ID:</strong> INV-2025-002</p>
      <p><strong>Member:</strong> Esther</p>
      <p><strong>Plan:</strong> Safe Plan</p>
      <p><strong>Amount:</strong> ₦100,000</p>
      <p><strong>Status:</strong> <span className="text-green-600 font-semibold">Received</span></p>
      <div className="mt-3 flex justify-between items-center">
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
      </div>
    </div>

    {/* Investment #3 - Pending Receipt Verification */}
    <div className="border p-4 rounded-xl mb-4 shadow-sm">
      <p><strong>Investment ID:</strong> INV-2025-003</p>
      <p><strong>Member:</strong> David</p>
      <p><strong>Plan:</strong> Future Booster</p>
      <p><strong>Amount:</strong> ₦75,000</p>
      <p><strong>Status:</strong> <span className="text-orange-500 font-semibold">Pending Receipt Verification</span></p>
      <div className="mt-3 flex justify-between items-center">
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
      </div>
      <div className="mt-3 flex justify-between">
        <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
      </div>
    </div>
  </section>
)}

{/* 📝 Reports & Feedback Section */}
{activeSection === "report" && (
  <section className="bg-white text-[#14213d] rounded-2xl p-6 shadow-md">
    <h3 className="text-base font-semibold mb-4">Reports & Feedback</h3>

    {/* Feedback #1 - Contribution Issue */}
    <div className="border p-4 rounded-xl mb-4 shadow-sm">
      <p><strong>Member:</strong> Hope Ajayi</p>
      <p><strong>Category:</strong> Contribution</p>
      <p><strong>Message:</strong> “I made a ₦5,000 contribution but it’s still showing pending.”</p>
      <p><strong>Date:</strong> 10 Oct 2025</p>
      <p><strong>Status:</strong> <span className="text-orange-500 font-semibold">Pending</span></p>

      <div className="mt-3 flex justify-between">
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setShowReply(showReply === 1 ? null : 1)}
        >
          Reply
        </button>
        <button className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">Mark Resolved</button>
      </div>

      {showReply === 1 && (
        <div className="mt-3">
          <textarea
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Type your reply here..."
            rows={2}
          ></textarea>
          <button className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">Send Reply</button>
        </div>
      )}
    </div>

    {/* Feedback #2 - Loan Issue */}
    <div className="border p-4 rounded-xl mb-4 shadow-sm">
      <p><strong>Member:</strong> Esther</p>
      <p><strong>Category:</strong> Loan</p>
      <p><strong>Message:</strong> “I was charged interest twice on my ₦90,000 loan.”</p>
      <p><strong>Date:</strong> 8 Oct 2025</p>
      <p><strong>Status:</strong> <span className="text-red-600 font-semibold">Pending</span></p>

      <div className="mt-3 flex justify-between">
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setShowReply(showReply === 2 ? null : 2)}
        >
          Reply
        </button>
        <button className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">Mark Resolved</button>
      </div>

      {showReply === 2 && (
        <div className="mt-3">
          <textarea
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Type your reply here..."
            rows={2}
          ></textarea>
          <button className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">Send Reply</button>
        </div>
      )}
    </div>

    {/* Feedback #3 - Investment Issue */}
    <div className="border p-4 rounded-xl mb-4 shadow-sm">
      <p><strong>Member:</strong> David</p>
      <p><strong>Category:</strong> Investment</p>
      <p><strong>Message:</strong> “My ₦75,000 investment receipt hasn’t been verified yet.”</p>
      <p><strong>Date:</strong> 12 Oct 2025</p>
      <p><strong>Status:</strong> <span className="text-orange-500 font-semibold">Pending</span></p>

      <div className="mt-3 flex justify-between">
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setShowReply(showReply === 3 ? null : 3)}
        >
          Reply
        </button>
        <button className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">Mark Resolved</button>
      </div>

      {showReply === 3 && (
        <div className="mt-3">
          <textarea
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Type your reply here..."
            rows={2}
          ></textarea>
          <button className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">Send Reply</button>
        </div>
      )}
    </div>
  </section>
)}

{/* 👥 Management Section */}
{activeSection === "management" && (
  <section className="bg-white text-[#14213d] rounded-2xl p-6 shadow-md">
    <h3 className="text-xl font-semibold mb-6">Member Management</h3>
    <p className="text-gray-600 mb-6">
      View and manage all members, monitor their activities, and take administrative actions when needed.
    </p>

    {/* Search and Filters */}
    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
      <input
        type="text"
        placeholder="Search members..."
        className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3 focus:outline-none focus:ring focus:ring-blue-200"
      />
      <div className="flex space-x-2">
        <button className="bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 text-sm">All</button>
        <button className="bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 text-sm">Active</button>
        <button className="bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 text-sm">Suspended</button>
      </div>
    </div>

    {/* Member List */}
    <div className="space-y-6">
      {[
        {
          name: "Hope Ajayi",
          plan: "Daily Saver",
          contributions: "₦45,000",
          loans: "₦0 (none)",
          investment: "₦50,000",
          status: "Active",
        },
        {
          name: "Michael Bamidele",
          plan: "Weekly Saver",
          contributions: "₦80,000",
          loans: "₦90,000 (active)",
          investment: "₦20,000",
          status: "Active",
        },
        {
          name: "Tola Ade",
          plan: "Monthly Saver",
          contributions: "₦120,000",
          loans: "₦0 (none)",
          investment: "₦70,000",
          status: "Suspended",
        },
      ].map((member, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <div>
              <h4 className="font-semibold text-lg">{member.name}</h4>
              <p className="text-sm text-gray-600">Plan: {member.plan}</p>
              <p className="text-sm text-gray-600">Contributions: {member.contributions}</p>
              <p className="text-sm text-gray-600">Loans: {member.loans}</p>
              <p className="text-sm text-gray-600">Investments: {member.investment}</p>
              <p
                className={`text-sm font-medium mt-1 ${
                  member.status === "Active" ? "text-green-600" : "text-red-600"
                }`}
              >
                Status: {member.status}
              </p>
            </div>

            <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                View Details
              </button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                Message
              </button>
              <button
                className={`${
                  member.status === "Active"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white px-4 py-2 rounded-md`}
              >
                {member.status === "Active" ? "Suspend" : "Activate"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)}


      </main>

      {/* Footer */}
      <footer className="px-8 pb-6">
        <button
          onClick={() => onBack && onBack("menu")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          ← Back to Menu
        </button>
      </footer>
    </div>
  );
};

export default Admin;
 