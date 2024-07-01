import { Menu } from "@/stores/menuSlice";
import MONITOR_NAVIGATION from "./monitor-navigation";

const ADMIN_NAVIGATION: Array<Menu> = [...MONITOR_NAVIGATION, 
    {
        icon: "Cog",
        title: "Administración",
        subMenu: [
            {
                icon: "LampDesk",
                pathname: "/mediators-list",
                title: "Comerciales"
            },
            {
                icon: "Building",
                pathname: "/company-list",
                title: "Compañías"
            },
            {
                icon: "FileStack",
                pathname: "/familydoc-list",
                title: "Familia de documentos"

            },   
            {
                icon: "FileCheck",
                pathname: "/typeconciliation-list",
                title: "Tipos de conciliación"
            
            },     
            {
                icon: "UserRoundCog",
                pathname: "/user-list",
                title: "Usuarios"
            }
        ],
    },
]

export default ADMIN_NAVIGATION;
