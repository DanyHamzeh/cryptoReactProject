import React, { useEffect, useState, useRef } from "react";
import Footer from "../../components/footer/footer";
import LandingPage from "../../components/LandingPage/landingPage";
import TopHeader from "../../components/TopHeader/topHeader";
import classes from "./depPayment.module.scss";
import { useTranslation } from "react-i18next";
import { collectInvApi, depositeAddressApi } from "../../Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import logo from "../../assets/images/logo.png";

function DepPayment() {
  const [withDrawId, setWithDrawId] = useState("");
  const [depositeAddress, setDepositeAddress] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const { t } = useTranslation();
  const token = localStorage.getItem("token"); // Check if the token exists
  const tokenLogin = localStorage.getItem("tokenLogin"); // Check if the token exists
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";
  const navigate = useNavigate();
  const [copyStatus, setCopyStatus] = useState(t("COPY"));
  const textToCopyRef = useRef(null);

  useEffect(() => {
    i18next.init({
      lng: selectedLanguage,
      fallbackLng: "ENGLISH",
      interpolation: {
        escapeValue: false,
      },
    });
  }, []);

  const withDrawHandler = (event) => {
    setWithDrawId(event.target.value);
    // if (/^[a-zA-Z0-9]*$/.test(inputValue)) {
    //   setWithDrawId(inputValue);
    // }
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
            if (response.data.errorCode == "invalidUserToken") {
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

  // const handleCopyClick = (e) => {

  //   e.preventDefault();
  //   if (textToCopyRef.current) {
  //     const textToCopy = textToCopyRef.current.value;
  //     console.log("copyMessage",textToCopyRef.current.value);

  //     const textArea = document.createElement("textarea");
  //     textArea.value = textToCopy;
  //     document.body.appendChild(textArea);
  //     textArea.select();
  //     // document.execCommand(t("COPY"));
  //     // document.body.removeChild(textArea);
  //     setCopyStatus(t("Copied"));
  //   }
  // };

  const handleCopyClick = async (e) => {
    e.preventDefault();

    if (textToCopyRef.current) {
      const textToCopy = textToCopyRef.current.value;

      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopyStatus(t("Copied"));
      } catch (err) {
        console.error("Unable to copy text: ", err);
        setCopyStatus(t("Copy failed"));
      }
    }
  };

  const confirmDeposite = () => {
    if (token || tokenLogin) {
      if (withDrawId.trim() === "") {
        setMessage(t("fillEmpty"));
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
              setStatus(response.data.status);
              setWithDrawId("");
            } else {
              setLoader();
              setMessage(response.data.message);
              if (response.data.errorCode == "invalidUserToken") {
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
          })
          .finally(() => {
            setLoader(false); // Reset loading state after API call is completed
          });
      }
    }
    if (status === 0) {
      setStatus(-1);
    }
  };

  return (
    <>
      <Helmet>
        <title>Daily Trading Bot - Deposit Payment</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          key="description"
          content="Deposit funds securely with Daily Trading Bot and start trading cryptocurrencies. Explore our flexible payment options and top-up your account effortlessly."
        />
        <meta
          name="title"
          key="title"
          content="Daily Trading Bot - Deposit Payment"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Daily Trading Bot - Deposit Payment"
        />
        <meta property="og:site_name" content="Daily Trading Bot" />
        <meta property="og:locale" key="og:locale" content="en_US" />
        <meta charSet="utf-8" />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          key="og:description"
          content="Deposit funds securely with Daily Trading Bot and start trading cryptocurrencies. Explore our flexible payment options and top-up your account effortlessly."
        />
        <meta
          property="og:image"
          key="og:image"
          content={logo} // Assuming you have imported your logo as `logo`
        />
      </Helmet>
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
                  ref={textToCopyRef}
                />
                <button
                  className={classes.copyBtn}
                  onClick={(e) => {
                    handleCopyClick(e);
                    e.stopPropagation();
                  }}
                  type="button"
                >
                  {copyStatus}
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
                <button
                  className={classes.copyBtn}
                  onClick={confirmDeposite}
                  disabled={loader}
                >
                  {t("CONFIRM")}
                </button>
              </div>
            </div>
            <div className={classes.messageLoaderCont}>
              {message && (
                <span
                  className={
                    status == 0
                      ? classes.messageStyleFalse
                      : classes.messageStyle
                  }
                >
                  {message}
                </span>
              )}
              <div className={classes.loaderPosition}>
                {loader && <Loader />}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DepPayment;
