import React from "react";
import Footer from "../../components/footer/footer";
import TopHeader from "../../components/TopHeader/topHeader";
import classes from "./termsCondition.module.scss";
import { useTranslation } from "react-i18next";

function TermsCondition() {
  const { t } = useTranslation();

  return (
    <div>
      <TopHeader />
      <div className={classes.landPage}>
        <div className={classes.termsConditionCont}>
          <div className={classes.insideContainer}>
            <span className={classes.title}> {t("tAC")}</span>
            <span className={classes.paragraph}>{t("terms1")}</span>
            <span className={classes.subTitle}> {t("terms2")}</span>
            <span className={classes.paragraph}>{t("terms3")}</span>
            <span className={classes.subTitle}> {t("terms4")}</span>
            <span className={classes.subTitle}>{t("terms5")}</span>
            <span className={classes.paragraphSecond}>{t("terms6")}</span>
            <span className={classes.subTitle}> {t("termsh")}</span>
            <span className={classes.paragraphSecond}>{t("termsh1")}</span>
            <span className={classes.subTitle}> {t("terms7")}</span>
            <span className={classes.paragraphSecond}>{t("terms8")}</span>
            <span className={classes.subTitle}>{t("terms9")}</span>
            <span className={classes.paragraphSecond}>{t("terms10")}</span>
            <span className={classes.subTitle}>{t("terms11")}</span>
            <span className={classes.paragraphSecond}>{t("terms12")}</span>
            <span className={classes.subTitle}>{t("terms13")}</span>
            <span className={classes.paragraphSecond}>{t("terms14")}</span>
            <span className={classes.subTitle}> {t("terms15")}</span>
            <span className={classes.paragraphSecond}>{t("terms16")}</span>
            <span className={classes.subTitle}>{t("terms17")}</span>
            <span className={classes.paragraphSecond}>{t("terms18")}</span>
            <span className={classes.subTitle}> {t("terms19")}</span>
            <span className={classes.paragraphSecond}>{t("terms20")}</span>
            <span className={classes.subTitle}>{t("terms21")}</span>
            <span className={classes.paragraphSecond}>{t("terms22")}</span>
            <span className={classes.subTitle}>{t("terms23")}</span>
            <span className={classes.paragraphSecond}>{t("terms24")}</span>
            <span className={classes.subTitle}>{t("terms25")}</span>
            <span className={classes.paragraphSecond}>{t("terms26")}</span>
            <span className={classes.subTitle}>{t("terms27")}</span>
            <span className={classes.paragraphSecond}>{t("terms28")}</span>
            <span className={classes.subTitle}>{t("terms29")}</span>
            <span className={classes.paragraphSecond}>{t("terms30")}</span>
            <span className={classes.subTitle}> {t("terms31")}</span>
            <span className={classes.subTitle}> {t("terms32")} </span>
            <span className={classes.paragraphSecond}>{t("terms33")}</span>
            <span className={classes.subTitle}> {t("terms34")}</span>
            <span className={classes.paragraphSecond}>{t("terms35")}</span>
            <span className={classes.subTitle}> {t("terms36")} </span>
            <span className={classes.paragraphSecond}>{t("terms37")}</span>
            <span className={classes.subTitle}>{t("terms38")} </span>
            <span className={classes.paragraphSecond}>{t("terms39")}</span>
            <span className={classes.subTitle}>{t("terms40")}</span>
            <span className={classes.paragraphSecond}>{t("terms41")}</span>
            <span className={classes.subTitle}>{t("terms42")}</span>
            <span className={classes.paragraphSecond}>{t("terms43")}</span>
            <span className={classes.subTitle}>{t("terms44")}</span>
            <span className={classes.paragraphSecond}>{t("terms45")}</span>
            <span className={classes.subTitle}>{t("terms46")}</span>
            <span className={classes.paragraphSecond}>{t("terms47")}</span>
            <span className={classes.subTitle}>{t("terms48")}</span>
            <span className={classes.subTitle}> {t("terms49")}</span>
            <span className={classes.paragraphSecond}>{t("terms50")}</span>
            <span className={classes.paragraphSecond}> {t("sterms1")} </span>
            <span className={classes.paragraphSecond}>{t("sterms2")}</span>
            <span className={classes.paragraphSecond}> {t("sterms3")}</span>
            <span className={classes.paragraphSecond}>{t("sterms4")}</span>
            <span className={classes.paragraphSecond}>{t("sterms5")} </span>
            <span className={classes.paragraphSecond}>{t("sterms6")}</span>
            <span className={classes.paragraphSecond}> {t("sterms7")}</span>
            <span className={classes.paragraphSecond}>{t("sterms8")}</span>
       
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TermsCondition;
