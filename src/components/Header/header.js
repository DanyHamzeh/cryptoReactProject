import React from "react";
import classes from "./header.module.scss";
import LandingPage from "../LandingPage/landingPage";
import Footer from "../footer/footer";
import TopHeader from "../TopHeader/topHeader";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

import Logo from "../../assets/images/logo.png";


function Header() {
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
    <>
      <Helmet>
        <title>
          Daily Trading Bot - A New Way in a New World to Benefit from
          Cryptocurrency
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          key="description"
          content="Welcome to an exciting opportunity where you can explore the potential of making money from cryptocurrency without any prior trading or investing knowledge. During sign up, you’ll be provided access to our service dynamics and all the operational details. Our sign up process is free! However, we may have limited membership available each month. Secure your membership today."
        />
        <meta
          name="title"
          key="title"
          content="Daily Trading Bot - A New Way in a New World to Benefit from Cryptocurrency"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Daily Trading Bot - A New Way in a New World to Benefit from Cryptocurrency"
        />
        <meta property="og:site_name" content="Daily Trading Bot" />
        <meta property="og:locale" key="og:locale" content="en_US" />
        <meta charSet="utf-8" />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          key="og:description"
          content="Welcome to an exciting opportunity where you can explore the potential of making money from cryptocurrency without any prior trading or investing knowledge. During sign up, you’ll be provided access to our service dynamics and all the operational details. Our sign up process is free! However, we may have limited membership available each month. Secure your membership today."
        />
        <meta
          property="og:image"
          key="og:image"
          content={Logo} // Assuming you have imported your logo as `logo`
        />
      </Helmet>
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
