import React from "react";
import Logo from "../../assets/images/logo.png";
import SignUp from "../SignUp/signUp";
import LogIn from "../LogIn/logIn";
import classes from "./topHeader.module.scss";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Gifts from "../Gifts/gifts";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../Api";
import axios from "axios";

function TopHeader() {
  const [mobilemenu, setmobilemenu] = useState("closed");
  const [btnstate, setbtnstate] = useState("");
  const [menulist, setmenulist] = useState("hidden");
  const [showSignup, setShowSignup] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [showPicker, setShowPicker] = useState("close");
  const [selected, setSelected] = useState(
    localStorage.getItem("myLanguage") || "ENGLISH"
  );
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";
  const defaultLanguage = "ENGLISH";
  const options = [
    "ENGLISH",
    "FRENCH",
    "ARABIC",
    "TURKISH",
    "SPANISH",
    "GERMAN",
    "PORTUGUESE",
    "RUSSIAN",
    "CHINESE",
    "KOREAN",
    "HINDI",
    "ITALIAN",
    "JAPANESE",
    "SWAHILI",
  ];

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Check if the token exists
  const tokenLogin = localStorage.getItem("tokenLogin"); // Check if the token exists

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setSelected(language);
    localStorage.setItem("myLanguage", language);
  };

  // const handleLogout = () => {
  //   // Remove the token from localStorage
  //   localStorage.removeItem("token");

  //   // Navigate to the login page or another appropriate route after logout
  //   // navigate('/'); // Redirect to the login page
  // };

  useEffect(() => {
    if (!selected || selected === "") {
      localStorage.setItem("myLanguage", defaultLanguage);
    }
  }, []);

  // useEffect(() => {
  //   console.log("sosos", selected);
  //   console.log("bobo", changeLanguage);
  // }, [selected, changeLanguage]);

  const onClickPicker = () => {
    if (showPicker) {
      setShowPicker("open");
    }
    if (showPicker === "open") {
      setShowPicker("close");
    }
  };

  const openmenu = () => {
    if (mobilemenu === "closed") {
      setmobilemenu("open");
      setbtnstate("open");
      setmenulist("visible");
    } else {
      setmobilemenu("closed");
      setbtnstate("closed");
      setmenulist("hidden");
    }
  };

  function handleClickLogin() {
    setShowLogIn((prev) => !prev);
  }

  function handleClickSignUp() {
    setShowSignup((prev) => !prev);
  }

  function handleClickGifts() {
    setShowGifts((prev) => !prev);
  }


  const logOutHandler = () => {
    if (token || tokenLogin) {
      let url = logoutApi(selectedLanguage);
      let logOutObject = {
        token: token || tokenLogin,
      };
      console.log("first", logOutObject);
      axios
        .post(url, logOutObject)
        .then((response) => {
          if (response.data.status === 0) {
            navigate("/");
            localStorage.removeItem("token");
            localStorage.removeItem("tokenLogin");
          } else {
            console.log("second", url);
          }
        })
        .catch(() => {
          console.log("thhird", url);
        });
    }
  };

  return (
    <div>
      <div className={classes.HeaderStyle}>
        <Link to="/">
          <img src={Logo} alt="app Logo" className={classes.logo_trading} />
        </Link>
        <div className={classes.listHeader}>
          <nav
            className={`${
              menulist === "visible"
                ? classes.menulistVisible
                : classes.menulistHiden
            }`}
          >
            {token || tokenLogin ? (
              <ul className={classes.ul_list}>
                <div className={classes.menueHiddenStyle}>
                  <div className={classes.lineSeperate} />
                  <li className={classes.navigateTabs}>
                    <Link to="/howItWorks" className={classes.list_word}>
                      {t("howItWorks")}
                    </Link>
                  </li>
                  <li className={classes.navigateTabs}>
                    <Link to="/depPayment" className={classes.list_word}>
                      {t("depositePay")}
                    </Link>
                  </li>
                  <li className={classes.navigateTabs}>
                    <Link
                      className={classes.list_word}
                      onClick={handleClickGifts}
                    >
                      {t("gifts")}
                    </Link>
                  </li>
                  {showGifts && <Gifts onClose={handleClickGifts} />}

                  <li className={classes.navigateTabs}>
                    <Link to="/investment" className={classes.list_word}>
                      {t("INVESTMENTS")}
                    </Link>
                  </li>
                </div>

                <div className={classes.menueHiddenStyle}>
                  <div className={classes.lineSeperate} />
                  <li className={classes.navigateTabs}>
                    <Link to="/profile" className={classes.list_word}>
                      {t("PROFILE")}
                    </Link>
                  </li>

                  <li className={classes.navigateTabs} onClick={logOutHandler}>
                    <Link to="/" className={classes.list_word}>
                      {t("signOut")}
                    </Link>
                  </li>
                </div>
              </ul>
            ) : (
              <span className={classes.noTokenMessage}>
             {t("menueClose")}
              </span>
            )}
          </nav>
        </div>
        <div className={classes.headerInfo}>
          <div className={classes.btnBurger}>
            {token || tokenLogin ? (
              <></>
            ) : (
              <>
                <div className={classes.testt}>
                  <div className={classes.languageCont}>
                    <span
                      className={classes.languageStyle}
                      onClick={onClickPicker}
                    >
                      {t("LANGUAGE")}
                    </span>
                  </div>

                  <div
                    className={`${
                      showPicker === "open"
                        ? classes.languageDownCont
                        : classes.languageDownContNew
                    }`}
                    style={{ borderRadius: "20px" }}
                  >
                    {options.map((option) => (
                      <div
                        key={option}
                        onClick={(e) => {
                          setSelected(option);
                          setShowPicker("close");
                          changeLanguage(option); // Call changeLanguage when an option is clicked
                        }}
                      >
                        <div className={classes.inputContainer}>
                          <span className={classes.downLanguages}>
                            {option}
                          </span>
                          <div className={classes.lineSeperateNew} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className={classes.btnStyle}
                  onClick={handleClickSignUp}
                >
                  {t("signUp")}
                </button>
                {showSignup && <SignUp onClose={handleClickSignUp} />}

                <button className={classes.btnStyle} onClick={handleClickLogin}>
                  {t("LOGIN")}
                </button>

                {showLogIn && <LogIn onClose={handleClickLogin} />}
              </>
            )}
          </div>
          <div className={classes.burgermenuContainer} onClick={openmenu}>
            <i
              className={`${
                btnstate === "open" ? classes.openbtn : classes.closebtn
              }`}
            ></i>
            <i
              className={`${
                btnstate === "open" ? classes.openbtn : classes.closebtn
              }`}
            ></i>
            <i
              className={`${
                btnstate === "open" ? classes.openbtn : classes.closebtn
              }`}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
