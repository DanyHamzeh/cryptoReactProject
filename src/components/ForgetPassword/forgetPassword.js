import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AccountRecovered from "../AccountRecovered/accountRecovered";
import classes from "./forgetPassword.module.scss";
import eyeOpen from "../../assets/images/Vector (1).png";
import eyeClose from "../../assets/images/Vector (2).png";
import { useTranslation } from "react-i18next";
import { resetUserPassApi } from "../../Api";
import Loader from "../Loader/Loader";
import axios from "axios";

function ForgetPassword(props) {
  const [showAccountRecovered, setShowAccountRecovered] = useState(false);
  const [showPicker, setShowPicker] = useState("close");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [selected, setSelected] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [userName, setUserName] = useState(null);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState(null);


  const { t } = useTranslation();
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";

  const options = [t("favouritePet"), t("favouriteColor"), t("codeCreate")];

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordHandler = (event) => {
    setVerifyPassword(event.target.value);
  };

  const answerHandler = (event) => {
    setSecurityAnswer(event.target.value);
  };

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleClick1 = () => {
    setShowPassword1(!showPassword1);
  };

  const onClickPicker = () => {
    if (showPicker) {
      setShowPicker("open");
    }
    if (showPicker === "open") {
      setShowPicker("close");
    }
  };

  function handleClickRecovered() {
    setShowAccountRecovered((prev) => !prev);
  }

  const confirmHandler = () => {
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      verifyPassword.trim() === "" ||
      selected.trim() === "" ||
      securityAnswer.trim() === ""
    ) {
      setMessage(t("fillEmpty"));
    } else {
      console.log("111111111");
      let url = resetUserPassApi(selectedLanguage);
      setLoader(true);
      let resetUserObject = {
        email: email,
        password: password,
        verifyPassword: verifyPassword,
        securityQuestion: selected,
        securityAnswer: securityAnswer,
      };
      console.log("first", resetUserObject);
      axios
        .post(url, resetUserObject)
        .then((response) => {
          if (response.data.status === 0) {
            setLoader(false);
            setUserName(response.data.message);
            setStatus(response.data.status)
            handleClickRecovered();
            setMessage(null);
            setEmail("");
            setPassword("");
            setVerifyPassword("");
            setSecurityAnswer("");
            setSelected("");
          } else {
            setLoader();
            setMessage(response.data.message);
            console.log("second", response.data.message);
          }
        })
        .catch((error) => {
          setLoader(error.message);
          console.log("thhird", url);
        })
        .finally(() => {
          setLoader(false); // Reset loading state after API call is completed
        });
    }
    if(status === 0){
      setStatus(-1)
    }
  };

  return (
    <div className={classes.allContainer}>
      <div className={classes.titleClose}>
        <span className={classes.title}>RESET PASSWORD</span>
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
            onChange={emailHandler}
            value={email}
          />
        </div>
        <div className={classes.textInputStyle}>
          <span className={classes.textStyle}> {t("newPassword")}</span>
          <input
            type={showPassword1 ? "text" : "password"}
            className={classes.inputStyle}
            onChange={passwordHandler}
            value={password}
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
            onChange={confirmPasswordHandler}
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
        <div
          // className={classes.textInputStyleQuetion}
          className={`${classes.textInputStyleQuetion} ${[
            showPicker === "open"
              ? classes.textInputStyleQuetionNew
              : classes.textInputStyleQuetion,
          ]}`}
        >
          <div
            className={`${classes.firstBox} ${[
              showPicker === "open" ? classes.secondBox : classes.firstBox,
            ]}`}
            onClick={onClickPicker}
          >
            <div
              className={`${classes.inputStyleNew} ${[
                showPicker === "open"
                  ? classes.inputStyleNewOpen
                  : classes.inputStyleNew,
              ]}`}
            >
              {selected || t("securityQuestion")}
            </div>
            <FontAwesomeIcon
              className={classes.iconClose}
              icon={faChevronDown}
            />
          </div>
          {options.map((option,index) => {
            return (
              <div
              key={index}
                className={`${classes.secondBox} ${[
                  showPicker === "open"
                    ? classes.secondBox
                    : classes.secondBoxHide,
                ]}`}
                onClick={(e) => {
                  setSelected(option);
                  setShowPicker("close");
                }}
              >
                <span className={classes.textTest}>{option}</span>
                <div className={classes.lineSeperateNew} />
              </div>
            );
          })}
        </div>
        <div className={classes.textInputStyleAnswer}>
          <input
            type="text"
            className={classes.inputStyle}
            placeholder={t("answerhere")}
            onChange={answerHandler}
            value={securityAnswer}
          />
        </div>
      </div>
      <div className={classes.textBtnContainer}>
        <span className={classes.secureText}>{t("passwordMust")}</span>
        <div>
          <button className={classes.btnRejister} onClick={confirmHandler} disabled={loader}>
            {t("CONFIRM")}
          </button>
          {showAccountRecovered && (
            <AccountRecovered
              onClose={handleClickRecovered}
              userName={userName}
            />
          )}
        </div>
        <div className={classes.messageLoaderCont}>
        {message && <span className={status == 0 ? classes.messageStyleFalse :classes.messageStyle}>{message}</span>}
          <div className={classes.loaderPosition}>{loader && <Loader />}</div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
