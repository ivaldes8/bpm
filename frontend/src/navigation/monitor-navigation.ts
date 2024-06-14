import { Menu } from "@/stores/menuSlice";

const MONITOR_NAVIGATION: Array<Menu> = [
    {
        icon: "Home",
        pathname: "/",
        title: "Home",
    },
    {
        icon: "HardDriveUpload",
        title: "Carga",
        subMenu: [
            {
                icon: "CalendarCheck2",
                pathname: "/upload-daily",
                title: "Fichero de carga diaria"
            },
            {
                icon: "Tablet",
                pathname: "/upload-tablet",
                title: "Fichero de tableta"
            },
            {
                icon: "FileX",
                pathname: "/upload-cancellation",
                title: "Anulaciones"
            },
            {
                icon: "ClipboardPen",
                pathname: "/upload-digital-signature",
                title: "Firma digital"
            }
        ],
    },
    {
        icon: "Database",
        title: "Grabación de datos",
        subMenu: [
            {
                icon: "ShieldCheck",
                pathname: "/load-policy",
                title: "Grabación de poliza"
            },
            {
                icon: "ShieldX",
                pathname: "/load-incidence-policy",
                title: "Grabación de poliza con incidencia"
            },
            // {
            //     icon: "Paperclip",
            //     pathname: "/user-list",
            //     title: "Alta anexos"
            // },
            // {
            //     icon: "NotebookPen",
            //     pathname: "/user-list",
            //     title: "Editar anexos"
            // },
            // {
            //     icon: "FilePlus",
            //     pathname: "/user-list",
            //     title: "Alta manual"
            // }
        ],
    },
]

export default MONITOR_NAVIGATION;
