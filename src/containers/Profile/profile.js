import React, { useEffect, useState } from "react";
import classes from "./profile.module.scss";
import Footer from "../../components/footer/footer";
// import TopHeader from "../../components/TopHeader/topHeader";
import profileSmall from "../../assets/images/Group 232.png";
import profileLarge from "../../assets/images/Group 231.png";
import ResetPassword from "../../components/ResetPassword/resetPassword";
import NewTopHeader from "../../components/NewTopHeader.js/newTopHeader";
import { useTranslation } from "react-i18next";
import { getUserInfoApi } from "../../Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";

function Profile() {
  const [showResetPAssword, setShowResetPassword] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [errorCode, setErrorCode] = useState(null);


  const navigate = useNavigate();

  // const [inputValues, setInputValues] = useState([""]);
  const { t } = useTranslation();

  function handleClickSecureAccount() {
    setShowResetPassword((prev) => !prev);
  }

  const token = localStorage.getItem("token"); // Check if the token exists
  const tokenLogin = localStorage.getItem("tokenLogin"); // Check if the token exists
  const selectedLanguage = localStorage.getItem("myLanguage") || "ENGLISH";

  useEffect(()=>{
    i18next.init({
      lng: selectedLanguage,
      fallbackLng: 'ENGLISH',
      interpolation: {
        escapeValue: false,
      },
    });
  },[])


  useEffect(() => {
    if (token || tokenLogin) {
      let url = getUserInfoApi(selectedLanguage);
      let getUserObject = {
        token: token || tokenLogin,
      };
      console.log(selectedLanguage);
      axios
        .post(url, getUserObject)
        .then((response) => {
          if (response.data.status === 0) {
            const user = response.data.user;
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setUserName(user.userName);
            // setErrorCode(response.data.errorCode);
          } else {
            setErrorCode(response.data.errorCode);

            if (errorCode === "invalidUserToken") {
              console.log("ana fetet");
              navigate("/");
              localStorage.removeItem("token");
              localStorage.removeItem("tokenLogin");
            }
            console.log("second", errorCode);
          }
        })
        .catch((error) => {
          // setLoader(error.message);
          console.log("thhird", error);
        });
    }
  }, [token, tokenLogin, selectedLanguage, errorCode, navigate]);

  // const addInput = () => {
  //   setInputValues([...inputValues, ""]);
  // };

  // const removeInput = (index) => {
  //   if (inputValues.length === 1) {
  //     // Ensure at least one input remains
  //     return;
  //   }
  //   const newInputValues = [...inputValues];
  //   newInputValues.splice(index, 1);
  //   setInputValues(newInputValues);
  // };

  return (
    <div>
      <NewTopHeader />
      <div className={classes.allContainer}>
        <div className={classes.insideContainer}>
          <div className={classes.imageTitle}>
            <img src={profileSmall} alt="" className={classes.smallProfile} />
            <span className={classes.textTitle}>{t("PROFILE")}</span>
          </div>
          <div className={classes.infoImageUser}>
            <div className={classes.infoUserContainer}> 
              <div className={classes.profileInfo}>
                <div className={classes.spaceInfo}>
                  <span className={classes.infoText}>{t("fN")}</span>
                  <span className={classes.infoTextMobile}>
                    {/* AAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
                    {firstName}
                  </span>
                </div>
                <div className={classes.spaceInfo}>
                  <span className={classes.infoText}>{t("lN")}</span>
                  <span className={classes.infoTextMobile}>{lastName}</span>
                </div>
                <div className={classes.spaceInfo}>
                  <span className={classes.infoText}>{t("eM")}</span>
                  <span className={classes.infoTextMobile}>{email}</span>
                </div>
              </div>
              <div className={classes.profileInfo}>
                <span className={classes.infoTextName}>{firstName}</span>
                <span className={classes.infoTextName}>{lastName}</span>
                <span className={classes.infoTextName}>{email}</span>
              </div>
            </div>
            <div className={classes.profilePic}>
              <div className={classes.imageInput}>
                <img
                  src={profileLarge}
                  alt=""
                  className={classes.largeProfile}
                />
              </div>
              <div className={classes.nameContainer}>
                <span className={classes.nameProfile}>{userName}</span>
              </div>
            </div>
          </div>
          <div className={classes.editInfoCont}>
            <span
              className={classes.nameProfilePassword}
              onClick={handleClickSecureAccount}
            >
              {t("ePassword")}
            </span>
          </div>
          {showResetPAssword && (
            <ResetPassword onClose={handleClickSecureAccount} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
