import { Menu } from "@/stores/menuSlice";

const ADMIN_NAVIGATION: Array<Menu> = [
    {
        icon: "Home",
        pathname: "/",
        title: "Home",
    },
    {
        icon: "Cog",
        title: "Administración",
        subMenu: [
            {
                icon: "Building",
                pathname: "/company-list",
                title: "Compañías"
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
