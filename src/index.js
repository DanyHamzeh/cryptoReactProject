import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import XHRBackend from "i18next-xhr-backend"; // Import the backend for loading translations

import englishTranslation from "./LanguagesFiles/ENGLISH.json";
import frenchTranslation from "./LanguagesFiles/FRENCH.json";
import spanishTranslation from "./LanguagesFiles/SPANISH.json";
import arabicTranslation from "./LanguagesFiles/ARABIC.json";
import turkishTranslation from "./LanguagesFiles/TURKISH.json";
import germanyTranslation from "./LanguagesFiles/GERMANY.json";
import italianTranslation from "./LanguagesFiles/ITALIAN.json";
import portugueseTranslation from "./LanguagesFiles/POURTUGUEZE.json";
import russianTranslation from "./LanguagesFiles/RUSSIAN.json";
import chineseTranslation from "./LanguagesFiles/CHINESE.json";
import koreanTranslation from "./LanguagesFiles/KOREAN.json";
import japanesesTranslation from "./LanguagesFiles/JAPANESE.json";
import swahiliTranslation from "./LanguagesFiles/SWAHILI.json";
import hindiTranslation from "./LanguagesFiles/INDIAN.json";
import axios from "axios";

i18n
  .use(XHRBackend) // Use the XHR backend to load translations (you may need to configure this further)
  .use(initReactI18next) // Initialize i18next for React
  .init({
    resources: {
      ENGLISH: {
        translation: englishTranslation, // English translations
      },
      FRENCH: {
        translation: frenchTranslation, // French translations
      },
      SPANISH: {
        translation: spanishTranslation, // Spanish translations
      },
      ARABIC: {
        translation: arabicTranslation, // Spanish translations
      },
      TURKISH: {
        translation: turkishTranslation, // Spanish translations
      },
      GERMAN: {
        translation: germanyTranslation, // Spanish translations
      },
      ITALIAN: {
        translation: italianTranslation, // Spanish translations
      },
      PORTUGUESE: {
        translation: portugueseTranslation, // Spanish translations
      },
      RUSSIAN: {
        translation: russianTranslation, // Spanish translations
      },
      CHINESE: {
        translation: chineseTranslation, // Spanish translations
      },
      KOREAN: {
        translation: koreanTranslation, // Spanish translations
      },
      JAPANESE: {
        translation: japanesesTranslation, // Spanish translations
      },
      SWAHILI: {
        translation: swahiliTranslation, // Spanish translations
      },
      HINDI: {
        translation: hindiTranslation, // Spanish translations
      },
    },
    lng: "ENGLISH", // Set the default language
    fallbackLng: "ENGLISH", // Fallback to English if a translation is missing
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

const root = ReactDOM.createRoot(document.getElementById("root"));

const { REACT_APP_API_ENDPOINT } = process.env;
axios.defaults.baseURL = REACT_APP_API_ENDPOINT;


root.render(
  <I18nextProvider i18n={i18n}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </I18nextProvider>
);
