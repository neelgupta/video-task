import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enData from "./assets/lang/en.json";
import itData from "./assets/lang/it.json";
import svData from "./assets/lang/sv.json";
import esData from "./assets/lang/es.json";

const resources = {
  en: enData,
  it: itData,
  sv: svData,
  es: esData,
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
