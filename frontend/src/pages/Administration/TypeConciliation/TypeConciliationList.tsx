import Button from "@/components/Base/Button";
import { useRef, useState, useContext } from "react";
import { ColumnDefinition } from "tabulator-tables";
import { useTranslation } from "react-i18next";
import { AlertContext } from "@/utils/Contexts/AlertContext";
import EditTypeConciliation from "./EditTypeConciliation";
import handlePromise from "@/utils/promise";
import ConfirmationModal from "@/custom-components/Modals/ConfirmationModal";
import { LoadingContext } from "@/utils/Contexts/LoadingContext";
import Table from "@/custom-components/Table/Table";
import columns from "./Columns";
import TableFilters from "./TableFilters";
import TypeConciliationService from "@/services/TypeConciliationService";

function Main() {
    const { t } = useTranslation();
    const [, setAlert] = useContext(AlertContext);
    const [, setLoading] = useContext(LoadingContext);

    const [showEditTypeConciliationModal, setShowEditTypeConciliationModal] = useState<boolean>(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);

    const table = useRef();
    const [filter, setFilter] = useState({
        field: "Nombre",
        type: "like",
        value: "",
    });

    const onDeleteTypeConciliation = async () => {
        setLoading(true)
        const [, response,] = await handlePromise(TypeConciliationService.deleteTypeConciliation(selectedRow.TipoConciliacionId));
        setLoading(false)
        if (!response.ok) {
            return setAlert({
                type: "error",
                show: true,
                text: "Delete failed",
            })
        }

        setAlert({
            type: "success",
            show: true,
            text: "Delete success",
        })

        onCloseModals()
        //@ts-ignore
        table.current?.refetchData();
    }
    const onCloseModals = () => {
        setSelectedRow(null)
        setShowEditTypeConciliationModal(false)
        setShowConfirmationModal(false)
    }

    const onFilter = () => {
        //@ts-ignore
        table.current?.onFilter();
    }

    const onResetFilter = () => {
        setFilter({
            ...filter,
            field: "Nombre",
            type: "like",
            value: "",
        });
        //@ts-ignore
        table.current?.onFilter();
        //@ts-ignore
        table.current?.refetchData()
    }

    const onPrint = () => {
        //@ts-ignore
        table.current?.onPrint();
    }

    const onExportCsv = () => {
        //@ts-ignore
        table.current?.onExportCsv();
    }

    const onExportJson = () => {
        //@ts-ignore
        table.current?.onExportJson();
    }

    const onExportXlsx = () => {
        //@ts-ignore
        table.current?.onExportXlsx();
    }

    const onExportHtml = () => {
        //@ts-ignore
        table.current?.onExportHtml();
    }

    return (
        <>
            <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
                <h2 className="mr-auto text-lg font-medium">{t("typeConciliations")}</h2>
                <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
                    <Button variant="primary" className="mr-2 shadow-md" onClick={() => setShowEditTypeConciliationModal(true)}>
                        {t("addTypeConciliation")}
                    </Button>
                </div>
            </div>

            <div className="p-5 mt-5 intro-y box">
                <TableFilters
                    filter={filter}
                    setFilter={setFilter}
                    onFilter={onFilter}
                    onResetFilter={onResetFilter}
                    onPrint={onPrint}
                    onExportCsv={onExportCsv}
                    onExportJson={onExportJson}
                    onExportXlsx={onExportXlsx}
                    onExportHtml={onExportHtml}
                />
                <Table
                    ref={table}
                    tableName="TypeConciliation"
                    endpoint="/type-conciliations"
                    columns={columns() as ColumnDefinition[]}
                    hasActions
                    filter={filter}
                    setFilter={setFilter}
                    onClickEdit={(row: any) => {
                        setSelectedRow(row)
                        setShowEditTypeConciliationModal(true)
                    }}
                    onClickDelete={(row: any) => {
                        setSelectedRow(row)
                        setShowConfirmationModal(true)
                    }}
                />
            </div>

            <EditTypeConciliation
                selectedRow={selectedRow}
                show={showEditTypeConciliationModal}
                setShow={() => onCloseModals()}
                onSubmit={() => {
                    onCloseModals()
                    //@ts-ignore
                    table.current?.refetchData();
                }}
            />

            <ConfirmationModal
                show={showConfirmationModal}
                setShow={setShowConfirmationModal}
                handleOnSubmit={() => { onDeleteTypeConciliation() }}
            />
        </>
    );
}

export default Main;