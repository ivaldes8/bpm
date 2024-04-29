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
            title: t("type"),
            minWidth: 200,
            field: "Tipo",
            hozAlign: "center",
            headerHozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell: any) {
                const response: any = cell.getData();
                return `<div class="flex items-center lg:justify-center">
                            ${response?.Tipo ?? '---'}
                        </div>`;
            },
        },
        {
            title: t("totalRecords"),
            minWidth: 200,
            field: "TotalRegistros",
            hozAlign: "center",
            headerHozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell: any) {
                const response: any = cell.getData();
                return `<div class="flex items-center lg:justify-center">
                            ${response?.TotalRegistros ?? '---'}
                        </div>`;
            },
        },
        {
            title: t("okRecords"),
            minWidth: 200,
            field: "RegistrosOk",
            hozAlign: "center",
            headerHozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell: any) {
                const response: any = cell.getData();
                return `<div class="flex items-center lg:justify-center">
                            ${response?.RegistrosOk ?? '---'}
                        </div>`;
            },
        },
        {
            title: t("errorRecords"),
            minWidth: 200,
            field: "RegistrosError",
            hozAlign: "center",
            headerHozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell: any) {
                const response: any = cell.getData();
                return `<div class="flex items-center lg:justify-center">
                            ${response?.RegistrosError ?? '---'}
                        </div>`;
            },
        },
        {
            title: t("createdAt"),
            minWidth: 200,
            field: "FechaCarga",
            hozAlign: "center",
            headerHozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell: any) {
                const response: any = cell.getData();
                return `<div class="flex items-center lg:justify-center">
                            ${response?.FechaCarga ? new Date(response?.FechaCarga).toLocaleDateString() : '---'}
                        </div>`;
            },
        },
        {
            title: t("updatedAt"),
            minWidth: 200,
            field: "FechaUltimaModif",
            hozAlign: "center",
            headerHozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell: any) {
                const response: any = cell.getData();
                return `<div class="flex items-center lg:justify-center">
                ${response?.FechaUltimaModif ? new Date(response?.FechaUltimaModif).toLocaleDateString() : '---'}
                        </div>`;
            },
        },


        // For print format
        {
            title: t("type"),
            field: "Tipo",
            visible: false,
            print: true,
            download: true,
        },
        {
            title: t("totalRecords"),
            field: "TotalRegistros",
            visible: false,
            print: true,
            download: true,
        },
        {
            title: t("okRecords"),
            field: "RegistrosOk",
            visible: false,
            print: true,
            download: true,
        },
        {
            title: t("errorRecords"),
            field: "RegistrosError",
            visible: false,
            print: true,
            download: true,
        },
        {
            title: t("createdAt"),
            field: "FechaCarga",
            visible: false,
            print: true,
            download: true,
        },
        {
            title: t("updatedAt"),
            field: "FechaUltimaModif",
            visible: false,
            print: true,
            download: true,
        },
    ]

    return cols
}

export default columns