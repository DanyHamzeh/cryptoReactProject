import React from "react";
import classes from "./footer.module.scss"
import { useTranslation } from "react-i18next";

function Footer() {

  const { t } = useTranslation();

  return (
    <div className={classes.footerStyle}>
      <span className={classes.footerTitle}>
      {t("contactUs")}
      </span>
      <span className={classes.footerTitle}>
      {t("copyRight")}
      </span>
    </div>
  );
}

export default Footer;
