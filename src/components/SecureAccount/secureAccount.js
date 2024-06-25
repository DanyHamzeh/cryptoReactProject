import { faArrowLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { rejisterApi } from "../../Api";
import Loader from "../Loader/Loader";
import classes from "./secureAccount.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import logo from "../../assets/images/logo.png";

function SecureAccount(props) {
  const [showPicker, setShowPicker] = useState("close");
  const [selected, setSelected] = useState("");

  const [answerValue, setAnswerValue] = useState("");
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [hashToken, setHashToken] = useState(null);
  const vipCodeStorage = localStorage.getItem("vipCodeUrl");

  const navigate = useNavigate();
  const { t } = useTranslation();
  const options = [t("favouritePet"), t("favouriteColor"), t("codeCreate")];

  const onClickPicker = () => {
    if (showPicker) {
      setShowPicker("open");
    }
    if (showPicker === "open") {
      setShowPicker("close");
    }
  };

  const answerHandler = (event) => {
    setAnswerValue(event.target.value);
  };

  // useEffect(() => {
  //   console.log(hashToken);
  //   // console.log(answerValue);
  //   // console.log(props.firstName);
  // }, [hashToken]);

  const completeSecurity = () => {
    if (selected.trim() === "" || answerValue.trim() === "") {
      setMessage(t("fillEmpty"));
    } else {
      let url = rejisterApi(selectedLanguage);
      setLoader(true);
      let referralCodeValue = props.referralCode
        ? props.referralCode
        : props.refferlNew;

      if (vipCodeStorage) {
        referralCodeValue = "";
      }

      let rejisterObject = {
        firstName: props.firstName,
        lastName: props.lastName,
        password: props.passwordName,
        verifyPassword: props.confirmPassword,
        email: props.emailName,
        referralCode: referralCodeValue,
        securityQuestion: selected,
        securityAnswer: answerValue,
        vipCode: vipCodeStorage ? vipCodeStorage : "",
      };
      console.log("first", rejisterObject);
      axios
        .post(url, rejisterObject)
        .then((response) => {
          if (response.data.status === 0) {
            navigate("/howItWorks");
            setLoader(false);
            setHashToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            console.log(hashToken);
          } else {
            setLoader();
            setMessage(response.data.message);
            console.log("second", rejisterObject);

            console.log("second", url);
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
  };

  return (
    <>
      <Helmet>
        <title>Daily Trading Bot - Secure Account</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          key="description"
          content="Manage your security questions and enhance the privacy of your Daily Trading Bot account. Ensure the security of your personal information by setting up security questions."
        />
        <meta
          name="title"
          key="title"
          content="Daily Trading Bot - Secure Account"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Daily Trading Bot - Secure Account"
        />
        <meta property="og:site_name" content="Daily Trading Bot" />
        <meta property="og:locale" key="og:locale" content="en_US" />
        <meta charSet="utf-8" />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          key="og:description"
          content="Manage your security questions and enhance the privacy of your Daily Trading Bot account. Ensure the security of your personal information by setting up security questions."
        />
        <meta
          property="og:image"
          key="og:image"
          content={logo} // Assuming you have imported your logo as `logo`
        />
      </Helmet>
      <div className={classes.allContainer}>
        <div className={classes.titleClose}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={classes.flashSign}
            onClick={props.onClose}
          />
          <span className={classes.title}>{t("SYA")}</span>
        </div>
        <div className={classes.lineSeperate} />
        <div className={classes.inputAllCont}>
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
            {options.map((option, index) => {
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
              value={answerValue}
            />
          </div>
        </div>
        <div className={classes.textBtnContainer}>
          <div>
            <button
              className={classes.btnRejister}
              onClick={completeSecurity}
              disabled={loader}
            >
              {t("CSS")}
            </button>
          </div>
          <div className={classes.messageLoaderCont}>
            {message && <span className={classes.messageStyle}>{message}</span>}
            <div className={classes.loaderPosition}>{loader && <Loader />}</div>
          </div>
          <span className={classes.secureText}>{t("accountLost")}</span>
        </div>
      </div>
    </>
  );
}

export default SecureAccount;
