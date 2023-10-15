import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import LandingPage from "../../components/LandingPage/landingPage";
import TopHeader from "../../components/TopHeader/topHeader";
import classes from "./depPayment.module.scss";
import { useTranslation } from "react-i18next";
import { collectInvApi, depositeAddressApi } from "../../Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function DepPayment() {
  const [withDrawId, setWithDrawId] = useState("");
  const [depositeAddress, setDepositeAddress] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");

  const { t } = useTranslation();
  const token = localStorage.getItem("token"); // Check if the token exists
  const tokenLogin = localStorage.getItem("tokenLogin"); // Check if the token exists
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";
  const navigate = useNavigate();

  const withDrawHandler = (event) => {
    const inputValue = event.target.value;

    // Use a regular expression to check if the input contains only letters (no numbers or special characters) or is empty
    if (/^[0-9]*$/.test(inputValue)) {
      setWithDrawId(inputValue);
    }
  };

  useEffect(() => {
    if (token || tokenLogin) {
      let url = depositeAddressApi(selectedLanguage);
      let depositeAddressObject = {
        token: token || tokenLogin,
      };
      console.log("first", depositeAddressObject);
      axios
        .post(url, depositeAddressObject)
        .then((response) => {
          if (response.data.status === 0) {
            setDepositeAddress(response.data.depositAddress);
          } else {
            if (errorCode === "invalidUserToken") {
              console.log("ana fetet");
              navigate("/");
              localStorage.removeItem("token");
              localStorage.removeItem("tokenLogin");
            }
          }
        })
        .catch(() => {
          console.log("thhird", url);
        });
    }
  }, []);

  const handleCopyClick = () => {
    if (depositeAddress) {
      // Copy the address to the clipboard
      navigator.clipboard
        .writeText(depositeAddress)
        .then(() => {
          setIsCopied(true); // Set the copied state to true
          setTimeout(() => {
            setIsCopied(false);
          }, 10000);
        })
        .catch((error) => {
          console.error("Error copying to clipboard: ", error);
        });
    }
  };

  const confirmDeposite = () => {
    if (token || tokenLogin) {
      if (withDrawId.trim() === "") {
        setMessage("PLEASE FILL EMPTY FIELDS");
      } else {
        let url = collectInvApi(selectedLanguage);
        setLoader(true);
        let collectObject = {
          token: token || tokenLogin,
          withdrawId: withDrawId,
        };
        console.log("first", collectObject);
        axios
          .post(url, collectObject)
          .then((response) => {
            if (response.data.status === 0) {
              setLoader(false);
              setMessage(response.data.message);
            } else {
              setLoader();
              setMessage(response.data.message);
              if (errorCode === "invalidUserToken") {
                console.log("ana fetet");
                navigate("/");
                localStorage.removeItem("token");
                localStorage.removeItem("tokenLogin");
              }
            }
          })
          .catch((error) => {
            setLoader(error.message);
            console.log("thhird", url);
          });
      }
    }
  };

  return (
    <div>
      <TopHeader />
      <div className={classes.landPage}>
        <LandingPage />
        <div className={classes.depositPayment}>
          <div className={classes.addressContainer}>
            <span className={classes.title}>{t("depositePay")}</span>
          </div>
          <div>
            <span className={classes.subTitle}>{t("depositeAddres")}</span>
            <div className={classes.subInput}>
              <input
                type="text"
                className={classes.inputStyle}
                value={depositeAddress || ""}
                readOnly
              />
              <button className={classes.copyBtn} onClick={handleCopyClick}>
                {isCopied ? t("Copied") : t("COPY")}
              </button>
            </div>
          </div>
          <div>
            <span className={classes.subTitle}>{t("withDrawId")}</span>
            <div className={classes.subInput}>
              <input
                type="text"
                className={classes.inputStyleSecond}
                onChange={withDrawHandler}
                value={withDrawId}
              />
              <button className={classes.copyBtn} onClick={confirmDeposite}>
                {t("CONFIRM")}
              </button>
            </div>
          </div>
          <div className={classes.messageLoaderCont}>
            {message && <span className={classes.messageStyle}>{message}</span>}
            <div className={classes.loaderPosition}>{loader && <Loader />}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DepPayment;
