import { faArrowLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { rejisterApi } from "../../Api";
import Loader from "../Loader/Loader";
import classes from "./secureAccount.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SecureAccount(props) {
  const [showPicker, setShowPicker] = useState("close");
  const [selected, setSelected] = useState("");

  const [answerValue, setAnswerValue] = useState("");
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [hashToken, setHashToken] = useState(null);
  const vipCodeStorage = localStorage.getItem("vipCodeUrl");

  const navigate = useNavigate();
  const { t } = useTranslation();
  const options = [t("favouritePet"), t("favouriteColor"), t("codeCreate")];

  const onClickPicker = () => {
    if (showPicker) {
      setShowPicker("open");
    }
    if (showPicker === "open") {
      setShowPicker("close");
    }
  };

  const answerHandler = (event) => {
    setAnswerValue(event.target.value);
  };

  // useEffect(() => {
  //   console.log(hashToken);
  //   // console.log(answerValue);
  //   // console.log(props.firstName);
  // }, [hashToken]);

  const completeSecurity = () => {
    if (selected.trim() === "" || answerValue.trim() === "") {
      setMessage(t("fillEmpty"));
    } else {
      let url = rejisterApi(selectedLanguage);
      setLoader(true);
      let referralCodeValue = props.referralCode
        ? props.referralCode
        : props.refferlNew;

      if (vipCodeStorage) {
        referralCodeValue = "";
      }

      let rejisterObject = {
        firstName: props.firstName,
        lastName: props.lastName,
        password: props.passwordName,
        verifyPassword: props.confirmPassword,
        email: props.emailName,
        referralCode: referralCodeValue,
        securityQuestion: selected,
        securityAnswer: answerValue,
        vipCode: vipCodeStorage ? vipCodeStorage : "",
      };
      console.log("first", rejisterObject);
      axios
        .post(url, rejisterObject)
        .then((response) => {
          if (response.data.status === 0) {
            navigate("/howItWorks");
            setLoader(false);
            setHashToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            console.log(hashToken);
          } else {
            setLoader();
            setMessage(response.data.message);
            console.log("second", rejisterObject);

            console.log("second", url);
          }
        })
        .catch((error) => {
          setLoader(error.message);
          console.log("thhird", url);
        });
    }
  };

  return (
    <div className={classes.allContainer}>
      <div className={classes.titleClose}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={classes.flashSign}
          onClick={props.onClose}
        />
        <span className={classes.title}>{t("SYA")}</span>
      </div>
      <div className={classes.lineSeperate} />
      <div className={classes.inputAllCont}>
        <div
          // className={classes.textInputStyleQuetion}
          className={`${classes.textInputStyleQuetion} ${[
            showPicker === "open"
              ? classes.textInputStyleQuetionNew
              : classes.textInputStyleQuetion,
          ]}`}
        >
          <div
            className={`${classes.firstBox} ${[
              showPicker === "open" ? classes.secondBox : classes.firstBox,
            ]}`}
            onClick={onClickPicker}
          >
            <div
              className={`${classes.inputStyleNew} ${[
                showPicker === "open"
                  ? classes.inputStyleNewOpen
                  : classes.inputStyleNew,
              ]}`}
            >
              {selected || t("securityQuestion")}
            </div>
            <FontAwesomeIcon
              className={classes.iconClose}
              icon={faChevronDown}
            />
          </div>
          {options.map((option, index) => {
            return (
              <div
                key={index}
                className={`${classes.secondBox} ${[
                  showPicker === "open"
                    ? classes.secondBox
                    : classes.secondBoxHide,
                ]}`}
                onClick={(e) => {
                  setSelected(option);
                  setShowPicker("close");
                }}
              >
                <span className={classes.textTest}>{option}</span>
                <div className={classes.lineSeperateNew} />
              </div>
            );
          })}
        </div>
        <div className={classes.textInputStyleAnswer}>
          <input
            type="text"
            className={classes.inputStyle}
            placeholder={t("answerhere")}
            onChange={answerHandler}
            value={answerValue}
          />
        </div>
      </div>
      <div className={classes.textBtnContainer}>
        <div >
          <button className={classes.btnRejister} onClick={completeSecurity}>
            {t("CSS")}
          </button>
        </div>
        <div className={classes.messageLoaderCont}>
          {message && <span className={classes.messageStyle}>{message}</span>}
          <div className={classes.loaderPosition}>{loader && <Loader />}</div>
        </div>
        <span className={classes.secureText}>{t("accountLost")}</span>
      </div>
    </div>
  );
}

