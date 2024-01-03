import React, { useRef, useState } from "react";
import classes from "./refferalShow.module.scss";
import { useTranslation } from "react-i18next";

function RefferalContainer(props) {
  const { t } = useTranslation();
  const textToCopyRef = useRef(null);
  const [copyStatus, setCopyStatus] = useState(t('COPY') || 'COPY');



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
        setCopyStatus(t('Copied'));
        console.log('Copied text:', textToCopy);
      } catch (err) {
        console.error('Unable to copy text: ', err);
        setCopyStatus(t('Copy failed'));
      }
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
              e.stopPropagation();
            }}
            type="button"
          >
            {copyStatus}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RefferalContainer;
