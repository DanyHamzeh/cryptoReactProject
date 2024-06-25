import React from "react";
import classes from "./accountRecovered.module.scss";
import recoverImage from "../../assets/images/Vector.png";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

import logo from "../../assets/images/logo.png";


function AccountRecovered(props) {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Daily Trading Bot - Account Recovery</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          key="description"
          content="Recover your Daily Trading Bot account to regain access and explore the potential of making money from cryptocurrency without any prior trading or investing knowledge."
        />
        <meta
          name="title"
          key="title"
          content="Daily Trading Bot - Account Recovery"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Daily Trading Bot - Account Recovery"
        />
        <meta property="og:site_name" content="Daily Trading Bot" />
        <meta property="og:locale" key="og:locale" content="en_US" />
        <meta charSet="utf-8" />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          key="og:description"
          content="Recover your Daily Trading Bot account to regain access and explore the potential of making money from cryptocurrency without any prior trading or investing knowledge."
        />
        <meta
          property="og:image"
          key="og:image"
          content={logo} // Assuming you have imported your logo as `logo`
        />
      </Helmet>
      <div className={classes.allContainer}>
        <img src={recoverImage} alt="" className={classes.recoverImage} />
        <span className={classes.recoveryText}>{t("accountSucc")}</span>
        <div className={classes.lineSeperate} />
        <span className={classes.subTitle}> {props.userName}</span>
      </div>
    </>
  );
}

export default AccountRecovered;
