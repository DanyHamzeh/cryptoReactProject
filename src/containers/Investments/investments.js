import React, { useState } from "react";
import Footer from "../../components/footer/footer";
import NewTopHeader from "../../components/NewTopHeader.js/newTopHeader";
// import TopHeader from "../../components/NewTopHeader.js/newTopHeader";
import Warning from "../../components/Warning/warning";
import classes from "./investments.module.scss";
import { useTranslation } from "react-i18next";
import WithDraw from "../../components/WithDraw/withDraw";
import Reinvest from "../../components/Reinvest/reinvest";
import { userInvestmentApi } from "../../Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import i18next from "i18next";

function Investment(props) {
  const [showWarning, setShowWarning] = useState(false);
  const [showWithDraw, setShowWithDraw] = useState(false);
  const [showReinvest, setShowReinvest] = useState(false);
  const [loader, setLoader] = useState(false);
  const [invests, setInvests] = useState([]);
  const [errorCode, setErrorCode] = useState(null);
  const [amountToUse, setAmountToUse] = useState(null);
  const [id, setId] = useState(null);
  const [gift, setGift] = useState(null);
  const [showBtn1, setShowBtn1] = useState("close");

  const { t } = useTranslation();
  const token = localStorage.getItem("token"); // Check if the token exists
  const tokenLogin = localStorage.getItem("tokenLogin"); // Check if the token exists
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";
  const navigate = useNavigate();

  useEffect(() => {
    i18next.init({
      lng: selectedLanguage,
      fallbackLng: "ENGLISH",
      interpolation: {
        escapeValue: false,
      },
    });
  }, []);

  function handleClickWarning() {
    setShowWarning((prev) => !prev);
  }

  function withDrawHandler(index, amountToUse, id, type) {
    setShowWithDraw((prev) => !prev);
    setAmountToUse(amountToUse);
    setId(id);
    setGift(type);

    if (token || tokenLogin) {
      let url = userInvestmentApi(selectedLanguage);
      let userInvestObject = {
        token: token || tokenLogin,
      };
      axios
        .post(url, userInvestObject)
        .then((response) => {
          if (response.data.status === 0) {
            const investments = response.data.investmentList.map((invest) => {
              return invest.parentInv;
            });
            setInvests(investments);
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
  }

  function reinvestHandler(index, amountToUse, id) {
    setShowReinvest((prev) => !prev);
    setAmountToUse(amountToUse);
    setId(id);
    if (token || tokenLogin) {
      let url = userInvestmentApi(selectedLanguage);
      let userInvestObject = {
        token: token || tokenLogin,
      };
      axios
        .post(url, userInvestObject)
        .then((response) => {
          if (response.data.status === 0) {
            const investments = response.data.investmentList.map((invest) => {
              return invest.parentInv;
            });
            setInvests(investments);
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
          // setLoader(error.message);
          console.log("thhird", error);
        });
    }
  }

  useEffect(() => {
    if (token || tokenLogin) {
      let url = userInvestmentApi(selectedLanguage);
      setLoader(true);

      let userInvestObject = {
        token: token || tokenLogin,
      };
      axios
        .post(url, userInvestObject)
        .then((response) => {
          if (response.data.status === 0) {
            const investments = response.data.investmentList.map((invest) => {
              return invest.parentInv;
            });
            setInvests(investments);
            setLoader(false);
          } else {
            setErrorCode(response.data.errorCode);
            if (errorCode === "invalidUserToken") {
              console.log("ana fetet");
              navigate("/");
              localStorage.removeItem("token");
              localStorage.removeItem("tokenLogin");
            }
            setLoader();

            console.log("second", url);
          }
        })
        .catch((error) => {
          // setLoader(error.message);
          console.log("thhird", error);
        });
    }
  }, [token, tokenLogin, selectedLanguage, errorCode, navigate]);

  return (
    <div>
      <NewTopHeader />
      <div className={classes.investmentContainer}>
        <div className={classes.insideContainer}>
          <table className={classes.allTable}>
            <tbody>
              <tr>
                <th className={classes.headerTitle}>{t("InvestmentID")}</th>
                <th className={classes.headerTitle}>{t("AMOUNT")}</th>
                <th className={classes.headerTitle}>{t("BALANCE")}</th>
                <th className={classes.headerTitle}>{t("TYPE")}</th>
                <th className={classes.headerTitle}>{t("waletType")}</th>
                <th className={classes.headerTitle}>{t("DATE")}</th>
              </tr>
              <tr className={classes.lineSeperate}>
                <th className={classes.lineSeperate}></th>
                <th className={classes.lineSeperate}></th>
                <th className={classes.lineSeperate}></th>
                <th className={classes.lineSeperate}></th>
                <th className={classes.lineSeperate}></th>
                <th className={classes.lineSeperate}></th>
                <th className={classes.lineSeperate}></th>
              </tr>
              {loader ? (
                <tr>
                  <td className={classes.messageLoaderCont} colSpan="6">
                    {loader && <Loader />}
                  </td>
                </tr>
              ) : (
                <>
                  {invests.map((invest, index) => (
                    <tr key={index}>
                      <td className={classes.headerCells}>{invest.id}</td>
                      <td className={classes.headerCells}>{invest.amount}</td>
                      <td className={classes.headerCells}>{invest.balance}</td>
                      <td className={classes.headerCells}>{invest.type}</td>
                      <td className={classes.headerCells}>
                        {invest.amount < 100 ? (
                          <span
                            className={classes.Warning}
                            onClick={handleClickWarning}
                          >
                            {t("WARNING")}
                          </span>
                        ) : (
                          invest.walletType || "-"
                        )}
                      </td>
                      <td className={classes.headerCells}>
                        {invest.dateCreatedStr}
                      </td>
                      <td className={classes.btnStylelarge}>
                        <button
                          // className={classes.btnStyle}
                          className={`${classes.btnStyle} ${[
                            invest.amount < 100 || showBtn1 === "open"
                              ? classes.btnStyle1
                              : classes.btnStyle,
                          ]}`}
                          onClick={() =>
                            withDrawHandler(
                              index,
                              invest.amountToUse,
                              invest.id,
                              invest.type
                            )
                          }
                        >
                          {t("WITHDRAW")}
                        </button>
                        {invest.amount < 100 ? (
                          ""
                        ) : (
                          <button
                            className={classes.btnStyle}
                            onClick={() =>
                              reinvestHandler(
                                index,
                                invest.amountToUse,
                                invest.id,
                                invest.amount
                              )
                            }
                          >
                            {t("REINVEST")}
                          </button>
                        )}
                        {showWarning && (
                          <Warning onClose={handleClickWarning} />
                        )}
                        {showWithDraw && (
                          <WithDraw
                            onClose={withDrawHandler}
                            amountToUse={amountToUse}
                            id={id}
                            gift={gift}
                            setAmountToUse={setAmountToUse}
                          />
                        )}
                        {showReinvest && (
                          <Reinvest
                            onClose={reinvestHandler}
                            amountToUse={amountToUse}
                            id={id}
                            setAmountToUse={setAmountToUse}
                          />
                        )}
                      </td>
                      <td className={classes.btnMobile}>
                        <button
                          // className={classes.btnStyleMobile}
                          className={`${classes.btnStyleMobile} ${[
                            invest.amount < 100 || showBtn1 === "open"
                              ? classes.btnStyleMobile1
                              : classes.btnStyleMobile,
                          ]}`}
                          onClick={() =>
                            withDrawHandler(
                              index,
                              invest.amountToUse,
                              invest.id,
                              invest.type
                            )
                          }
                        >
                          {t("WITHDRAW")}
                        </button>
                        {invest.amount < 100 ? (
                          ""
                        ) : (
                          <button
                            className={classes.btnStyleMobile}
                            onClick={() =>
                              reinvestHandler(
                                index,
                                invest.amountToUse,
                                invest.id,
                                invest.amount
                              )
                            }
                          >
                            {t("REINVEST")}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default Investment;
