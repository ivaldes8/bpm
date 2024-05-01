import { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import { AlertContext } from "@/utils/Contexts/AlertContext";
import { LoadingContext } from "@/utils/Contexts/LoadingContext";
import PolicyFilters from "./components/PolicyFilters";
import Alert from "@/components/Base/Alert";
import Lucide from "@/components/Base/Lucide";
import handlePromise from "@/utils/promise";
import ContractService from "@/services/ContractService";
import SelectContractModal from "./components/SelectContractModal";

function Main() {
    const { t } = useTranslation();
    const [alert, setAlert] = useContext(AlertContext);
    const [loading, setLoading] = useContext(LoadingContext);

    const [contractList, setContractList] = useState<any[]>([]);
    const [filteredContracts, setFilteredContracts] = useState<any[]>([]);
    const [selectedContract, setSelectedContract] = useState<any>(null);

    const [selectContractModal, setselectContractModal] = useState<boolean>(false);

    const getContracts = async () => {
        setLoading(true)
        const [error, response, data] = await handlePromise(ContractService.getContracts());
        setLoading(false)
        if (!response.ok) {
            return setAlert({
                type: "error",
                show: true,
                text: error ? error : "Error while retrieving contracts",
            })
        }
        setContractList(data)
    }

    const onFilter = async (data: any) => {
        console.log(data, contractList, "Filter")
        const filtered = contractList.filter((contract) => {
            if (data.dni) {
                if (contract.DNIAsegurado === data.dni) return contract
            }
        })

        if (filtered.length && filtered.length === 1) {
            setSelectedContract(filtered[0])
        } else if (filtered.length > 1) {
            setFilteredContracts(filtered)
        }
    }

    useEffect(() => {
        if (filteredContracts.length > 1) {
            setselectContractModal(true)
        }
    }, [filteredContracts])


    useEffect(() => {
        getContracts()
    }, [])




    return (
        <>
            <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
                <h2 className="mr-auto text-lg font-medium">{t("loadPolicy")}</h2>
            </div>
            <div className="p-5 mt-5 intro-y box">
                <PolicyFilters onFilter={onFilter} />
                <hr />

                {
                    selectedContract ? (
                        <div className="flex flex-col mt-4">
                            <div className="flex items-center gap-2">
                                <Lucide icon="CheckCircle" className="w-6 h-6 text-success" />
                                <span className="text-sm font-medium">{t("contractSelected")}</span>
                            </div>
                            <div className="flex flex-col mt-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{t("company")}</span>
                                    <span className="text-sm font-medium">{selectedContract.Compania.Codigo}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{t("branch")}</span>
                                    <span className="text-sm font-medium">{selectedContract.Ramo.Codigo}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{t("insuranceDNI")}</span>
                                    <span className="text-sm font-medium">{selectedContract.DNIAsegurado}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{t("policyNumber")}</span>
                                    <span className="text-sm font-medium">{selectedContract.CodigoPoliza}</span>
                                </div>
                            </div>
                        </div>
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
                setShow={setselectContractModal}
                filteredContracts={filteredContracts}
                selectedContract={selectedContract}
                setSelectedContract={setSelectedContract}
            />
        </>
    );
}

export default Main;