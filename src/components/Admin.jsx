// frontend/src/components/Admin.jsx
import React, { useEffect, useState, useCallback } from "react";
import { FiUsers, FiDollarSign } from "react-icons/fi";

const Admin = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalLoans, setTotalLoans] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [pendingWithdrawals, setPendingWithdrawals] = useState(0);

  const [totalInvestments, setTotalInvestments] = useState(0);
  const [pendingInvestments, setPendingInvestments] = useState(0);
  const [investments, setInvestments] = useState([]);
  const [showInvestments, setShowInvestments] = useState(false);

  const [contributions, setContributions] = useState([]);
  const [showContributions, setShowContributions] = useState(false);
  const [pendingContributions, setPendingContributions] = useState(0
);

  const [loans, setLoans] = useState([]);
  const [showLoans, setShowLoans] = useState(false);
  const [pendingLoans, setPendingLoans] = useState(0);

  const [withdrawals, setWithdrawals] = useState([]);
  const [showWithdrawals, setShowWithdrawals] = useState(false);
  const [withdrawalFilter, setWithdrawalFilter] = useState("all");

  const [reports, setReports] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [error, setError] = useState(null);

  const [supports, setSupports] = useState([]);
  const [supportReplyText, setSupportReplyText] = useState({});
  const [loading, setLoading] = useState(false);


  /* ================= FETCH FUNCTIONS ================= */

  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setTotalUsers(data.data.totalUsers || 0);
        setTotalLoans(data.data.totalLoans || 0);
        setTotalContributions(data.data.totalContributions || 0);
        setPendingContributions(data.data.pendingContributions || 0);
        setTotalWithdrawals(data.data.totalWithdrawals || 0);
        setPendingWithdrawals(data.data.pendingWithdrawals || 0);
        setTotalInvestments(data.data.totalInvestments || 0);
        setPendingInvestments(data.data.pendingInvestments || 0);
        setPendingLoans(data.data.pendingLoans || 0);
      }
    } catch {
      setError("Failed to load stats");
    }
  }, []);

  const fetchLoans = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/loans`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLoans(data.data || []);
      setPendingLoans(
        data.data?.filter((l) => l.status === "pending").length || 0
      );
    } catch {
      setLoans([]);
    }
  };

    const fetchContributions = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/contributions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();

  console.log("ADMIN CONTRIBUTIONS RESPONSE:", data); 

  setContributions(data.data || []);
  setPendingContributions(
    data.data?.filter(c => c.status === "pending").length || 
0
  );
};

const approveContribution = async (contributionId) => {
  if (!contributionId) {
    console.error("Contribution ID is missing");
    return;
  }

  if (!confirm("Approve contribution?")) return;

  const token = localStorage.getItem("token");

  try {
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/admin/contributions/approve/${contributionId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchContributions(); // refresh table
    fetchStats();         // refresh dashboard cards
  } catch (err) {
    console.error("Approve contribution failed:", err);
  }
};




  const fetchInvestments = async () => {
    try {
       setLoading(true);

      const token = localStorage.getItem("token");

       console.log("FETCHING INVESTMENTS...");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/investments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

       console.log("INVESTMENTS RESPONSE STATUS:", res.status);

 console.log("INVESTMENTS RESPONSE STATUS:", res.status);

      setInvestments(data.data || []);
    } catch {

          console.error("FETCH INVESTMENTS ERROR:", err);
      setInvestments([]);
    } finally {
    setLoading(false);
  }
  };

  const fetchWithdrawals = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/withdrawals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setWithdrawals(data.data || []);
    } catch {
      setWithdrawals([]);
    }
  };

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/support-center/reports`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setReports(data.data || []);
    } catch {
      setReports([]);
    }
  };

  const fetchSupports = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/support`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("support fetch failed:",data);
        return;
      }
      setSupports(data.data || []);
    } catch (err) {
      console.error("Fetch supports error:",err);
    }
  };

  /* ================= ACTIONS ================= */

   const markInvestmentAsSeen = async (investmentId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/admin/investments/approve/${investmentId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Approval failed");
    }

    // ✅ update UI ONLY (no refetch, no disruption)
    setInvestments((prev) =>
      prev.map((inv) =>
        inv.investmentId === investmentId
          ? { ...inv, status: "successful" }
          : inv
      )
    );
  } catch (err) {
    console.error("Approve investment error:", err);
    alert(err.message);
  }
};




const approveLoan = async (id) => {
  if (!confirm("Approve loan?")) return;
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/loans/approve/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      fetchLoans();
      fetchStats();
    } else {
      alert("Failed to approve loan");
    }
  } catch (err) {
    console.error(err);
  }
};


  const rejectLoan = async (id) => {
  if (!confirm("Reject loan?")) return;

  const token = localStorage.getItem("token");

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/admin/loans/reject/${id}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "rejected" }),
      }
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      console.error("Reject failed:", data);
      alert(data.message || "Failed to reject loan");
      return;
    }

    fetchLoans();
    fetchStats();
  } catch (err) {
    console.error("Reject loan failed", err);
  }
};


    const approveWithdrawal = async (id) => {
    if (!confirm("Approve withdrawal?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${import.meta.env.VITE_API_URL}/api/admin/withdrawals/approve/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStats();
      fetchWithdrawals();
    } catch (err) {}
  };

  const sendReportReply = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/admin/support-center/reports/reply/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reply: replyText }),
      }
    );
    setReplyText("");
    fetchReports();
  };

  const sendSupportReply = async (id) => {
    if (!supportReplyText[id]) return;
    const token = localStorage.getItem("token");
    await fetch(`${import.meta.env.VITE_API_URL}/api/support/reply/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reply: supportReplyText[id] }),
    });
    setSupportReplyText((p) => ({ ...p, [id]: "" }));
    fetchSupports();
  };

  /* ================= EFFECT ================= */

  useEffect(() => {
    fetchStats();
    fetchReports();
    fetchSupports();
  }, [fetchStats]);

  useEffect(() => {
  console.log("ADMIN INVESTMENTS:", investments);
}, [investments]);


  /* ================= JSX ================= */

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">
        ADMIN DASHBOARD
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-6 rounded-xl mb-8">
          {error}
        </div>
      )}

      {/* STATS */}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        {/* Users */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-200">Total Users</p>
              <h2 className="text-3xl font-bold">{totalUsers}</h2>
            </div>
            <FiUsers className="text-4xl" />
          </div>
        </div>
        </div>

        <div
  onClick={() => {
    setShowContributions(!showContributions);
    if (!showContributions) fetchContributions();
    
  }}
  className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-2xl shadow-lg text-white cursor-pointer"
>
  <p>Total Contributions</p>
  <h2 className="text-3xl font-bold">{totalContributions}</h2>
  <p className="text-xs">{pendingContributions} pending</p>
  
</div>

        {/* Loans */}
        <div
          onClick={() => { setShowLoans(!showLoans); if (!showLoans) fetchLoans(); }}
          className="bg-gradient-to-r from-yellow-500 to-yellow-700 p-6 rounded-2xl shadow-lg text-white cursor-pointer hover:opacity-90 transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-200">Total Loans</p>
              <h2 className="text-3xl font-bold">{totalLoans}</h2>
              <p className="text-xs mt-1 text-gray-200">{pendingLoans} pending</p>
            </div>
            <FiDollarSign className="text-4xl" />
          </div>
        </div>

      {/* Investments */}
        <div
          onClick={() => {
  if (!showInvestments) {
    fetchInvestments();
  }
  setShowInvestments((prev) => !prev);
}}
          className="bg-gradient-to-r from-pink-500 to-pink-700 p-6 rounded-2xl shadow-lg text-white cursor-pointer hover:opacity-90 transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-200">Total Investments</p>
              <h2 className="text-3xl font-bold">{totalInvestments}</h2>
              <p className="text-xs mt-1 text-gray-200">{pendingInvestments} pending</p>
            </div>
            <FiDollarSign className="text-4xl" />
          </div>
        </div>

        {/* Withdrawals */}
        <div
          onClick={() => { setShowWithdrawals(!showWithdrawals); if (!showWithdrawals) fetchWithdrawals(); }}
          className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-2xl shadow-lg text-white cursor-pointer hover:opacity-90 transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-200">Total Withdrawals</p>
              <h2 className="text-3xl font-bold">{totalWithdrawals}</h2>
              <p className="text-xs mt-1 text-gray-200">{pendingWithdrawals} pending</p>
            </div>
            <FiDollarSign className="text-4xl" />
          </div>
        </div>

        {showContributions && (
  <div className="bg-white p-8 rounded-2xl shadow mb-12">
    <h2 className="text-2xl font-bold mb-6">Contribution Requests</h2>

    <table className="w-full">
      <thead className="bg-green-600 text-white">
        <tr>
          <th className="p-4">User</th>
          <th className="p-4">Amount</th>
          <th className="p-4">Status</th>
          <th className="p-4">Action</th>
        </tr>
      </thead>

      <tbody>
        {contributions.map(c => (
          <tr key={c.contributionId} className="border-b">
            <td className="p-4">{c.memberName}</td>
            <td className="p-4 font-bold">
              ₦{Number(c.amount).toLocaleString()}
            </td>

            <td className="p-4">
              <span className={`px-4 py-1 rounded-full ${
                c.status === "successful"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}>
                {c.status}
              </span>
            </td>

            <td className="p-4">
              {c.status === "pending" && (
                <button
                  onClick={() => approveContribution(c.contributionId)}
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  APPROVE
                </button>
              )}
            </td>
          </tr>
        
))}
      </tbody>
    </table>
  </div>
)}



        {/* LOANS SECTION */}
      {showLoans && (
        <div className="bg-white p-8 rounded-2xl shadow-2xl mb-12">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Loan Applications</h2>
          {loans.length === 0 ? (
            <p className="text-center py-20 text-gray-500 text-2xl">No loan applications yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-yellow-600 text-white">
                    <th className="p-6 text-left">User</th>
                    <th className="p-6 text-left">Amount</th>
                    <th className="p-6 text-left">Purpose</th>
                    <th className="p-6 text-left">Duration</th>
                    <th className="p-6 text-left">Status</th>
                    <th className="p-6 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan.loanId} className="border-b hover:bg-yellow-50">
                      <td className="p-6 font-bold">{loan.memberName}</td>
                      <td className="p-6 text-2xl font-bold text-yellow-600">
                        ₦{Number(loan.amount).toLocaleString()}
                      </td>
                      <td className="p-6">{loan.purpose}</td>
                      <td className="p-6">{loan.duration} months</td>
                      <td className="p-6">
                        <span className={`px-6 py-3 rounded-full font-bold ${
                          loan.status === "approved" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                        }`}>
                          {loan.status.toUpperCase()}
                        </span>
                      </td>
<td className="p-6 flex gap-4">
  {loan.status === "pending" ? (
    <>
      <button
        onClick={() => approveLoan(loan.loanId)}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-2xl font-bold text-lg"
      >
        APPROVE
      </button>
      <button
        onClick={() => rejectLoan(loan.loanId)}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-2xl font-bold text-lg"
      >
        REJECT
      </button>
    </>
  ) : (
    <span
      className={`font-bold text-lg ${
        loan.status === "approved" ? "text-green-600" : "text-red-600"
      }`}
    >
      {loan.status.toUpperCase()}
    </span>
  )}
</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    
      {/* INVESTMENTS SECTION */}
      {showInvestments && (
       <div className="mt-8 bg-white rounded-2xl p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Investment Requests</h2>

      {loading && (
        <p className="text-center text-gray-500">Loading investments...</p>
      )}

      {error && (
        <p className="text-center text-red-500 text-sm">{error}</p>
      )}

      {!loading && investments.length === 0 && (
        <p className="text-center text-gray-500">
          No investment requests yet.
        </p>
      )}

      {!loading && investments.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Member</th>
                <th className="p-3">Email</th>
                <th className="p-3">Project</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Start Date</th>
              </tr>
            </thead>

            <tbody>
              {investments.map((inv) => (
                <tr
                  key={inv.investmentId}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">
                    {inv.memberName}
                  </td>

                  <td className="p-3 text-gray-600">
                    {inv.memberEmail}
                  </td>

                  <td className="p-3">
                    {inv.projectName || "—"}
                  </td>

                  <td className="p-3 font-semibold">
                    ₦{Number(inv.amount).toLocaleString()}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          inv.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : inv.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {inv.status}
                    </span>
                  </td>

                  <td className="p-3 text-gray-600">
                    {inv.startDate
                      ? new Date(inv.startDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="p-4">
  {inv.status === "pending" ? (
    <button
      onClick={() => markInvestmentAsSeen(inv.investmentId)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm"
    >
      Seen
    </button>
  ) : (
    <span className="text-green-600 font-semibold text-sm">
      Successful
    </span>
  )}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )}

      {/* WITHDRAWALS SECTION */}
      {showWithdrawals && (
        <div className="bg-white rounded-2xl shadow-2xl p-10 mb-12">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Withdrawal Requests</h2>
          {/* Your existing withdrawals table */}
        </div>
      )}

      {/* ==================== REPORTS SECTION ==================== */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">User Reports</h2>

        {reports.length === 0 ? (
          <p className="text-center py-16 text-gray-500 text-xl">No reports submitted yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-red-600 to-red-800 text-white">
                  <th className="p-5 text-left">User</th>
                  <th className="p-5 text-left">Title</th>
                  <th className="p-5 text-left">Message</th>
                  <th className="p-5 text-left">Date</th>
                  <th className="p-5 text-left">Reply</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-red-50 transition">
                    <td className="p-5 font-medium">{report.user?.name || "Unknown"}</td>
                    <td className="p-5">{report.title}</td>
                    <td className="p-5 max-w-md">{report.message}</td>
                    <td className="p-5">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-5">
                      {report.reply ? (
                        <span className="text-green-600 font-medium">{report.reply}</span>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type reply..."
                            className="px-3 py-2 border rounded-lg w-48"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <button
                            onClick={() => sendReportReply(report.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                          >
                            Send
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==================== SUPPORT SECTION ==================== */}
<div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
  <h2 className="text-3xl font-bold mb-8 text-gray-800">Support Messages</h2>

  {supports.length === 0 ? (
    <p className="text-center py-16 text-gray-500 text-xl">
      No support messages yet
    </p>
  ) : (
    <div className="overflow-x-auto">
      {console.log("SUPPORTS.", supports)}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <th className="p-5 text-left">User</th>
            <th className="p-5 text-left">Message</th>
            <th className="p-5 text-left">Date</th>
            <th className="p-5 text-left">Reply</th>
          </tr>
        </thead>

        <tbody>
          {supports.map((support) => (
            <tr
              key={`support-${support.id}`}
              className="border-b hover:bg-blue-50 transition"
            >
              <td className="p-5 font-medium">
                {support.user?.name || "Unknown"}
              </td>

              <td className="p-5 max-w-md">{support.message}</td>

              <td className="p-5">
                {new Date(support.createdAt).toLocaleDateString()}
              </td>

              <td className="p-5">
  {support.reply && support.reply.trim() !== "" ? (
    <div className="text-green-600 font-medium">
      {support.reply}
    </div>
  ) : (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={supportReplyText[`support-${support.id}`] || ""}
        onChange={(e) =>
          setSupportReplyText((prev) => ({
            ...prev,
            [`support-${support.id}`]: e.target.value,
          }))
        }
        placeholder="Type reply..."
        className="px-3 py-2 border rounded-lg w-56"
      />
      <button
        onClick={() => sendSupportReply(`support-${support.id}`)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
      >
        Send
      </button>
    </div>
  )}
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
</div>
    )}
export default Admin;

