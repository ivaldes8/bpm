import { useTranslation } from "react-i18next";

const userRoles = () => {
    const { t } = useTranslation();

    return [
        {
            id: "ADMIN",
            name: t("ADMIN")
        },
        {
            id: "MONITOR",
            name: t("MONITOR")
        },
        {
            id: "BASE",
            name: t("BASE")
        }
    ]
}

export default userRoles