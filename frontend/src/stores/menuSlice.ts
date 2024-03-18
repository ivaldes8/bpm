import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { type Themes } from "@/stores/themeSlice";
import { icons } from "@/components/Base/Lucide";
import { ADMIN_SIDE_MENU } from "@/utils/constants/Navigation";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  badge?: number;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface MenuState {
  menu: Array<Menu | string>;
}

const initialState: MenuState = {
  menu: [],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSideMenu: (state) => {
      const role = JSON.parse(sessionStorage.getItem("user")!)?.role
      if (role && role === "admin") {
        state.menu = ADMIN_SIDE_MENU
      } else {
        state.menu = ADMIN_SIDE_MENU
      }
    },
  },
});

export const selectMenu = (layout: Themes["layout"]) => (state: RootState) => {
  if (layout == "top-menu") {
    return ADMIN_SIDE_MENU;
  }

  if (layout == "simple-menu") {
    return ADMIN_SIDE_MENU;
  }

  return ADMIN_SIDE_MENU;
};

export const { setSideMenu } = menuSlice.actions;

export default menuSlice.reducer;
