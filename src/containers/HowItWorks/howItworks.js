import React, { useState } from "react";
// import TopHeader from "../../components/TopHeader/topHeader";
import Footer from "../../components/footer/footer";
import classes from "./howItworks.module.scss";
import NewTopHeader from "../../components/NewTopHeader.js/newTopHeader";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function HowItWorks() {
  const { t } = useTranslation();
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const tokenLogin = localStorage.getItem("tokenLogin"); // Check if the token exists
  const [showVip, setShowVip] = useState(false);

  const vipCodeStorage = localStorage.getItem("vipCodeUrl");

  useEffect(() => {
    if (vipCodeStorage) {
      setShowVip(true);
    }else {
      setShowVip(false)
    }
  }, [vipCodeStorage]);

  useEffect(() => {
    console.log(token);
    console.log(tokenLogin);
  }, [token, tokenLogin]);

  return (
    <div>
      <NewTopHeader />
      <div className={classes.howItWorksContainer}>
        <div className={classes.insideContainer}>
          <div className={classes.allCont}>
            <span className={classes.title}> {t("how1")}</span>
          </div>
          <div>
            <span className={classes.subTitle}>{t("how2")}</span>
            <div className={classes.allParagraph}>
              <span className={classes.paragraph}>{t("how3")}</span>
              <span className={classes.subTitle}>{t("how4")}</span>
              <div className={classes.numberPercentageCont}>
                <div className={classes.amountStyle}>
                  <span className={classes.subTitle}>{t("how5")}</span>
                  <span className={classes.paragraph}> [99; 150) </span>
                  <span className={classes.paragraph}> [150; 225) </span>
                  <span className={classes.paragraph}> [225; 338) </span>
                  <span className={classes.paragraph}> [338; 506) </span>

                  <span className={classes.paragraph}> [506; 759) </span>
                  <span className={classes.paragraph}> [759; 1139) </span>

                  <span className={classes.paragraph}> [1139; 1709) </span>

                  <span className={classes.paragraph}> [1709; 2563) </span>

                  <span className={classes.paragraph}> [2563; 3844) </span>

                  <span className={classes.paragraph}> [3844; 5767) </span>

                  <span className={classes.paragraph}> [5767; 8650) </span>

                  <span className={classes.paragraph}> [8650; 12975) </span>
                  <span className={classes.paragraph}> [12975; 19462) </span>
                  <span className={classes.paragraph}> [19462; 29193) </span>
                  <span className={classes.paragraph}> [29193; 43789) </span>
                  <span className={classes.paragraph}> [43789; 65684) </span>
                  <span className={classes.paragraph}>[65684; 100000)</span>
                  <span className={classes.paragraph}> [100000; +∞) </span>
                </div>
                <div className={classes.amountStyle1}>
                  <span className={classes.subTitle}>{t("how6")} </span>
                  <span className={classes.paragraph}> 5% </span>
                  <span className={classes.paragraph}> 5.4%</span>
                  <span className={classes.paragraph}> 5.8% </span>
                  <span className={classes.paragraph}> 6.2% </span>
                  <span className={classes.paragraph}> 6.7% </span>
                  <span className={classes.paragraph}> 7.2% </span>
                  <span className={classes.paragraph}> 7.7% </span>
                  <span className={classes.paragraph}> 8.3% </span>
                  <span className={classes.paragraph}> 8.9% </span>
                  <span className={classes.paragraph}> 9.6% </span>
                  <span className={classes.paragraph}> 10.3% </span>
                  <span className={classes.paragraph}> 11% </span>
                  <span className={classes.paragraph}> 11.9% </span>
                  <span className={classes.paragraph}> 12.8% </span>
                  <span className={classes.paragraph}> 13.8% </span>
                  <span className={classes.paragraph}> 14.8% </span>
                  <span className={classes.paragraph}>15.9%</span>
                  <span className={classes.paragraph}> 17% </span>
                </div>
              </div>
              <span className={classes.subTitle}>{t("how7")}</span>
            </div>
          </div>
          <div>
            <span className={classes.subTitle}> </span>
            <div className={classes.allParagraph}>
              <span className={classes.paragraph}>{t("how8")}</span>
            </div>
          </div>
          <div>
            <div className={classes.allParagraph}>
              {showVip ? (
                <span className={classes.paragraphVip}>{t("how9")}</span>
              ) : (
                ""
              )}

              <span className={classes.subTitle}>{t("how10")}</span>
              <span className={classes.paragraphSubTitle}>{t("how11")}</span>
              <span className={classes.paragraph}>{t("how12")}</span>
              <span className={classes.paragraphSubTitle}> {t("how13")}</span>
              <span className={classes.paragraph}>{t("how14")}</span>

              <span className={classes.paragraphSubTitle}> {t("how15")}</span>
              <span className={classes.paragraph}>{t("how16")}</span>

              <span className={classes.paragraphSubTitle}>{t("how17")}</span>
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
