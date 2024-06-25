import React from "react";
import classes from "./warning.module.scss";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import logo from "../../assets/images/logo.png";

function Warning(props) {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Daily Trading Bot - Payment Warning</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          key="description"
          content="Payments under 100 will not receive benefits. Please ensure your payment amount exceeds 100 to enjoy the full benefits of Daily Trading Bot."
        />
        <meta
          name="title"
          key="title"
          content="Daily Trading Bot - Payment Warning"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Daily Trading Bot - Payment Warning"
        />
        <meta property="og:site_name" content="Daily Trading Bot" />
        <meta property="og:locale" key="og:locale" content="en_US" />
        <meta charSet="utf-8" />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          key="og:description"
          content="Payments under 100 will not receive benefits. Please ensure your payment amount exceeds 100 to enjoy the full benefits of Daily Trading Bot."
        />
        <meta
          property="og:image"
          key="og:image"
          content={logo} // Assuming you have imported your logo as `logo`
        />
      </Helmet>
      <div className={classes.allContainer}>
        <div>
          <span className={classes.headerCellsAlone}>{t("WARNING")}</span>
          <span className={classes.closeSign} onClick={props.onClose}>
            x
          </span>
        </div>
        <span className={classes.paymentWarning}>{t("paymentUnder")}</span>
      </div>
    </>
  );
}

export default Warning;
