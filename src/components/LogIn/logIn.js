import React from "react";
import { useState } from "react";
import classes from "./logIn.module.scss";
import eyeClose from "../../assets/images/Vector (2).png";
import eyeOpen from "../../assets/images/Vector (1).png";
import { useTranslation } from "react-i18next";

import { loginApi } from "../../Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import ForgetPassword from "../ForgetPassword/forgetPassword";

function LogIn(props) {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailName, setEmailName] = useState("");
  const [passwordName, setPasswordName] = useState("");
  const [message, setMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";
  const navigate = useNavigate();

  const { t } = useTranslation();



  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const PasswordHandler = (event) => {
    setPasswordName(event.target.value);
  };

  function handleClickPassword() {
    setShowForgotPassword((prev) => !prev);
  }

  const EmailHandler = (event) => {
    setEmailName(event.target.value);
  };


  const logInHandle = () => {
    if (emailName.trim() === "" || passwordName.trim() === "") {
      setMessage(t("fillEmpty"))
    } else {
      let url = loginApi(selectedLanguage);
      setLoader(true);
      let loginObject = {
        username: emailName,
        password: passwordName,
      };
      console.log("first", loginObject);
      axios
        .post(url, loginObject)
        .then((response) => {
          if (response.data.status === 0) {
            navigate("/howItWorks");
            setLoader(false);
            localStorage.setItem("tokenLogin", response.data.token);
          } else {
            setLoader();
            setMessage(response.data.message);
          }
        })
        .catch((error) => {
          setMessage(error.message);
          setLoader(false);
          console.log("thhird", url);
        });
    }
  };

  return (
    <div className={classes.allContainer}>
      <div className={classes.titleClose}>
        <span className={classes.title}>{t("logYAcc")}</span>
        <span className={classes.closeSign} onClick={props.onClose}>
          x
        </span>
      </div>
      <div className={classes.lineSeperate} />
      <div className={classes.inputAllCont}>
        <div className={classes.textInputStyle}>
          <span className={classes.textStyle}>{t("eM")}</span>
          <input
            type="text"
            className={classes.inputStyle}
            onChange={EmailHandler}
            value={emailName ? emailName : ""}
          />
        </div>
        <div className={classes.textInputStyle}>
          <span className={classes.textStyle}>{t("PASSWORD")}</span>
          <input
            type={showPassword ? "text" : "password"}
            className={classes.inputStyle}
            onChange={PasswordHandler}
            value={passwordName ? passwordName : ""}
          />
          {showPassword ? (
            <img
              src={eyeOpen}
              className={classes.eyeOpenStyle}
              onClick={handleClick}
              alt=""
            />
          ) : (
            <img
              src={eyeClose}
              className={classes.eyeOpenStyleNew}
              onClick={handleClick}
              alt=""

            />
          )}
        </div>
      </div>
      <div className={classes.allcontInfo}>
        <div className={classes.btnLogin} onClick={logInHandle}>
          <button className={classes.btnRejister}>{t("LOGIN")}</button>
        </div>

        {/* <div> */}
        <span className={classes.secureText} onClick={handleClickPassword}>
          {t("fP")}
        </span>
        {showForgotPassword && <ForgetPassword onClose={handleClickPassword} />}
        {/* </div> */}
      </div>
      {message ? (
        <span className={classes.messageStyle}>{message}</span>
      ) : (
        <></>
      )}
      <div className={classes.loaderPosition}>{loader && <Loader />}</div>
    </div>
  );
}

export default LogIn;