//   return (
//     <div className={classes.allContainer}>
//       <div className={classes.titleClose}>
//         <FontAwesomeIcon
//           icon={faArrowLeft}
//           className={classes.flashSign}
//           onClick={props.onClose}
//         />
//         <span className={classes.title}>{t("SYA")}</span>
//       </div>
//       <div className={classes.lineSeperate} />

//       <div className={classes.inputAllCont}>
//         <div
//           // className={classes.textInputStyleQuetion}
//           className={`${classes.textInputStyleQuetion} ${[
//             showPicker === "open"
//               ? classes.textInputStyleQuetionNew
//               : classes.textInputStyleQuetion,
//           ]}`}
//         >
//           <div
//             className={`${classes.firstBox} ${[
//               showPicker === "open" ? classes.secondBox : classes.firstBox,
//             ]}`}
//             onClick={onClickPicker}
//           >
//             <div
//               className={`${classes.inputStyleNew} ${[
//                 showPicker === "open"
//                   ? classes.inputStyleNewOpen
//                   : classes.inputStyleNew,
//               ]}`}
//             >
//               {selected || t("securityQuestion")}
//             </div>
//             <FontAwesomeIcon
//               className={classes.iconClose}
//               icon={faChevronDown}
//             />
//           </div>
//           <div
//             className={`${
//               showPicker === "open" ? classes.secondBox : classes.secondBoxHide
//             }`}
//             style={{ borderRadius: "20px" }}
//           >
//             {options.map((option) => (
//               <div
//                 key={option}
//                 onClick={(e) => {
//                   setSelected(option);
//                   setShowPicker("close");
//                 }}
//               >
//                 <span className={classes.textTest}>{option}</span>
//                 <div className={classes.lineSeperateNew} />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className={classes.additionalSection}>
//           <div className={classes.textInputStyle}>
//             <input
//               type="text"
//               className={classes.inputStyle}
//               placeholder={t("answerhere")}
//               onChange={answerHandler}
//               value={answerValue}
//             />
//           </div>

//           {/* Add your button here */}
//           <button className={classes.btnRejister} onClick={completeSecurity}>
//           {t("CSS")}
//           </button>

//           {/* Add your text here */}
//           <p className={classes.secureText}>{t("accountLost")}</p>
//                   <div className={classes.messageLoaderCont}>
//           {message && <span className={classes.messageStyle}>{message}</span>}
//           <div className={classes.loaderPosition}> {loader && <Loader />}</div>
//         </div>
//         </div>
//       </div>

//       {/* <div className={classes.textInputStyle}>
//           <input
//             type="text"
//             className={classes.inputStyle}
//             placeholder={t("answerhere")}
//             onChange={answerHandler}
//             value={answerValue}
//           />
//           <button className={classes.btnRejister} onClick={completeSecurity}>
//             {t("CSS")}
//           </button>
//           <span className={classes.secureText}>{t("accountLost")}</span>

//         </div> */}
//       {/* <div className={classes.textBtnContainer}>
//         <div className={classes.btnMessage}>
//           <button className={classes.btnRejister} onClick={completeSecurity}>
//             {t("CSS")}
//           </button>
//         </div>
//         <div>
//           <span className={classes.secureText}>{t("accountLost")}</span>
//         </div>
//         <div className={classes.messageLoaderCont}>
//           {message && <span className={classes.messageStyle}>{message}</span>}
//           <div className={classes.loaderPosition}> {loader && <Loader />}</div>
//         </div>
//       </div> */}
//     </div>
//   );
// }

export default SecureAccount;
