import React, { useEffect } from "react";
import Footer from "../../components/footer/footer";
import TopHeader from "../../components/TopHeader/topHeader";
import classes from "./termsCondition.module.scss";
import { Trans, useTranslation } from "react-i18next";
import i18next from "i18next";


function TermsCondition() {
  const { t } = useTranslation();
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";

  useEffect(() => {
    i18next.init({
      lng: selectedLanguage,
      fallbackLng: "ENGLISH",
      interpolation: {
        escapeValue: false,
      },
    });
  }, []);

  

  return (
    <div>
      <TopHeader />
      <div className={classes.landPage}>
        <div className={classes.termsConditionCont}>
          <div
            className={
              selectedLanguage === "ARABIC"
                ? classes.insideContainerArabic
                : classes.insideContainer
            }
          >
            <span className={classes.title}> {t("tAC")}</span>
            <span className={classes.paragraph}><Trans i18nKey="terms1"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms2"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms3"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms4"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms5"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms6"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms7"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms8"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms9"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms10"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms11"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms12"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms13"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms14"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms15"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms16"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms17"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms18"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms19"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms20"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms21"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms22"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms23"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms24"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms25"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms26"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms27"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms28"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms29"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms30"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms31"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms32"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms33"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms34"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms35"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms36"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms37"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms38"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms39"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms40"/></span>
            <span className={classes.paragraph}><Trans i18nKey="terms41"/></span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TermsCondition;
