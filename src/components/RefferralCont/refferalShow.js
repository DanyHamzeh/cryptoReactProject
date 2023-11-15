import React, { useRef, useState } from "react";
import classes from "./refferalShow.module.scss";
import { useTranslation } from "react-i18next";

function RefferalContainer(props) {
  const textToCopyRef = useRef(null);
  const { t } = useTranslation();
  const [copyStatus, setCopyStatus] = useState(t("COPY"));


  const handleCopyClick = (e) => {
    e.preventDefault();
    if (textToCopyRef.current) {
      const textToCopy = textToCopyRef.current.textContent;
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand(t("COPY"));
      document.body.removeChild(textArea);
      setCopyStatus( t("Copied") );
    }
  };

  return (
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
              e.stopPropagation(); // Prevent event propagation
            }}
            type="button" // Specify the button type as "button"
          >
            {copyStatus}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RefferalContainer;
