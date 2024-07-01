import { Menu } from "@/stores/menuSlice";

export interface Location {
    pathname: string;
    forceActiveMenu?: string;
}

export interface FormattedMenu extends Menu {
    active?: boolean;
    activeDropdown?: boolean;
    subMenu?: FormattedMenu[];
}
