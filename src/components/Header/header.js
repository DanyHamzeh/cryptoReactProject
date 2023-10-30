import React from "react";
import classes from "./header.module.scss";
import LandingPage from "../LandingPage/landingPage";
import Footer from "../footer/footer";
import TopHeader from "../TopHeader/topHeader";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useEffect } from "react";

function Header() {
  const { t } = useTranslation();
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";


  useEffect(()=>{
    i18next.init({
      lng: selectedLanguage,
      fallbackLng: 'ENGLISH',
      interpolation: {
        escapeValue: false,
      },
    });
  },[])

  return (
    <>
      <TopHeader />
      <div className={classes.landPage}>
        <LandingPage />
        <span className={classes.textInsideBanner}>
          <p className={classes.title}>{t("landing1")}</p>
          <p className={classes.paragraph}>
            {t("landing2")}
            <br />
            {t("landing3")}
            <br /> {t("landing4")}
            
            <br /> {t("landing5")}
            <br /> {t("landing6")}
            <br /> {t("landing7")}
            <br /> {t("landing8")}
            <br /> {t("landing9")}
          </p>
        </span>
      </div>
      <Footer />
    </>
  );
}

export default Header;
