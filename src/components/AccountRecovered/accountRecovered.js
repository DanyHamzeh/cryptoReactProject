import React from "react";
import classes from "./accountRecovered.module.scss";
import recoverImage from "../../assets/images/Vector.png";
import { useTranslation } from "react-i18next";

function AccountRecovered(props) {

  const { t } = useTranslation();

  return (
    <div className={classes.allContainer}>
      <img src={recoverImage} alt="" className={classes.recoverImage} />
      <span className={classes.recoveryText}>{t("accountSucc")}</span>
      <div className={classes.lineSeperate} />
      <span className={classes.subTitle}> {props.userName}</span>
    </div>
  );
}

export default AccountRecovered;
