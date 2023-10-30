import React, { useEffect } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Investment from "./containers/Investments/investments";
import HowItWorks from "./containers/HowItWorks/howItworks";
import TermsCondition from "./containers/TermsCondition/termsCondition";
import Header from "./components/Header/header";
import DepPayment from "./containers/DepPayment/depPayment";
import Profile from "./containers/Profile/profile";
import LogIn from "./components/LogIn/logIn";
import { useNavigate } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");
  const tokenLogin = localStorage.getItem("tokenLogin"); // Check if the token exists
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const referralCode = queryParams.get("referralUrl");

  useEffect(() => {
    if (referralCode) {
      console.log(`User came with referral code code: ${referralCode}`);
      localStorage.setItem("referralCode", referralCode);
      localStorage.removeItem("token");
      localStorage.removeItem("tokenLogin");
    } else {
      console.log("tessstttdann");
      localStorage.removeItem("referralCode");
    }
  }, [referralCode]);


  return (
    <div className="body">
      {token || tokenLogin ? (
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/howItWorks" element={<HowItWorks />} />
          <Route path="/depPayment" element={<DepPayment />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<TermsCondition />} />
          <Route path="/logIn" element={<LogIn />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/support" element={<TermsCondition />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
