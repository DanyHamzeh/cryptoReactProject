import React, { useState } from "react";
import classes from "./withDraw.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { withDrawApi, userWalletApi, userInvestmentApi } from "../../Api";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useEffect } from "react";
import Creatable from "react-select/creatable";
import "../../sass/style.scss";

function WithDraw(props) {
  const [errorCode, setErrorCode] = useState(null);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [invests, setInvests] = useState([]);


  const navigate = useNavigate();
  const { t } = useTranslation();
  const token = localStorage.getItem("token"); // Check if the token exists
  const tokenLogin = localStorage.getItem("tokenLogin"); // Check if the token exists
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";

  const options = addresses.map((address, index) => ({
    value: `address_${index}`,
    label: address,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%", // Set the desired width
      border: "1px solid #ccc",
      borderRadius: "83px",
      padding: "2px 0 2px 0",
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

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const amountHandler = (event) => {
    setAmount(event.target.value);
  };



  useEffect(() => {
    if (token || tokenLogin) {
      let url = userWalletApi(selectedLanguage);
      let userWalletObject = {
        token: token || tokenLogin,
      };
      // console.log("first", userWalletObject);
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


  const withDrawHandler = () => {
    const investmentAmount = parseFloat(amount);
    if (isNaN(investmentAmount) || selectedValue=== "") {
      setMessage("PLEASE FILL EMPTY FIELDS");
    } else if (investmentAmount < 10) {
      setMessage("MINIMUM AMOUNT OF WITHDRAW IS 10 USDT");
    } else {
      if (token || tokenLogin) {
        let url = withDrawApi(selectedLanguage);
        setLoader(true);
        let withDrawObject = {
          token: token || tokenLogin,
          amount: amount,
          key: options.value,
          parentId: props.id,
          isGift: props.gift === "gift" ? true : false,
        };
        // console.log("first", withDrawObject);
        axios
          .post(url, withDrawObject)
          .then((response) => {
            if (response.data.status === 0) {
              setLoader(false);
              setMessage(response.data.message);
            } else {
              setMessage(response.data.message);
              setLoader();
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
            // setLoader(error.message);
            console.log("thhird", error);
          });
      }
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
        <div className={classes.firtBox}>
          <span className={classes.textGift}> {t("address")}</span>
          <Creatable
            options={options}
            value={selectedValue} // Set the value of the Select component
            onChange={handleSelectChange}
            styles={customStyles}
          />
        </div>
        <div className={classes.txtMessage}>
          <span className={classes.giftMessage}>
            Minimum amount of withdraw is 10 usdt
          </span>
        </div>

        <div className={classes.btnsGift}>
          <button className={classes.btnSubmit} onClick={withDrawHandler}>
            {t("WITHDRAW")}
          </button>
        </div>
      </div>
      <div className={classes.messageLoaderCont}>
        {message && <span className={classes.messageStyle}>{message}</span>}
        <div className={classes.loaderPosition}> {loader && <Loader />}</div>
      </div>
    </div>
  );
}

export default WithDraw;
