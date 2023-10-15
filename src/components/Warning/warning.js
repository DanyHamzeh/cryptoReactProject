import React from "react";
import classes from "./warning.module.scss";
import { useTranslation } from "react-i18next";

function Warning(props) {
  const { t } = useTranslation();

  return (
    <div className={classes.allContainer}>
      <div>
        <span className={classes.headerCellsAlone}>{t("WARNING")}</span>
        <span className={classes.closeSign} onClick={props.onClose}>
          x
        </span>
      </div>
      <span className={classes.paymentWarning}>{t("paymentUnder")}</span>
    </div>
  );
}

export default Warning;
