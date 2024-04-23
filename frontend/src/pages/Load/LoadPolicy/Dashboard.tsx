import { useContext } from "react";
import { useTranslation } from 'react-i18next'
import { AlertContext } from "@/utils/Contexts/AlertContext";
import { LoadingContext } from "@/utils/Contexts/LoadingContext";
import PolicyFilters from "./components/PolicyFilters";
import Alert from "@/components/Base/Alert";
import Lucide from "@/components/Base/Lucide";

function Main() {
    const { t } = useTranslation();
    const [alert, setAlert] = useContext(AlertContext);
    const [loading, setLoading] = useContext(LoadingContext);

    const onFilter = async (data: any) => {
        console.log(data, "Filter")
    }

    return (
        <>
            <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
                <h2 className="mr-auto text-lg font-medium">{t("loadPolicy")}</h2>
            </div>
            <div className="p-5 mt-5 intro-y box">
                <PolicyFilters onFilter={onFilter} />
                <hr />

                <Alert variant="soft-secondary" className="flex items-center my-4 justify-center">
                    <Lucide icon="AlertOctagon" className="w-6 h-6 mr-2" />{" "}
                    {t("noPolicyLoaded")}
                </Alert>
            </div>
        </>
    );
}

export default Main;