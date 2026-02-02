import React, { useState, useEffect } from "react";
import IntroCarousel from "./components/introcarousel.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/Signup.jsx";
import Menu from "./components/Menu.jsx";
import Admin from "./components/Admin.jsx";
import LoanSection from "./components/LoanSection.jsx";
import ReportSection from "./components/ReportSection.jsx";
import ContributionSection from "./components/ContributionSection.jsx";
import InvestmentSection from "./components/InvestmentSection.jsx";
import CommunitySection from "./components/CommunitySection.jsx";
import ProfileSection from "./components/ProfileSection.jsx";
import SettingSection from "./components/SettingSection.jsx";
import SupportSection from "./components/Supsection.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("intro");
  const [resetToken, setResetToken] = useState(null);
   const [totalContributions, setTotalContributions] = useState(0);
  const [totalInvestments, setTotalInvestments] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // ✅ Detect reset password link from email
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/reset-password/")) {
      const token = path.split("/reset-password/")[1];
      setResetToken(token);
      setCurrentPage("reset-password");
    }
  }, []);

  // ✅ Handle admin auth check safely (not during render)
  useEffect(() => {
    if (currentPage === "admin") {
      const role = localStorage.getItem("role");
      if (role !== "admin") {
        alert("Access denied — Admins only");
        setCurrentPage("menu");
      }
    }

  }, [currentPage]);

    /* ================= FETCH USER TOTALS ================= */
  useEffect(() => {
    const fetchUserTotals = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/financial-summary`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (res.ok && data.success) {
          setTotalContributions(data.data.totalContributions || 0);
          setTotalInvestments(data.data.totalInvestments || 0);
          setTotalWithdrawals(data.data.totalWithdrawals || 0);
        }
      } catch (err) {
        console.error("Failed to fetch user totals:", err);
      }
    };

    // Fetch once user enters menu
    if (currentPage === "menu") {
      fetchUserTotals();
    }
  }, [currentPage]);


  return (
    <>
      {currentPage === "intro" && (
        <IntroCarousel onGetStarted={() => handleNavigate("login")} />
      )}

      {currentPage === "login" && (
        <Login
          onLoginSuccess={() => handleNavigate("menu")}
          onGoToSignup={() => handleNavigate("signup")}
        />
      )}

      {currentPage === "signup" && (
        <Signup
          onSignupSuccess={() => handleNavigate("login")}
          onBackToLogin={() => handleNavigate("login")}
        />
      )}

      {currentPage === "reset-password" && (
        <ResetPassword
          token={resetToken}
          onBackToLogin={() => handleNavigate("login")}
        />
      )}

      {currentPage === "menu" && (
        <Menu
          onLogout={() => handleNavigate("login")}
          onGoToHome={() => handleNavigate("menu")}
          onGoToAdmin={() => handleNavigate("admin")}
          onGoToLoan={() => handleNavigate("loan")}
          onGoToReport={() => handleNavigate("report")}
          onGoToContribution={() => handleNavigate("contribution")}
          onGoToInvestment={() => handleNavigate("investment")}
          onGoToCommunity={() => handleNavigate("community")}
          onGoToProfile={() => handleNavigate("profile")}
          onGoToSettings={() => handleNavigate("settings")}
          onGoToSupport={() => handleNavigate("support")}

                 totalContributions={totalContributions}
          totalInvestments={totalInvestments}
          totalWithdrawals={totalWithdrawals}
        />
      )}

      

      {currentPage === "admin" && (
        <Admin onBack={() => handleNavigate("menu")} />
      )}

      {currentPage === "loan" && (
        <LoanSection onBack={() => handleNavigate("menu")} />
      )}
      {currentPage === "report" && (
        <ReportSection onBack={() => handleNavigate("menu")} />
      )}
      {currentPage === "investment" && (
        <InvestmentSection onBack={() => handleNavigate("menu")} />
      )}
      {currentPage === "contribution" && (
        <ContributionSection onBack={() => handleNavigate("menu")} />
      )}
      {currentPage === "community" && (
        <CommunitySection onBack={() => handleNavigate("menu")} />
      )}
      {currentPage === "profile" && (
        <ProfileSection onBack={() => handleNavigate("menu")} />
      )}
      {currentPage === "settings" && (
        <SettingSection onBack={() => handleNavigate("menu")} />
      )}
      {currentPage === "support" && (
        <SupportSection onBack={() => handleNavigate("menu")} />
      )}
    </>
  );
};

export default App;
