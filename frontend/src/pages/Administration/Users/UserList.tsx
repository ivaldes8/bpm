import "@/assets/css/vendors/tabulator.css";
import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import { FormInput, FormSelect } from "@/components/Base/Form";
import * as xlsx from "xlsx";
import { useEffect, useRef, createRef, useState, useContext } from "react";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { stringToHTML } from "@/utils/helper";
import { useTranslation } from "react-i18next";
import { apiUrl } from "@/config/config";
import _ from "lodash";
import storage from "@/utils/storage";
import { AlertContext } from "@/utils/Contexts/AlertContext";
import EditUser from "./EditUser";
import handlePromise from "@/utils/promise";
import ConfirmationModal from "@/custom-components/Modals/ConfirmationModal";
import { LoadingContext } from "@/utils/Contexts/LoadingContext";
import UserService from "@/services/UserService";

interface Response {
    name?: string;
    email?: string;
    code?: string;
    active?: boolean;
    role?: {
        id: number | string;
        name: string;
    }
}

function Main() {
    const { t } = useTranslation();
    const [alert, setAlert] = useContext(AlertContext);
    const [loading, setLoading] = useContext(LoadingContext);

    const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);

    const tableRef = createRef<HTMLDivElement>();
    const tabulator = useRef<Tabulator>();
    const [filter, setFilter] = useState({
        field: "name",
        type: "like",
        value: "",
    });

    const initTabulator = () => {
        if (tableRef.current) {
            tabulator.current = new Tabulator(tableRef.current, {
                ajaxURL: `${apiUrl}/users/`,
                ajaxConfig: {
                    method: "GET",
                    headers: {
                        "Authorization": _.get(storage.get(), 'user.token')
                    },
                },
                ajaxResponse: function (url, params, response) {
                    if (response && response.length) {
                        let responseData = response.map((d: any) => {
                            return { ...d, roleName: d.role.name }
                        })
                        return responseData;
                    } else {
                        setAlert({
                            type: "error",
                            show: true,
                            text: "Upss! Algo salio mal.",
                        })
                        return { data: [] }
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
                    {
                        title: "",
                        formatter: "responsiveCollapse",
                        width: 40,
                        minWidth: 30,
                        hozAlign: "center",
                        resizable: false,
                        headerSort: false,
                    },
                    {
                        title: t("user"),
                        minWidth: 200,
                        responsive: 0,
                        field: "name",
                        vertAlign: "middle",
                        print: false,
                        download: false,
                        formatter(cell) {
                            const response: Response = cell.getData();
                            return `<div>
                                        <div class="font-medium whitespace-nowrap">${response.name}</div>
                                        <div class="text-slate-500 text-xs whitespace-nowrap">${response.email}</div>
                                    </div>`;
                        },
                    },

                    {
                        title: t("code"),
                        minWidth: 200,
                        field: "code",
                        hozAlign: "center",
                        headerHozAlign: "center",
                        vertAlign: "middle",
                        print: false,
                        download: false,
                    },
                    {
                        title: t("active"),
                        minWidth: 200,
                        field: "active",
                        hozAlign: "center",
                        headerHozAlign: "center",
                        vertAlign: "middle",
                        print: false,
                        download: false,
                        formatter(cell) {
                            const response: Response = cell.getData();
                            return `<div class="flex items-center lg:justify-center ${response.active ? "text-success" : "text-danger"}">
                                        <i data-lucide="check-square" class="w-4 h-4 mr-2"></i> ${response.active ? "Active" : "Inactive"}
                                    </div>`;
                        },
                    },
                    {
                        title: t("role"),
                        minWidth: 200,
                        field: "role",
                        hozAlign: "center",
                        headerHozAlign: "center",
                        vertAlign: "middle",
                        print: false,
                        download: false,
                        formatter(cell) {
                            const response: Response = cell.getData();
                            return `<div class="flex items-center lg:justify-center ${response?.role?.name && response?.role?.name === "ADMIN" ? "text-warning" : "text-primary"}">
                                        ${response?.role?.name ?? '---'}
                                    </div>`;
                        },
                    },
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
                            const response: Response = cell.getData()
                            const a = stringToHTML(`<div class="flex lg:justify-center items-center">
                                                        <a class="edit-action flex items-center text-warning mr-3" href="javascript:;">
                                                            <i data-lucide="pencil" class="w-4 h-4 mr-1"></i> Edit
                                                        </a>
                                                        <a class="delete-action flex items-center text-danger" href="javascript:;">
                                                            <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
                                                        </a>
                                                    </div>`);

                            // Adding event listeners for edit and delete actions
                            const editLink = a.querySelector('.edit-action');
                            const deleteLink = a.querySelector('.delete-action');

                            if (editLink && deleteLink) {
                                editLink.addEventListener("click", function () {
                                    setSelectedRow(response)
                                    setShowEditUserModal(true)
                                });

                                deleteLink.addEventListener("click", function () {
                                    setSelectedRow(response)
                                    setShowConfirmationModal(true)
                                });
                            }
                            return a;
                        }
                    },

                    // For print format
                    {
                        title: t("name"),
                        field: "name",
                        visible: false,
                        print: true,
                        download: true,
                    },
                    {
                        title: t("email"),
                        field: "email",
                        visible: false,
                        print: true,
                        download: true,
                    },
                    {
                        title: t("code"),
                        field: "code",
                        visible: false,
                        print: true,
                        download: true,
                    },
                    {
                        title: t("role"),
                        field: "roleName",
                        visible: false,
                        print: true,
                        download: true,
                    },
                    {
                        title: t("active"),
                        field: "active",
                        visible: false,
                        print: true,
                        download: true,
                        formatterPrint(cell) {
                            return cell.getValue() ? "Active" : "Inactive";
                        },
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

    // On reset filter
    const onResetFilter = () => {
        setFilter({
            ...filter,
            field: "name",
            type: "like",
            value: "",
        });
        onFilter();
        tabulator.current?.replaceData()
    };

    // Export
    const onExportCsv = () => {
        if (tabulator.current) {
            tabulator.current.download("csv", "data.csv");
        }
    };

    const onExportJson = () => {
        if (tabulator.current) {
            tabulator.current.download("json", "data.json");
        }
    };

    const onExportXlsx = () => {
        if (tabulator.current) {
            (window as any).XLSX = xlsx;
            tabulator.current.download("xlsx", "data.xlsx", {
                sheetName: "Users",
            });
        }
    };

    const onExportHtml = () => {
        if (tabulator.current) {
            tabulator.current.download("html", "data.html", {
                style: true,
            });
        }
    };

    const onPrint = () => {
        if (tabulator.current) {
            tabulator.current.print();
        }
    };

    const onCloseModals = () => {
        setSelectedRow(null)
        setShowEditUserModal(false)
        setShowConfirmationModal(false)
    }

    const onDeleteUser = async () => {
        setLoading(true)
        const [error, response, data] = await handlePromise(UserService.deleteUser(selectedRow.id));
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
        tabulator.current?.replaceData()
    }

    useEffect(() => {
        initTabulator();
        reInitOnResizeWindow();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
                <h2 className="mr-auto text-lg font-medium">{t("users")}</h2>
                <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
                    <Button variant="primary" className="mr-2 shadow-md" onClick={() => setShowEditUserModal(true)}>
                        {t("addUser")}
                    </Button>
                </div>
            </div>
            {/* BEGIN: HTML Table Data */}
            <div className="p-5 mt-5 intro-y box">
                <div className="flex flex-col sm:flex-row sm:items-end xl:items-start">
                    <form
                        id="tabulator-html-filter-form"
                        className="xl:flex sm:mr-auto"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onFilter();
                        }}
                    >
                        <div className="items-center sm:flex sm:mr-4">
                            <label className="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                                {t("column")}
                            </label>
                            <FormSelect
                                id="tabulator-html-filter-field"
                                value={filter.field}
                                onChange={(e) => {
                                    setFilter({
                                        ...filter,
                                        field: e.target.value,
                                    });
                                }}
                                className="w-full mt-2 2xl:w-full sm:mt-0 sm:w-auto"
                            >
                                <option value="name">{t("name")}</option>
                                <option value="email">{t("email")}</option>
                                <option value="code">{t("code")}</option>
                            </FormSelect>
                        </div>
                        <div className="items-center mt-2 sm:flex sm:mr-4 xl:mt-0">
                            <label className="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                                {t("type")}
                            </label>
                            <FormSelect
                                id="tabulator-html-filter-type"
                                value={filter.type}
                                onChange={(e) => {
                                    setFilter({
                                        ...filter,
                                        type: e.target.value,
                                    });
                                }}
                                className="w-full mt-2 sm:mt-0 sm:w-auto"
                            >
                                <option value="like">like</option>
                                <option value="=">=</option>
                                <option value="<">&lt;</option>
                                <option value="<=">&lt;=</option>
                                <option value=">">&gt;</option>
                                <option value=">=">&gt;=</option>
                                <option value="!=">!=</option>
                            </FormSelect>
                        </div>
                        <div className="items-center mt-2 sm:flex sm:mr-4 xl:mt-0">
                            <label className="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                                {t("value")}
                            </label>
                            <FormInput
                                id="tabulator-html-filter-value"
                                value={filter.value}
                                onChange={(e) => {
                                    setFilter({
                                        ...filter,
                                        value: e.target.value,
                                    });
                                }}
                                type="text"
                                className="mt-2 sm:w-40 2xl:w-full sm:mt-0"
                                placeholder="Search..."
                            />
                        </div>
                        <div className="mt-0 xl:mt-0">
                            <Button
                                id="tabulator-html-filter-go"
                                variant="primary"
                                type="button"
                                onClick={onFilter}
                            >
                                <Lucide icon="Search" className="w-4 h-4" />
                            </Button>
                            <Button
                                id="tabulator-html-filter-reset"
                                variant="secondary"
                                type="button"
                                className="mx-1"
                                onClick={onResetFilter}
                            >
                                <Lucide icon="Eraser" className="w-4 h-4" />
                            </Button>
                        </div>
                    </form>
                    <div className="flex mt-5 sm:mt-0">
                        <Button
                            id="tabulator-print"
                            variant="outline-secondary"
                            className="w-1/2 mr-2 sm:w-auto"
                            onClick={onPrint}
                        >
                            <Lucide icon="Printer" className="w-4 h-4" />
                        </Button>
                        <Menu className="w-1/2 sm:w-auto">
                            <Menu.Button
                                as={Button}
                                variant="outline-secondary"
                                className="w-full sm:w-auto"
                            >
                                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> {t("export")}
                                <Lucide
                                    icon="ChevronDown"
                                    className="w-4 h-4 ml-auto sm:ml-2"
                                />
                            </Menu.Button>
                            <Menu.Items className="w-40">
                                <Menu.Item onClick={onExportCsv}>
                                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> {t("export")} CSV
                                </Menu.Item>
                                <Menu.Item onClick={onExportJson}>
                                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> {t("export")} JSON
                                </Menu.Item>
                                <Menu.Item onClick={onExportXlsx}>
                                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> {t("export")} XLSX
                                </Menu.Item>
                                <Menu.Item onClick={onExportHtml}>
                                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> {t("export")} HTML
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
                <div className="overflow-x-auto scrollbar-hidden">
                    <div id="tabulator" ref={tableRef} className="mt-5"></div>
                </div>
            </div>

            <EditUser
                selectedRow={selectedRow}
                show={showEditUserModal}
                setShow={() => onCloseModals()}
                onSubmit={() => {
                    onCloseModals()
                    tabulator.current?.replaceData()
                }}
            />

            <ConfirmationModal
                show={showConfirmationModal}
                setShow={setShowConfirmationModal}
                handleOnSubmit={() => { onDeleteUser() }}
            />
        </>
    );
}

export default Main;
