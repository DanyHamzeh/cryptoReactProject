import React, { useState } from "react";
import classes from "./resetPassword.module.scss";
import eyeOpen from "../../assets/images/Vector (1).png";
import eyeClose from "../../assets/images/Vector (2).png";
import { useTranslation } from "react-i18next";
import { editUserPasswordApi } from "../../Api";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

function ResetPassword(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const [status, setStatus] = useState(null);


  const token = localStorage.getItem("token"); // Check if the token exists
  const tokenLogin = localStorage.getItem("tokenLogin"); // Check if the token exists

  const { t } = useTranslation();
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(token);
  //   console.log(newPassword);
  //   console.log(verifyPassword);
  //   console.log(oldPassword);

  // }, [token,verifyPassword,newPassword,oldPassword]);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleClick1 = () => {
    setShowPassword1(!showPassword1);
  };

  const oldPasswordHandle = (event) => {
    setOldPassword(event.target.value);
  };

  const newPasswordHandle = (event) => {
    setNewPassword(event.target.value);
  };

  const verifyPasswordHandle = (event) => {
    setVerifyPassword(event.target.value);
  };

  const confirmEditPassword = () => {
    if (
      oldPassword.trim() === "" ||
      newPassword.trim() === "" ||
      verifyPassword.trim() === ""
    ) {
      setMessage(t("fillEmpty"));
    } else {
      if (token || tokenLogin) {
        let url = editUserPasswordApi(selectedLanguage);
        setLoader(true);
        let editPasswordObject = {
          password: newPassword,
          oldPassword: oldPassword,
          token: token || tokenLogin,
          verifyPassword: verifyPassword,
        };
        console.log("first", editPasswordObject);
        axios
          .post(url, editPasswordObject)
          .then((response) => {
            if (response.data.status === 0) {
              setLoader(false);
              setMessage(response.data.message);
              setStatus(response.data.status)
              setNewPassword("");
              setOldPassword("");
              setVerifyPassword("");
              console.log("ahlann");
            } else {
              setLoader();
              setMessage(response.data.message);
              if (response.data.errorCode == "invalidUserToken") {
                console.log("ana fetet");
                navigate("/");
                localStorage.removeItem("token");
                localStorage.removeItem("tokenLogin");
              }
              console.log("second", response.data.message);
            }
          })
          .catch((error) => {
            setLoader(error.message);
            console.log("thhird", url);
          });
      }
    }
    if(status === 0){
      setStatus(-1)
    }
  };

  return (
    <div className={classes.allContainer}>
      <div className={classes.titleClose}>
        <span className={classes.title}>{t("resetPassword")}</span>
        <span className={classes.closeSign} onClick={props.onClose}>
          x
        </span>
      </div>
      <div className={classes.lineSeperate} />
      <div className={classes.inputAllCont}>
        <div className={classes.textInputStyle}>
          <span className={classes.textStyle}>{t("oldPassword")}</span>
          <input
            type="text"
            className={classes.inputStyle}
            onChange={oldPasswordHandle}
            value={oldPassword}
          />
        </div>
        <div className={classes.textInputStyle}>
          <span className={classes.textStyle}>{t("newPassword")}</span>
          <input
            type={showPassword1 ? "text" : "password"}
            className={classes.inputStyle}
            onChange={newPasswordHandle}
            value={newPassword}
          />
          {showPassword1 ? (
            <img
              src={eyeOpen}
              className={classes.eyeOpenStyle}
              onClick={handleClick1}
              alt=""
            />
          ) : (
            <img
              src={eyeClose}
              className={classes.eyeOpenStyleNew}
              onClick={handleClick1}
              alt=""
            />
          )}
        </div>
        <div className={classes.textInputStyle}>
          <span className={classes.textStyle}>{t("cPassword")}</span>
          <input
            type={showPassword ? "text" : "password"}
            className={classes.inputStyle}
            onChange={verifyPasswordHandle}
            value={verifyPassword}
          />
          {showPassword ? (
            <img
              src={eyeOpen}
              className={classes.eyeCLoseStyle}
              onClick={handleClick}
              alt=""
            />
          ) : (
            <img
              src={eyeClose}
              className={classes.eyeCLoseStyleNew}
              onClick={handleClick}
              alt=""
            />
          )}
        </div>
      </div>
      <div className={classes.textBtnContainer}>
        <span className={classes.secureText}>{t("passwordMust")}</span>

        <div onClick={confirmEditPassword}>
          <button className={classes.btnRejister}>{t("CONFIRM")}</button>
        </div>
      </div>
      <div className={classes.messageLoaderCont}>
        <div className={classes.loaderPosition}>{loader && <Loader />}</div>
        {message ? (
          <span
            className={
              status == 0 ? classes.messageStyleFalse : classes.messageStyle
            }
          >
            {message}
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
