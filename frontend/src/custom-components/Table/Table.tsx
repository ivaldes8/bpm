import "@/assets/css/vendors/tabulator.css";
import * as xlsx from "xlsx";
import { useEffect, useRef, createRef, useContext, forwardRef, useImperativeHandle } from "react";
import { createIcons, icons } from "lucide";
import { ColumnDefinition, TabulatorFull as Tabulator } from "tabulator-tables";
import { stringToHTML } from "@/utils/helper";
import { useTranslation } from "react-i18next";
import { apiUrl } from "@/config/config";
import _ from "lodash";
import storage from "@/utils/storage";
import { AlertContext } from "@/utils/Contexts/AlertContext";

type Props = {
    tableName: string;
    columns: ColumnDefinition[];
    hasActions?: boolean;
    endpoint?: string;
    filter?: any;
    populateRole?: boolean;
    setFilter?: (filter: any) => void;
    onClickEdit?: (row: any) => void;
    onClickDelete?: (row: any) => void;
    onClickDetail?: (row: any) => void;
}

const Table = forwardRef(({ tableName, columns, hasActions = false, endpoint, filter, populateRole = false, setFilter, onClickEdit, onClickDelete, onClickDetail }: Props, ref) => {
    const { t } = useTranslation();
    const [, setAlert] = useContext(AlertContext);

    const tableRef = createRef<HTMLDivElement>();
    const tabulator = useRef<Tabulator>();

    useImperativeHandle(ref, () => ({
        refetchData: () => {
            tabulator.current?.replaceData()
        },
        onFilter: () => {
            onFilter()
        },
        onPrint: () => {
            tabulator.current?.print();
        },
        onExportCsv: () => {
            tabulator.current?.download("csv", "data.csv");
        },
        onExportJson: () => {
            tabulator.current?.download("json", "data.json");
        },
        onExportXlsx: () => {
            onExportXlsx()
        },
        onExportHtml: () => {
            tabulator.current?.download("html", "data.html", {
                style: true,
            });
        },
    }));


    const initTabulator = () => {
        if (tableRef.current) {
            tabulator.current = new Tabulator(tableRef.current, {
                ajaxURL: `${apiUrl}${endpoint}`,
                ajaxConfig: {
                    method: "GET",
                    headers: {
                        "Authorization": _.get(storage.get(), 'user.token')
                    },
                },
                ajaxResponse: function (url, params, response) {
                    if (response) {
                        let responseData = response

                        if (populateRole) {
                            responseData = responseData.map((d: any) => {
                                return { ...d, roleName: d.Rol.Nombre }
                            })
                        }
                        return responseData;
                    } else {
                        setAlert({
                            type: "error",
                            show: true,
                            text: "Upss! Algo salio mal.",
                        })
                        return []
                    }
                },
                printAsHtml: true,
                printStyled: true,
                pagination: true,
                paginationSize: 10,
                paginationSizeSelector: [10, 20, 30, 40],
                layout: "fitColumns",
                responsiveLayout: "collapse",
                placeholder: t("noData"),
                dataLoaderLoading: `${t("loading")}`,
                columns: [
                    ...columns,
                    hasActions ?

                        {
                            title: t("actions"),
                            minWidth: 200,
                            field: "actions",
                            responsive: 1,
                            hozAlign: "center",
                            headerHozAlign: "center",
                            vertAlign: "middle",
                            print: false,
                            download: false,
                            formatter(cell) {
                                const response: any = cell.getData()
                                const a = stringToHTML(`<div class="flex lg:justify-center items-center">
                                                        ${onClickEdit ? "<a class='edit-action flex items-center text-warning mr-3'><i data-lucide='pencil' class='w-4 h-4 mr-1'></i>Edit</a>" : ''}
                                                        ${onClickDelete ? "<a class='delete-action flex items-center text-danger'><i data-lucide='trash-2' class='w-4 h-4 mr-1'></i>Delete</a>" : ''}
                                                        ${onClickDetail ? "<a class='detail-action flex items-center text-primary ml-3'><i data-lucide='eye' class='w-4 h-4 mr-1'></i>Detail</a>" : ''}
                                                    </div>`);

                                // Adding event listeners for edit and delete actions
                                const editLink = a.querySelector('.edit-action');
                                const deleteLink = a.querySelector('.delete-action');
                                const detailLink = a.querySelector('.detail-action');

                                if (editLink && deleteLink) {
                                    editLink.addEventListener("click", function () {
                                        if (onClickEdit) onClickEdit(response)
                                    });

                                    deleteLink.addEventListener("click", function () {
                                        if (onClickDelete) onClickDelete(response)
                                    });
                                }

                                if (detailLink) {
                                    detailLink.addEventListener("click", function () {
                                        if (onClickDetail) onClickDetail(response)
                                    });
                                }
                                return a;
                            }
                        } : {
                            title: t("actions"),
                            minWidth: 200,
                            field: "actions",
                            responsive: 1,
                            hozAlign: "center",
                            headerHozAlign: "center",
                            vertAlign: "middle",
                            print: false,
                            download: false,
                            visible: false
                        },

                ],
            });
        }

        tabulator.current?.on("renderComplete", () => {
            createIcons({
                icons,
                attrs: {
                    "stroke-width": 1.5,
                },
                nameAttr: "data-lucide",
            });
        });
    };

    // Redraw table onresize
    const reInitOnResizeWindow = () => {
        window.addEventListener("resize", () => {
            if (tabulator.current) {
                tabulator.current.redraw();
                createIcons({
                    icons,
                    attrs: {
                        "stroke-width": 1.5,
                    },
                    nameAttr: "data-lucide",
                });
            }
        });
    };

    // Filter function
    const onFilter = () => {
        if (tabulator.current) {
            tabulator.current.setFilter(filter.field, filter.type, filter.value);
        }
    };

    const onExportXlsx = () => {
        if (tabulator.current) {
            (window as any).XLSX = xlsx;
            tabulator.current.download("xlsx", "data.xlsx", {
                sheetName: tableName,
            });
        }
    };

    useEffect(() => {
        initTabulator();
        reInitOnResizeWindow();
    }, []);

    return (
        <>
            <div className="overflow-x-auto scrollbar-hidden">
                <div id="tabulator" ref={tableRef} className="mt-5"></div>
            </div>
        </>
    );
})

export default Table;