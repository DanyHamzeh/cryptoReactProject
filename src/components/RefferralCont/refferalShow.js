import React, { useRef, useState } from "react";
import classes from "./refferalShow.module.scss";
import { useTranslation } from "react-i18next";

function RefferalContainer(props) {
  const textToCopyRef = useRef(null);
  const { t } = useTranslation();
  const [copyStatus, setCopyStatus] = useState(t("COPY"));


  const handleCopyClick = (e) => {
    // Prevent the button's default behavior (form submission)
    e.preventDefault();

    // Ensure the ref is available before attempting to copy
    if (textToCopyRef.current) {
      // Get the text to copy from the ref
      const textToCopy = textToCopyRef.current.textContent;

      // Create a textarea element to hold the text temporarily
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;

      // Append the textarea element to the DOM
      document.body.appendChild(textArea);

      // Select the text in the textarea
      textArea.select();

      // Copy the selected text to the clipboard
      document.execCommand(t("COPY"));

      // Remove the textarea element from the DOM
      document.body.removeChild(textArea);

      // Update the button text to indicate successful copying
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
