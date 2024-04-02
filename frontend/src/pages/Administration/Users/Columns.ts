import { stringToHTML } from "@/utils/helper";
import { useTranslation } from "react-i18next";

const columns = () => {
    const { t } = useTranslation();

    const cols = [
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
            formatter(cell: any) {
                const response: any = cell.getData();
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
            formatter(cell: any) {
                const response: any = cell.getData();
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
            formatter(cell: any) {
                const response: any = cell.getData();
                return `<div class="flex items-center lg:justify-center ${response?.role?.name && response?.role?.name === "ADMIN" ? "text-warning" : "text-primary"}">
                            ${response?.role?.name ?? '---'}
                        </div>`;
            },
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
            formatterPrint(cell: any) {
                return cell.getValue() ? "Active" : "Inactive";
            },
        },
    ]

    return cols
}

export default columns