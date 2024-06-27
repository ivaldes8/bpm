import { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import { AlertContext } from "@/utils/Contexts/AlertContext";
import { LoadingContext } from "@/utils/Contexts/LoadingContext";
import PolicyFilters from "../common-components/PolicyFilters";
import Alert from "@/components/Base/Alert";
import Lucide from "@/components/Base/Lucide";
import handlePromise from "@/utils/promise";
import ContractService from "@/services/ContractService";
import ContractForm from "./components/ContractForm";
import { useAppSelector } from "@/stores/hooks";
import SelectContractModal from "../common-components/SelectContractModal";

function Main() {
    const { t } = useTranslation();
    const [, setAlert] = useContext(AlertContext);
    const [, setLoading] = useContext(LoadingContext);

    const { company } = useAppSelector((state) => state.settings)

    const [filteredContracts, setFilteredContracts] = useState<any[]>([]);
    const [selectedContract, setSelectedContract] = useState<any>(null);

    const [selectContractModal, setSelectContractModal] = useState<boolean>(false);

    const getContracts = async (params: any) => {
        setLoading(true)
        const [error, response, data] = await handlePromise(ContractService.getContracts(params));
        setLoading(false)
        if (!response.ok) {
            return setAlert({
                type: "error",
                show: true,
                text: error ?? "Error while retrieving contracts",
            })
        }

        if (data.length === 1) {
            setSelectedContract(data[0])
        } else {
            setFilteredContracts(data)
        }
    }

    const onFilter = async (data: any) => {

        if (!company) {
            return setAlert({
                type: "error",
                show: true,
                text: "companyNotSelected",
            })
        }

        setSelectedContract(null)

        const params = {
            company: company.CompaniaId,
            ...data
        }

        await getContracts(params)
    }

    useEffect(() => {
        if (filteredContracts.length > 1) {
            setSelectContractModal(true)
        }
    }, [filteredContracts])

    return (
        <>
            <div className="flex flex-col items-center mt-4 intro-y sm:flex-row">
                <h2 className="mr-auto text-lg font-medium">{t("loadPolicy")}</h2>
            </div>
            <div className="p-3 mt-4 intro-y box">
                <PolicyFilters onFilter={onFilter} />
                <hr />
                {
                    selectedContract ? (
                        <ContractForm selectedContract={selectedContract} setSelectedContract={setSelectedContract} />
                    ) : (
                        <Alert variant="soft-secondary" className="flex items-center my-4 justify-center">
                            <Lucide icon="AlertOctagon" className="w-6 h-6 mr-2" />{" "}
                            {t("noPolicyLoaded")}
                        </Alert>
                    )
                }
            </div>
            <SelectContractModal
                show={selectContractModal}
                setShow={setSelectContractModal}
                filteredContracts={filteredContracts}
                selectedContract={selectedContract}
                setSelectedContract={setSelectedContract}
            />
        </>
    );
}

export default Main;