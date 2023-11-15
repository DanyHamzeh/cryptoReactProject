import React, { useState } from "react";
// import TopHeader from "../../components/TopHeader/topHeader";
import Footer from "../../components/footer/footer";
import classes from "./howItworks.module.scss";
import NewTopHeader from "../../components/NewTopHeader.js/newTopHeader";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import i18next from "i18next";
import { getUserInfoApi } from "../../Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HowItWorks() {
  const { t } = useTranslation();
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const tokenLogin = localStorage.getItem("tokenLogin"); // Check if the token exists
  const vipCode = localStorage.getItem("vipCodeUrl");
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";
  const [isVip, setisVip] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
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

  useEffect(() => {
    if (token || tokenLogin) {
      let url = getUserInfoApi(selectedLanguage);
      let getUserObject = {
        token: token || tokenLogin,
      };
      console.log(selectedLanguage);
      axios
        .post(url, getUserObject)
        .then((response) => {
          if (response.data.status === 0) {
            const user = response.data.user;
            setisVip(user.isVip);
            // setFirstName(user.firstName);

            // setErrorCode(response.data.errorCode);
          } else {
            if (response.data.errorCode == "invalidUserToken") {
              console.log("ana fetet");
              navigate("/");
              localStorage.removeItem("token");
              localStorage.removeItem("tokenLogin");
            }
            console.log("second", errorCode);
          }
        })
        .catch((error) => {
          // setLoader(error.message);
          console.log("thhird", error);
        });
    }
  }, [token, tokenLogin, selectedLanguage, errorCode, navigate]);

  useEffect(() => {
    console.log(token);
    console.log(tokenLogin);
    console.log("vipcode", vipCode);
    console.log("vipcode", isVip);
  }, [token, tokenLogin, vipCode, isVip]);

  return (
    <div>
      <NewTopHeader />
      <div className={classes.howItWorksContainer}>
        <div
          className={
            selectedLanguage === "ARABIC"
              ? classes.insideContainerArabic
              : classes.insideContainer
          }
        >
          <div className={classes.allCont}>
            <span
              className={
                selectedLanguage === "ARABIC"
                  ? classes.titleArabic
                  : classes.title
              }
            >
              {t("how1")}
            </span>
          </div>
          <div>
            <span
              className={
                selectedLanguage === "ARABIC"
                  ? classes.subTitleArabic
                  : classes.subTitle
              }
            >
              {t("how2")}
            </span>
            <div className={classes.allParagraph}>
              <span
                className={
                  selectedLanguage === "ARABIC"
                    ? classes.paragraphArabic
                    : classes.paragraph
                }
              >
                {t("how3")}
              </span>
              <span
                className={
                  selectedLanguage === "ARABIC"
                    ? classes.subTitleArabic
                    : classes.subTitle
                }
              >
                {t("how4")}
              </span>
              <div
                className={
                  selectedLanguage === "ARABIC"
                    ? classes.numberPercentageContArabic
                    : classes.numberPercentageCont
                }
              >
                <div className={classes.amountStyle}>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.subTitleArabic
                        : classes.subTitle
                    }
                  >
                    {t("how5")}
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [99; 150)
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [150; 225)
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [225; 338)
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [338; 506)
                  </span>

                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [506; 759)
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [759; 1139)
                  </span>

                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [1139; 1709)
                  </span>

                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [1709; 2563)
                  </span>

                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [2563; 3844)
                  </span>

                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [3844; 5767)
                  </span>

                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [5767; 8650)
                  </span>

                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [8650; 12975)
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [12975; 19462)
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [19462; 29193)
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [29193; 43789)
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [43789; 65684)
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [65684; 100000)
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    [100000; +∞)
                  </span>
                </div>
                <div className={classes.amountStyle1}>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.subTitleArabic
                        : classes.subTitle
                    }
                  >
                    {t("how6")}
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    5%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    5.4%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    5.8%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    6.2%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    6.7%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    7.2%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    7.7%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    8.3%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    8.9%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    9.6%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    10.3%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    11%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    11.9%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    12.8%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    13.8%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    14.8%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    15.9%
                  </span>
                  <span
                    className={
                      selectedLanguage === "ARABIC"
                        ? classes.paragraphArabic
                        : classes.paragraph
                    }
                  >
                    17%
                  </span>
                </div>
              </div>
              <span
                className={
                  selectedLanguage === "ARABIC"
                    ? classes.subTitleArabic
                    : classes.subTitle
                }
              >
                {t("how7")}
              </span>
            </div>
          </div>
          <div>
            <span
              className={
                selectedLanguage === "ARABIC"
                  ? classes.subTitleArabic
                  : classes.subTitle
              }
            ></span>
            <div className={classes.allParagraph}>
              {isVip === true ? (
                ""
              ) : (
                <span
                  className={
                    selectedLanguage === "ARABIC"
                      ? classes.paragraphArabic
                      : classes.paragraphVip
                  }
                >
                  {t("how8")}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className={classes.allParagraph}>
              {isVip === true ? (
                <span className={classes.paragraphVip}>{t("how9")}</span>
              ) : (
                ""
              )}

              <span
                className={
                  selectedLanguage === "ARABIC"
                    ? classes.subTitleArabic
                    : classes.subTitle
                }
              >
                {t("how10")}
              </span>
              <span
                className={
                  selectedLanguage === "ARABIC"
                    ? classes.paragraphSubTitleArabic
                    : classes.paragraphSubTitle
                }
              >
                {t("how11")}
              </span>
              <span
                className={
                  selectedLanguage === "ARABIC"
                    ? classes.paragraphArabic
                    : classes.paragraph
                }
              >
                {t("how12")}
              </span>
              <span
                className={
                  selectedLanguage === "ARABIC"
                    ? classes.paragraphSubTitleArabic
                    : classes.paragraphSubTitle
                }
              >
                {t("how13")}
              </span>
              <span
                className={
                  selectedLanguage === "ARABIC"
                    ? classes.paragraphArabic
                    : classes.paragraph
                }
              >
                {t("how14")}
              </span>
              <span
                className={
                  selectedLanguage === "ARABIC"
                    ? classes.paragraphSubTitleArabic
                    : classes.paragraphSubTitle
                }
              >
                {t("how15")}
              </span>
              <span
                className={
                  selectedLanguage === "ARABIC"
                    ? classes.paragraphArabic
                    : classes.paragraph
                }
              >
                {t("how16")}
              </span>

              <span
                className={
                  selectedLanguage === "ARABIC"
                    ? classes.paragraphSubTitleArabic
                    : classes.paragraphSubTitle
                }
              >
                {t("how17")}
              </span>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HowItWorks;
