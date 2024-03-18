
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import esLang from "./es.json"

const resources = {
    es:  {
        translation: esLang
    }
}

i18n
    .use(initReactI18next)
    .init({
        lng: 'es',
        fallbackLng: 'es',
        resources,
        returnNull: false,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n
