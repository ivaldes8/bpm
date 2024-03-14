import { Menu } from "@/stores/menuSlice";

export const PARENT_SCREEN = '';

export const LOGIN_SCREEN = 'login';
export const REGISTER_SCREEN = 'register';

export const ADMIN_SCREEN = 'admin';


export const ADMIN_SIDE_MENU: Array<Menu> = [
    {
        icon: "Home",
        pathname: "/",
        title: "Home",
    },
    {
        icon: "User",
        pathname: "/admin",
        title: "Administration",
    },
]

export const USER_SIDE_MENU: Array<Menu> = [

    {
        icon: "Home",
        pathname: "/",
        title: "Home",
    }
]
