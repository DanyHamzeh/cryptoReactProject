import React, { useState } from "react";
import classes from "./reinvest.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { reinvestApi, userInvestmentApi } from "../../Api";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useEffect } from "react";

function WithDraw(props) {
  const [errorCode, setErrorCode] = useState(null);
  const [amount, setAmount] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const token = localStorage.getItem("token"); // Check if the token exists
  const tokenLogin = localStorage.getItem("tokenLogin"); // Check if the token exists
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";

  const amountHandler = (event) => {
    setAmount(event.target.value);
  };

  const balanceAmount = () => {
    let total = 0;
    if (amount) {
      total = props.amountToUse - amount;
    }
    props.setAmountToUse(total);
  };


  const investHandler = () => {
    const investmentAmount = parseFloat(amount);
    if (isNaN(investmentAmount)) {
      setMessage(t("fillEmpty"));
    } else if (investmentAmount > props.amountToUse) {
      setMessage(t("investmentShouldBalance"));
    } else {
      if (token || tokenLogin) {
        let url = reinvestApi(selectedLanguage);
        setLoader(true);

        let investObject = {
          token: token || tokenLogin,
          amount: parseFloat(amount),
          parentId: props.id,
        };
        console.log("first", investObject);
        axios
          .post(url, investObject)
          .then((response) => {
            if (response.data.status === 0) {
              setLoader(false);
              setMessage(response.data.message);
              setStatus(response.data.status)
              setAmount("");
              balanceAmount();
            } else {
              setMessage(response.data.message);
              setLoader();
              if (response.data.errorCode == "invalidUserToken") {
                console.log("ana fetet");
                navigate("/");
                localStorage.removeItem("token");
                localStorage.removeItem("tokenLogin");
              }
              console.log("second", url);
            }
          })
          .catch((error) => {
            // setLoader(error.message);
            console.log("thhirdddddd", error);
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
        <span className={classes.title}>{t("BALANCE")}</span>
        <span className={classes.title}>{props.amountToUse} USDT</span>
        <span className={classes.closeSign} onClick={props.onClose}>
          x
        </span>
      </div>
      <div className={classes.lineSeperate} />
      <div className={classes.giftContainer}>
        <div className={classes.firtBox}>
          <span className={classes.textGift}> {t("AMOUNT")}</span>
          <input
            type="text"
            className={classes.inputGift}
            onChange={amountHandler}
            value={amount}
          />
        </div>

        <div className={classes.btnsGift}>
          <button className={classes.btnSubmit} onClick={investHandler}>
            {t("INVEST")}
          </button>
        </div>
      </div>
      <div className={classes.messageLoaderCont}>
        {message && <span className={status == 0 ? classes.messageStyleFalse :classes.messageStyle}>{message}</span>}
        <div className={classes.loaderPosition}> {loader && <Loader />}</div>
      </div>
    </div>
  );
}

export default WithDraw;
