import React, { useEffect } from "react";
import Logo from "../../assets/images/logo.png";
import referralPic from "../../assets/images/Group 417.png";
import LogInLogo from "../../assets/images/Vector (3).png";
import classes from "./newTopHeader.module.scss";
import ProfileSmall from "../../assets/images/Group 231 (1).png";

import { useState } from "react";
import { Link } from "react-router-dom";
import Gifts from "../Gifts/gifts";
import { useTranslation } from "react-i18next";
import RefferalContainer from "../RefferralCont/refferalShow.js";

import { useNavigate } from "react-router-dom";
import { getUserInfoApi, logoutApi, getUserRefferalApi } from "../../Api";
import axios from "axios";

function NewTopHeader() {
  const [mobilemenu, setmobilemenu] = useState("closed");
  const [btnstate, setbtnstate] = useState("");
  const [menulist, setmenulist] = useState("hidden");
  // const [showGifts, setShowGifts] = useState(false);
  const [userName, setUserName] = useState(null);
  const [refferalUrl, setRefferalUrl] = useState(null);
  const [showReferralCode, setShowRefferalCode] = useState(false);
  const [errorCode, setErrorCode] = useState(null);

  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";

  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if the token exists
  const tokenLogin = localStorage.getItem("tokenLogin"); // Check if the token exists

  const { t } = useTranslation();

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

  function handleRefferalSHow() {
    setShowRefferalCode((prev) => !prev);
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
      console.log("Logout URL:", url);
      console.log("Logout Request Object:", logOutObject);

      axios
        .post(url, logOutObject)
        .then((response) => {
          console.log("Logout Response:", response.data);
          if (response.data.status === 0) {
            navigate("/");
            localStorage.removeItem("token");
            localStorage.removeItem("tokenLogin");
          } else {
            console.log("Logout failed");
          }
        })
        .catch((error) => {
          console.error("Logout Error:", error);
        });
    }
  };

  useEffect(() => {
    if (token || tokenLogin) {
      let url = getUserInfoApi(selectedLanguage);
      let getUserObject = {
        token: token || tokenLogin,
      };
      axios
        .post(url, getUserObject)
        .then((response) => {
          if (response.data.status === 0) {
            const user = response.data.user;
            setUserName(user.userName);
          } else {
            if (response.data.errorCode == "invalidUserToken") {
              console.log("ana fetet");
              navigate("/");
              localStorage.removeItem("token");
              localStorage.removeItem("tokenLogin");
            }
          }
        })
        .catch((error) => {
          console.log("thhird", error);
        });
    }
  }, [token, tokenLogin, selectedLanguage, errorCode, navigate]);

  useEffect(() => {
    if (token || tokenLogin) {
      let url = getUserRefferalApi(selectedLanguage);
      let getUserReferral = {
        token: token || tokenLogin,
      };
      axios
        .post(url, getUserReferral)
        .then((response) => {
          if (response.data.status === 0) {
            setRefferalUrl(response.data.message);
          } else {
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
  }, [token, tokenLogin, selectedLanguage, errorCode, navigate]);

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
                  <Link
                    to="/gifts"
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
          </nav>
        </div>
        <div className={classes.headerInfo}>
          <div className={classes.btnBurger}>
            <div className={classes.refAllCont} onClick={handleRefferalSHow}>
              <img
                src={referralPic}
                alt="app Logo"
                className={classes.refStyle}
              />
              <span className={classes.btReffferalStyle}> {t("rF")}</span>
              <div>
                {showReferralCode && (
                  <RefferalContainer
                    onClose={handleRefferalSHow}
                    refferalUrl={refferalUrl}
                  />
                )}
              </div>
            </div>
            <Link to="/">
              <div className={classes.refAllCont} onClick={logOutHandler}>
                <img
                  src={LogInLogo}
                  alt="app Logo"
                  className={classes.logInstyle}
                />
                <span className={classes.logInstyleText}>{t("LOGOUT")}</span>
              </div>
            </Link>
            <div className={classes.mobileUserCont}>
              <div>
                <span className={classes.userStyle}>{userName} </span>
              </div>
              <Link to="/profile">
                <div className={classes.refAllContNew}>
                  <img
                    src={ProfileSmall}
                    alt=""
                    className={classes.smallProfile}
                  />
                </div>
              </Link>
            </div>
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

export default NewTopHeader;
