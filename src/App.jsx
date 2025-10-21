import React, { useState } from "react";
import IntroCarousel from "./components/introcarousel.jsx";
import Login from "./components/login.jsx";
import Menu from "./components/Menu.jsx";
import Admin from "./components/Admin.jsx";
import LoanSection from "./components/LoanSection.jsx";
import ReportSection from "./components/ReportSection.jsx";
import ContributionSection from "./components/ContributionSection.jsx";
import InvestmentSection from "./components/InvestmentSection.jsx";
import CommunitySection from "./components/CommunitySection.jsx";
import ProfileSection from "./components/ProfileSection.jsx";
import SettingSection from "./components/SettingSection.jsx";
import Signup from "./components/Signup.jsx";

import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("intro");

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Intro Page */}
      {currentPage === "intro" && (
        <IntroCarousel onGetStarted={() => handleNavigate("login")} />
      )}

      {/* Login Page */}
      {currentPage === "login" && (
        <Login onLoginSuccess={() => handleNavigate("menu")} />
      )}

      {/* Menu Page */}
      {currentPage === "menu" && (
       <Menu
  onGoToHome={() => handleNavigate("menu")}
  onGoToAdmin={() => handleNavigate("admin")}
  onGoToLoan={() => handleNavigate("loan")}
  onGoToReport={() => handleNavigate("report")}
  onGoToContribution={() => handleNavigate("contribution")}
  onGoToInvestment={() => handleNavigate("investment")}
  onGoToCommunity={() => handleNavigate("community")}
  onGoToProfile={() => handleNavigate("profile")}
   onGoToSettings={() => handleNavigate("settings")}
/>

      )}

      {/* Admin Section */}
      {currentPage === "admin" && (
        <Admin onBack={() => handleNavigate("menu")} />
      )}

      {/* Loan Section */}
      {currentPage === "loan" && (
        <LoanSection onBack={() => handleNavigate("menu")} />
      )}

      {/* Report Section */}
      {currentPage === "report" && (
        <ReportSection onBack={() => handleNavigate("menu")} />
      )}

      {/* Investment Section */}
      {currentPage === "investment" && (
        <InvestmentSection onBack={() => handleNavigate("menu")} />
      )}

      {/* Contribution Section */}
      {currentPage === "contribution" && (
        <ContributionSection onBack={() => handleNavigate("menu")} />
      )}
      {currentPage === "community" && (
  <CommunitySection onBack={() => handleNavigate("menu")} />
)}
{currentPage === "profile" && (
  <ProfileSection onBack={() => handleNavigate("menu")} />
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

    </>
  );
};

export default App;
