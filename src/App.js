import React, { useEffect, useState } from "react";
import "./App.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import Investment from "./containers/Investments/investments";
import HowItWorks from "./containers/HowItWorks/howItworks";
import TermsCondition from "./containers/TermsCondition/termsCondition";
import Header from "./components/Header/header";
import DepPayment from "./containers/DepPayment/depPayment";
import Profile from "./containers/Profile/profile";
import LogIn from "./components/LogIn/logIn";
import { useNavigate } from "react-router-dom";
import { checkSessionAPi } from "./Api";
import axios from "axios";
import Gifts from "./components/Gifts/gifts";

function App() {
  const token = localStorage.getItem("token");
  const tokenLogin = localStorage.getItem("tokenLogin"); // Check if the token exists
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const referralCode = queryParams.get("referralUrl");
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    if (token || tokenLogin) {
      let url = checkSessionAPi(selectedLanguage);
      let sessionObject = {
        token: token || tokenLogin,
      };
      console.log("token", sessionObject);

      axios
        .post(url, sessionObject)
        .then((response) => {
          console.log("response", response.data.status);

          if (response.data.status === 0) {
            console.log("status0", tokenLogin);
          } else {
            console.log("status-1", tokenLogin);
            console.log("ana fetet1");
            setErrorCode(response.data.errorCode);
            navigate("/");
            localStorage.removeItem("token");
            localStorage.removeItem("tokenLogin");
            if (response.data.errorCode === "invalidUserToken") {
              console.log("ana fetet");
              navigate("/");
              localStorage.removeItem("token");
              localStorage.removeItem("tokenLogin");
            }
            console.log("second", url);
          }
        })
        .catch((error) => {
          console.log("thhird", error);
        });
    }
  }, []);

  useEffect(() => {
    if (referralCode) {
      // console.log(`User came with referral code code: ${referralCode}`);
      localStorage.setItem("referralCode", referralCode);
      localStorage.removeItem("token");
      localStorage.removeItem("tokenLogin");
    } else {
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
          <Route path="/gifts" element={<Gifts />} />
        </Routes>
      ) : (
        <>
          {/* <Navigate to="/"  /> */}
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/support" element={<TermsCondition />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
