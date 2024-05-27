import { useEffect, useState } from 'react'
import ParentModal from '@/custom-components/Modals/ParentModal'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge';

type Props = {
    filteredContracts: any[],
    selectedContract: any,
    setSelectedContract: (contract: any) => void
    show: boolean,
    setShow: (show: boolean) => void
}

const SelectContractModal = ({ show, setShow, selectedContract, setSelectedContract, filteredContracts }: Props) => {

    const { t } = useTranslation()
    const [selectedList, setSelectedList] = useState<any>(null);

    const handleSubmit = async () => {
        setSelectedContract(selectedList)
        setShow(false)
    }

    useEffect(() => {
        if (show) {
            setSelectedList(null)
        }
    }, [show])

    return (
        <ParentModal
            size='md'
            title={t("selectContract")}
            show={show}
            setShow={setShow}
            handleOnSubmit={handleSubmit}
            submitButtonText={t("select")}
        >
            <div className="flex flex-col justify-center gap-2">
                {
                    filteredContracts.map((contract, index) => {
                        return (
                            <div key={index} className="intro-y" onClick={() => setSelectedList(contract)}>
                                <div className={twMerge([
                                    "flex items-center px-4 py-4 mb-3 box zoom-in",
                                    selectedList === contract && "bg-secondary"
                                ])}>
                                    <div className="ml-4 mr-auto">
                                        <div className="font-medium">{t("company")}: {contract.Compania.Codigo}</div>
                                        <div className="text-slate-500 text-xs mt-0.5">
                                            {t("branch")}: {contract.Ramo.Codigo}
                                        </div>
                                        <div className="text-slate-500 text-xs mt-0.5">
                                            {t("insuranceDNI")}: {contract.DNIAsegurado}
                                        </div>
                                    </div>
                                    <div className="px-2 py-1 text-xs font-medium text-white rounded-full cursor-pointer bg-success">
                                        {contract.CodigoPoliza && contract.CodigoPoliza !== "" ? contract.CodigoPoliza : contract.CodigoSolicitud}                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </ParentModal>
    )
}

export default SelectContractModal