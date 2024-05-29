import Button from "@/components/Base/Button";
import { useRef, useState, useContext } from "react";
import { ColumnDefinition } from "tabulator-tables";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { AlertContext } from "@/utils/Contexts/AlertContext";
import handlePromise from "@/utils/promise";
import ConfirmationModal from "@/custom-components/Modals/ConfirmationModal";
import { LoadingContext } from "@/utils/Contexts/LoadingContext";
import Table from "@/custom-components/Table/Table";
import columns from "./Columns";
import TableFilters from "./TableFilters";
import CompanyService from "@/services/CompanyService";
import UploadDetail from "./UploadDetail";
import UploadFile from "./UploadFile";

function Main() {
    const { t } = useTranslation();
    const [alert, setAlert] = useContext(AlertContext);
    const [loading, setLoading] = useContext(LoadingContext);

    const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);

    const table = useRef();
    const [filter, setFilter] = useState({
        field: "Tipo",
        type: "like",
        value: "",
    });


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
                <h2 className="mr-auto text-lg font-medium">{t("uploadDigitalSignatureFile")}</h2>
                <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
                    <Button variant="primary" className="mr-2 shadow-md" onClick={() => { setShowUploadModal(true) }}>
                        {t("add")}
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
                    tableName="DailyFiles"
                    endpoint="/load?type=FIRMA_DIGITAL"
                    columns={columns() as ColumnDefinition[]}
                    filter={filter}
                    setFilter={setFilter}
                    onClickDetail={(row: any) => {
                        setSelectedRow(row);
                        setShowDetailModal(true);
                    }}
                    hasActions
                />

                <UploadDetail
                    show={showDetailModal}
                    setShow={setShowDetailModal}
                    selectedRow={selectedRow}
                />

                <UploadFile
                    show={showUploadModal}
                    setShow={setShowUploadModal}
                    onRefresh={() => {
                        //@ts-ignore
                        table.current?.refetchData()
                    }}
                />
            </div>
        </>
    );
}

export default Main;