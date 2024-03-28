import React, { useState } from "react";
import { Link } from "react-router-dom";
import SecureAccount from "../SecureAccount/secureAccount";
import classes from "./signUp.module.scss";
import eyeOpen from "../../assets/images/Vector (1).png";
import eyeClose from "../../assets/images/Vector (2).png";
// import LogInSecure from "../LogInSecure/logInSecure";
import { useEffect } from "react";
import LogIn from "../LogIn/logIn";
import { useTranslation } from "react-i18next";

function SignUp(props) {
  const [showSecureAccount, setShowSecureAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailName, setemailName] = useState("");
  const [passwordName, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [refferralCode, setRefferralCode] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState(null);

  const referralCodeFromLocalStorage = localStorage.getItem("referralCode");
  const [refferlNew, setRefferlNew] = useState(referralCodeFromLocalStorage);
  const { t } = useTranslation();

  const openLinkInNewTab = ( url ) => {
    const newTab = window.open(url, '_blank', 'noopener,noreferrer');
    if ( newTab ) newTab.opener = null;
  }

  const queryParams1 = new URLSearchParams(window.location.search);
  const vipCodeUrl = queryParams1.get("vipCode");

  useEffect(() => {
    if (vipCodeUrl) {
      console.log(`User came with referral code vip: ${vipCodeUrl}`);
      localStorage.setItem("vipCodeUrl", vipCodeUrl);
      localStorage.removeItem("token");
      localStorage.removeItem("tokenLogin");
    } else {
      localStorage.removeItem("vipCodeUrl");
    }
  }, [vipCodeUrl]);

  function handleClickLogIn() {
    setShowLogIn((prev) => !prev);
  }

  function handleClickSecureAccount() {
    setShowSecureAccount((prev) => !prev);
  }

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleClick1 = () => {
    setShowPassword1(!showPassword1);
  };

  const firstNameHandler = (event) => {
    const inputValue = event.target.value;

    if (/^[A-Za-z\s]*$/.test(inputValue)) {
      setFirstName(inputValue);
    }
  };

  const LastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const EmailHandler = (event) => {
    setemailName(event.target.value);
  };

  const PasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const ConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };
  const RefferralCodeHandler = (event) => {
    setRefferralCode(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const checkInfo = () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      emailName.trim() === "" ||
      passwordName.trim() === "" ||
      confirmPassword.trim() === "" ||
      // refferralCode.trim() === "" ||
      isChecked === false
    ) {
      setMessage(t("fillEmptyC"));
    } else {
      setMessage(null);
      handleClickSecureAccount();
    }
  };

  // useEffect(() => {
  //   console.log("refferlNew:", refferlNew);
  //   // console.log("hello", lastName);
  //   // console.log("hello", emailName);
  //   // console.log("hello", passwordName);
  //   // console.log("vipCodeStorage:", vipCodeStorage);
  //   console.log("refferralCode :", refferralCode);
  // }, [
  //   refferlNew,
  //   // lastName,
  //   // emailName,
  //   // passwordName,
  //   // confirmPassword,
  //   // vipCodeStorage,
  //   refferralCode,
  // ]);

  return (
    <div className={classes.allContainer}>
      <div className={classes.titleClose}>
        <span className={classes.title}>{t("signOutSent")}</span>
        <span className={classes.closeSign} onClick={props.onClose}>
          x
        </span>
      </div>
      <div className={classes.lineSeperate} />
      <div className={classes.textInputStyle}>
        <span className={classes.textStyle}>{t("fN")}</span>
        <input
          type="text"
          className={classes.inputStyle}
          onChange={firstNameHandler}
          value={firstName}
          id="first-name-input"
        />
      </div>
      <div className={classes.textInputStyle}>
        <span className={classes.textStyle}>{t("lN")}</span>
        <input
          type="text"
          id="last-name-input"
          className={classes.inputStyle}
          onChange={LastNameHandler}
          value={lastName}
        />
      </div>
      <div className={classes.textInputStyle}>
        <span className={classes.textStyle}>{t("eM")}</span>
        <input
          type="text"
          className={classes.inputStyle}
          onChange={EmailHandler}
          value={emailName}
        />
      </div>
      <div className={classes.textInputStyle}>
        <span className={classes.textStyle}>
          {t("PASSWORD")}
          <span className={classes.textStyleInside}>{t("passwordLogic")}</span>
        </span>
        <input
          type={showPassword ? "text" : "password"}
          className={classes.inputStyle}
          onChange={PasswordHandler}
          value={passwordName}
        />
        {showPassword ? (
          <img
            src={eyeOpen}
            className={classes.eyeOpenStyle}
            onClick={handleClick}
          />
        ) : (
          <img
            src={eyeClose}
            className={classes.eyeOpenStyleNew}
            onClick={handleClick}
          />
        )}
      </div>
      <div className={classes.textInputStyle}>
        <span className={classes.textStyle}> {t("cPassword")}</span>
        <input
          type={showPassword1 ? "text" : "password"}
          className={classes.inputStyle}
          onChange={ConfirmPasswordHandler}
          value={confirmPassword}
        />
        {showPassword1 ? (
          <img
            src={eyeOpen}
            className={classes.eyeCLoseStyle}
            onClick={handleClick1}
          />
        ) : (
          <img
            src={eyeClose}
            className={classes.eyeCLoseStyleNew}
            onClick={handleClick1}
          />
        )}
      </div>
      <div className={classes.textInputStyle}>
        <span className={classes.textStyle}> {t("rF")}</span>
        <input
          type="text"
          className={classes.inputStyleLast}
          onChange={RefferralCodeHandler}
          value={
            refferlNew != "null" && refferlNew != null
              ? refferlNew
              : refferralCode
          }
          // readOnly={!!refferlNew}
          readOnly={refferlNew != null && refferlNew != "null" ? true : false}
          // readOnly={false}
        />
      </div>
      <div className={classes.checkInputStyle}>
        {/* <input type="checkbox" className={classes.checkBox} /> */}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className={classes.checkBox}
        />
        <span className={classes.textBox}>
          {t("iHaveRead")}
          <span className={classes.textBoxInside} onClick={ () => openLinkInNewTab('/support')}>
            {t("tAC")}
          </span>
        </span>
      </div>
      {/* <div className={classes.secureCont}> */}
        {showSecureAccount && (
          <SecureAccount
            onClose={handleClickSecureAccount}
            firstName={firstName}
            lastName={lastName}
            emailName={emailName}
            passwordName={passwordName}
            confirmPassword={confirmPassword}
            refferralCode={refferralCode}
            refferlNew={refferlNew}
          />
        )}
      {/* </div> */}
      <button className={classes.btnRejister} onClick={checkInfo}>
        {t("cR")}
      </button>
      {message ? (
        <span className={classes.messageStyle}>{message}</span>
      ) : (
        <></>
      )}
      <div className={classes.confirmContainer}>
        <span className={classes.confirmMessage}>{t("alreacyHaveAn")}</span>
        <span className={classes.logInStyle} onClick={handleClickLogIn}>
          {t("LOGIN")}{" "}
        </span>
        <div className={classes.logInShow}>
          {showLogIn && <LogIn onClose={handleClickLogIn} />}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
