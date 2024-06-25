import React from "react";
import classes from "./footer.module.scss";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Contact Us: contact@dailytradingbot.com"
        />
        <meta name="author" content="dailytradingbot" />
        <meta
          name="copyright"
          content="2023 dailytradingbot All Rights Reserved"
        />
      </Helmet>
      <div className={classes.footerStyle}>
        <span className={classes.footerTitle}>{t("contactUs")}</span>
        <span className={classes.footerTitle}>{t("copyRight")}</span>
      </div>
    </>
  );
}

export default Footer;
