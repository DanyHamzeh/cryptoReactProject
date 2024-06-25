import React, { useRef, useState } from "react";
import classes from "./refferalShow.module.scss";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import logo from "../../assets/images/logo.png";

function RefferalContainer(props) {
  const { t } = useTranslation();
  const textToCopyRef = useRef(null);
  const [copyStatus, setCopyStatus] = useState(t("COPY") || "COPY");

  // const handleCopyClick = (e) => {
  //   e.preventDefault();
  //   console.log("copyMessage",textToCopyRef.current);
  //   if (textToCopyRef.current) {
  //     const textToCopy = textToCopyRef.current.textContent;
  //     const textArea = document.createElement("textarea");
  //     textArea.value = textToCopy;
  //     document.body.appendChild(textArea);
  //     textArea.select();
  //     document.execCommand(t("COPY"));
  //     document.body.removeChild(textArea);
  //     setCopyStatus( t("Copied") );
  //   }
  // };

  const handleCopyClick = async (e) => {
    e.preventDefault();

    if (textToCopyRef.current) {
      const textToCopy = textToCopyRef.current.innerText;

      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopyStatus(t("Copied"));
        console.log("Copied text:", textToCopy);
      } catch (err) {
        console.error("Unable to copy text: ", err);
        setCopyStatus(t("Copy failed"));
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Daily Trading Bot - Enter Referral Code</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          key="description"
          content="Enter a referral code to join Daily Trading Bot and unlock exclusive benefits. Start your cryptocurrency trading journey with a bonus by using a referral code!"
        />
        <meta
          name="title"
          key="title"
          content="Daily Trading Bot - Enter Referral Code"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Daily Trading Bot - Enter Referral Code"
        />
        <meta property="og:site_name" content="Daily Trading Bot" />
        <meta property="og:locale" key="og:locale" content="en_US" />
        <meta charSet="utf-8" />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          key="og:description"
          content="Enter a referral code to join Daily Trading Bot and unlock exclusive benefits. Start your cryptocurrency trading journey with a bonus by using a referral code!"
        />
        <meta
          property="og:image"
          key="og:image"
          content={logo} // Assuming you have imported your logo as `logo`
        />
      </Helmet>
      <div className={classes.allContainer}>
        <span className={classes.closeSign} onClick={handleCopyClick}>
          x
        </span>
        <div className={classes.infoContainer}>
          <span className={classes.refferalStyle} ref={textToCopyRef}>
            {props.refferalUrl}
          </span>
          <div className={classes.btnContainer}>
            <button
              className={classes.btnStyle}
              onClick={(e) => {
                handleCopyClick(e);
                e.stopPropagation();
              }}
              type="button"
            >
              {copyStatus}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RefferalContainer;
