import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enData from "./assets/lang/en.json"; // English
import frData from "./assets/lang/fr.json"; // French
import spData from "./assets/lang/sp.json"; // Spanish (corrected from "spanice")

const resources = {
  en: enData,
  fr: frData,
  sp: spData,
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en", // Default fallback language
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
