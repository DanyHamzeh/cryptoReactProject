import React from "react";
import classes from "./header.module.scss";
import LandingPage from "../LandingPage/landingPage";
import Footer from "../footer/footer";
import TopHeader from "../TopHeader/topHeader";
import { useTranslation } from "react-i18next";

function Header(props) {
  const { t } = useTranslation();
  // const token = localStorage.getItem("token"); // Get the token from localStorage

  // useEffect(() => {
  //   console.log("token", token);
  // }, []);

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
