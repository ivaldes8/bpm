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
            field: "Nombre",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell: any) {
                const response: any = cell.getData();
                return `<div>
                            <div class="font-medium whitespace-nowrap">${response.Nombre}</div>
                            <div class="text-slate-500 text-xs whitespace-nowrap">${response.Codigo}</div>
                        </div>`;
            },
        },
        {
            title: t("active"),
            minWidth: 200,
            field: "Activo",
            hozAlign: "center",
            headerHozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell: any) {
                const response: any = cell.getData();
                return `<div class="flex items-center lg:justify-center ${response.Activo ? "text-success" : "text-danger"}">
                            <i data-lucide="check-square" class="w-4 h-4 mr-2"></i> ${response.Activo ? "Active" : "Inactive"}
                        </div>`;
            },
        },
        {
            title: t("role"),
            minWidth: 200,
            field: "Rol",
            hozAlign: "center",
            headerHozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell: any) {
                const response: any = cell.getData();
                return `<div class="flex items-center lg:justify-center ${response?.Rol?.Nombre && response?.Rol?.Nombre === "ADMIN" ? "text-warning" : "text-primary"}">
                            ${response?.Rol?.Nombre ?? '---'}
                        </div>`;
            },
        },

        // For print format
        {
            title: t("name"),
            field: "Nombre",
            visible: false,
            print: true,
            download: true,
        },
        {
            title: t("code"),
            field: "Codigo",
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
            field: "Activo",
            visible: false,
            print: true,
            download: true,
            formatterPrint(cell: any) {
                return cell.getValue() ? "Activo" : "Inactivo";
            },
        },
    ]

    return cols
}

export default columns