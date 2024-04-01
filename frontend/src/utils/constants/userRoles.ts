import { useTranslation } from "react-i18next";

const userRoles = () => {
    const {t} = useTranslation();

    return [
        {
            id: "ADMIN",
            name: t("ADMIN")
        },
        {
            id: "USER",
            name: t("USER")
        }
    ]
}

export default userRoles