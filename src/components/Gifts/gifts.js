import React, { useEffect } from "react";
import classes from "./gifts.module.scss";
import { useTranslation } from "react-i18next";
import {
  getGiftBalanceApi,
  investGiftApi,
  userWalletApi,
  withDrawGiftApi,
} from "../../Api";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
// import Select from "react-select";
import Creatable from "react-select/creatable";
import "../../sass/style.scss";
import TopHeader from "../TopHeader/topHeader";
import Footer from "../footer/footer";
import LandingPage from "../LandingPage/landingPage";

function Gifts(props) {
  const [balanceAmount, setBalanceAmount] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const token = localStorage.getItem("token"); // Check if the token exists
  const tokenLogin = localStorage.getItem("tokenLogin"); // Check if the token exists
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";

  const options = addresses.map((address, index) => ({
    value: `address_${index}`,
    label: address,
  }));

  const amountHandler = (event) => {
    setAmount(event.target.value);
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    console.log("ssssss", addresses);
    console.log("sdsdsd", selectedValue);
    console.log("addd", selectedValue.label);
  }, [addresses, selectedValue, address]);

  useEffect(() => {
    if (token || tokenLogin) {
      let url = userWalletApi(selectedLanguage);
      let userWalletObject = {
        token: token || tokenLogin,
      };
      console.log("first", userWalletObject);
      axios
        .post(url, userWalletObject)
        .then((response) => {
          if (response.data.status === 0) {
            setAddresses(response.data.address);
          } else {
            setErrorCode(response.data.errorCode);
            if (errorCode === "invalidUserToken") {
              console.log("ana fetet");
              navigate("/");
              localStorage.removeItem("token");
              localStorage.removeItem("tokenLogin");
            }
            console.log("second", url);
          }
        })
        .catch((error) => {
          setLoader(error.message);
          console.log("thhird", error);
        });
    }
  }, []);

  const onOpen = () => {
    if (token || tokenLogin) {
      let url = getGiftBalanceApi(selectedLanguage);
      let getUserBalanceObject = {
        token: token || tokenLogin,
      };
      console.log("first", getUserBalanceObject);
      axios
        .post(url, getUserBalanceObject)
        .then((response) => {
          if (response.data.status === 0) {
            setBalanceAmount(response.data.balance);
          } else {
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
          console.log("thhird", error);
        });
    }
  };

  useEffect(() => {
    if (token || tokenLogin) {
      let url = getGiftBalanceApi(selectedLanguage);
      let getUserBalanceObject = {
        token: token || tokenLogin,
      };
      console.log("first", getUserBalanceObject);
      axios
        .post(url, getUserBalanceObject)
        .then((response) => {
          if (response.data.status === 0) {
            setBalanceAmount(response.data.balance);
          } else {
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
          console.log("thhird", error);
        });
    }
  }, [token, tokenLogin, selectedLanguage, errorCode, navigate]);

  const investHandler = () => {
    const investmentAmount = parseInt(amount);
    if (isNaN(investmentAmount)) {
      setMessage(t("fillEmpty"));
    } else if (investmentAmount <= 100) {
      setMessage(t("investmentShould"));
    } else {
      if (token || tokenLogin) {
        let url = investGiftApi(selectedLanguage);
        setLoader(true);

        let investObject = {
          token: token || tokenLogin,
          amount: parseFloat(amount),
        };
        console.log("first", investObject);
        axios
          .post(url, investObject)
          .then((response) => {
            console.log("second", response.data.status);

            if (response.data.status === 0) {
              setLoader(false);
              setMessage(response.data.message);
              setStatus(response.data.status);

              setAmount("");
              onOpen();
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
            console.log("thhird", error);
          });
      }
    }
    if (status === 0) {
      setStatus(-1);
    }
  };

  const withDrawHandler = () => {
    const investmentAmount = parseFloat(amount);
    if (isNaN(investmentAmount) || selectedValue === "") {
      setMessage(t("fillEmpty"));
    } else if (investmentAmount < 10) {
      setMessage(t("minimumAmount"));
    } else {
      if (token || tokenLogin) {
        let url = withDrawGiftApi(selectedLanguage);
        setLoader(true);
        let withDrawObject = {
          token: token || tokenLogin,
          amount: parseFloat(amount),
          key: selectedValue.label,
          gift: true,
          parentId: 0,
        };
        console.log("first", withDrawObject);
        axios
          .post(url, withDrawObject)
          .then((response) => {
            if (response.data.status === 0) {
              setLoader(false);
              setMessage(response.data.message);
              setStatus(response.data.status);
              onOpen();
              setAmount("");
              setSelectedValue("");
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
            console.log("thhird", error);
          });
      }
    }
    if (status === 0) {
      setStatus(-1);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%", // Set the desired width
      border: "1px solid #ccc",
      borderRadius: "83px",
      // padding: "2px 0 2px 0",
      margin: "auto",
      outline: "none",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000000",
      fontSize: "15px",
      fontFamily: "$boldfont",
      "@media (max-width: 768px)": {
        fontSize: "10px",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#000000",
    }),
    menu: (provided) => ({
      ...provided,
      width: "100%",
      backgroundColor: "#fff",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }),

    option: (provided) => ({
      ...provided,
      width: "100%",
      backgroundColor: "#fff",
      color: "black",
      fontSize: "15px",
      "&:hover": {
        backgroundColor: "#F9D03C",
      },
      "@media (max-width: 768px)": {
        fontSize: "10px",
      },
    }),
  };

  return (
    <div>
      <TopHeader />
        <LandingPage />
        <div className={classes.allContainer}>
        <div className={classes.titleClose}>
            <span className={classes.title}>{t("gifts")}</span>
          </div>
          <div className={classes.lineSeperate} />
          <div className={classes.giftContainer}>
            <div className={classes.firtBox}>
              <span className={classes.textGift}> {t("BALANCE")}</span>
              <div className={classes.inputGift}>{balanceAmount}</div>
            </div>
            <div className={classes.firtBox}>
              <span className={classes.textGift}> {t("AMOUNT")} </span>
              <input
                type="text"
                className={classes.inputGift}
                onChange={amountHandler}
                value={amount}
              />
            </div>

            <div className={classes.firtBox}>
              <span className={classes.textGift}> {t("address")}</span>
              <Creatable
                options={options}
                value={selectedValue} // Set the value of the Select component
                onChange={handleSelectChange}
                styles={customStyles}
              />
            </div>
            <div className={classes.textMessages}>
              <span className={classes.giftMessage}>{t("minimumAmount")} </span>
              <span className={classes.giftMessage}>
                {t("investmentShould")}
              </span>
            </div>
            <div className={classes.btnsGift}>
              <button className={classes.btnSubmit} onClick={withDrawHandler}>
                {t("WITHDRAW")}
              </button>
              <button className={classes.btnSubmit} onClick={investHandler}>
                {t("INVEST")}
              </button>
            </div>
          </div>
          <div className={classes.messageLoaderCont}>
            {message && (
              <span
                className={
                  status == 0 ? classes.messageStyleFalse : classes.messageStyle
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
      <Footer />
    </div>
  );
}

export default Gifts;
