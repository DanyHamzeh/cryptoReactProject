import React from "react";
import Logo from "../../assets/images/logo.png";
import SignUp from "../SignUp/signUp";
import LogIn from "../LogIn/logIn";
import classes from "./topHeader.module.scss";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import Gifts from "../Gifts/gifts";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../Api";
import axios from "axios";
import i18next from "i18next";
import ProfileSmall from "../../assets/images/Group 231 (1).png";

function TopHeader() {
  const [mobilemenu, setmobilemenu] = useState("closed");
  const [btnstate, setbtnstate] = useState("");
  const [menulist, setmenulist] = useState("hidden");
  const [showSignup, setShowSignup] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  // const [showGifts, setShowGifts] = useState(false);
  const [showPicker, setShowPicker] = useState("close");
  const [dropDown, setDropDown] = useState("hidden");
  const [dropDownUser, setDropDownUser] = useState("hidden");
  const [selected, setSelected] = useState(
    localStorage.getItem("myLanguage") || "ENGLISH"
  );
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";
  const defaultLanguage = "ENGLISH";
  const options = [
    { key: "ENGLISH", index: "ENGLISH", name: "ENGLISH" },
    { key: "FRENCH", index: "FRENCH", name: "FRANÇAIS" },
    { key: "ARABIC", index: "ARABIC", name: "العربية" },
    { key: "TURKISH", index: "TURKISH", name: "TÜRKÇE" },
    { key: "SPANISH", index: "SPANISH", name: "ESPAÑOL" },
    { key: "GERMAN", index: "GERMAN", name: "DEUTSCH" },
    { key: "PORTUGUESE", index: "PORTUGUESE", name: "PORTUGUÊS" },
    { key: "RUSSIAN", index: "RUSSIAN", name: "РУССКИЙ" },
    { key: "CHINESE", index: "CHINESE", name: "中国人" },
    { key: "KOREAN", index: "KOREAN", name: "한국인" },
    { key: "HINDI", index: "HINDI", name: "हिंदी" },
    { key: "ITALIAN", index: "ITALIAN", name: "ITALIANO" },
    { key: "JAPANESE", index: "JAPANESE", name: "日本語" },
    { key: "SWAHILI", index: "SWAHILI", name: "KISWAHILI" },
  ];
  const referralCodeFromLocalStorage = localStorage.getItem("referralCode");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Check if the token exists
  const tokenLogin = localStorage.getItem("tokenLogin"); // Check if the token exists

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setSelected(language);
    localStorage.setItem("myLanguage", language);
  };

  const location = useLocation();
  const isTermsAndConditionsPage = location.pathname === "/support";

  useEffect(() => {
    i18next.init({
      lng: selectedLanguage,
      fallbackLng: "ENGLISH",
      interpolation: {
        escapeValue: false,
      },
    });
  }, []);

  const openDropDown = () => {
    setDropDown((currentValue) =>
      currentValue === "visible" ? "hidden" : "visible"
    );
    setDropDownUser((currentValue) =>
      currentValue === "visible" ? "hidden" : "visible"
    );
  };

  useEffect(() => {
    if (referralCodeFromLocalStorage) {
      setShowSignup(true);
    } else if (isTermsAndConditionsPage) {
      setShowSignup(false);
    }
    // console.log("sssssssssssssss", referralCodeFromLocalStorage);
  }, [referralCodeFromLocalStorage, isTermsAndConditionsPage]);

  useEffect(() => {
    if (!selected || selected === "") {
      localStorage.setItem("myLanguage", defaultLanguage);
    }
  }, []);

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

  // function handleClickGifts() {
  //   setShowGifts((prev) => !prev);
  // }

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
                  <div className={classes.lineSeperateMobile} />

                  <li className={classes.navigateTabs}>
                    <Link to="/depPayment" className={classes.list_word}>
                      {t("depositePay")}
                    </Link>
                  </li>
                  <div className={classes.lineSeperateMobile} />

                  <li className={classes.navigateTabs}>
                    <Link  to="/gifts" 
                      className={classes.list_word}
                      // onClick={handleClickGifts}
                    >
                      {t("gifts")}
                    </Link>
                  </li>
                  <div className={classes.lineSeperateMobile} />

                  {/* {showGifts && <Gifts onClose={handleClickGifts} />} */}

                  <li className={classes.navigateTabs}>
                    <Link to="/investment" className={classes.list_word}>
                      {t("INVESTMENTS")}
                    </Link>
                  </li>
                  <div className={classes.lineSeperateMobile} />
                </div>

                <div className={classes.menueHiddenStyle}>
                  <div className={classes.lineSeperate} />
                  <li className={classes.navigateTabs}>
                    <Link to="/profile" className={classes.list_word}>
                      {t("PROFILE")}
                    </Link>
                  </li>
                  <div className={classes.lineSeperateMobile} />

                  <li className={classes.navigateTabs} onClick={logOutHandler}>
                    <Link to="/" className={classes.list_word}>
                      {t("signOut")}
                    </Link>
                  </li>
                  <div className={classes.lineSeperateMobile} />
                </div>
              </ul>
            ) : (
              <span className={classes.noTokenMessage}>{t("menueClose")}</span>
            )}
          </nav>
        </div>
        <div className={classes.headerInfo}>
          <div className={classes.btnBurger}>
            {token || tokenLogin ? (
              <></>
            ) : (
              <>
                {!isTermsAndConditionsPage && (
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
                      {options.map((option, index) => (
                        <div
                          key={option.index}
                          onClick={(index) => {
                            setSelected(option);
                            setShowPicker("close");
                            changeLanguage(option.index); // Call changeLanguage when an option is clicked
                          }}
                        >
                          <div className={classes.inputContainer}>
                            <span className={classes.downLanguages}>
                              {option.name}
                            </span>
                            <div className={classes.lineSeperateNew} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!isTermsAndConditionsPage && (
                  <div className={classes.mobileStyleBtn}>
                    <div className={classes.refAllContNew} onClick={openDropDown}>
                      <img
                        src={ProfileSmall}
                        alt=""
                        className={classes.smallProfile}
                      />
                    </div>
                    <div
                      className={`${
                        dropDownUser === "visible"
                          ? classes.dropDownVisible
                          : classes.dropDownHidden
                      }`}
                    >
                      <button
                        className={classes.btnStyle}
                        onClick={handleClickSignUp}
                      >
                        {t("signUp")}
                      </button>
                      <button
                        className={classes.btnStyle}
                        onClick={handleClickLogin}
                      >
                        {t("LOGIN")}
                      </button>
                    </div>
                  </div>
                )}

                {showSignup && <SignUp onClose={handleClickSignUp} />}

                {showLogIn && <LogIn onClose={handleClickLogin} />}
              </>
            )}
          </div>
          {!isTermsAndConditionsPage && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
