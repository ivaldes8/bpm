import { createSlice } from "@reduxjs/toolkit";
import { icons } from "@/components/Base/Lucide";
import ADMIN_NAVIGATION from "@/navigation/admin-navigation";
import USER_NAVIGATION from "@/navigation/user-navigation";
import _ from "lodash";
import storage from "@/utils/storage";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  badge?: number;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface MenuState {
  menu: Array<Menu>;
}

const initialState: MenuState = {
  menu: [],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSideMenu: (state) => {
      const userData = _.get(storage.get(), 'userData')
      const role = userData.role.name ?? "USER";
      if (role && role === "ADMIN") {
        state.menu = ADMIN_NAVIGATION
      } else {
        state.menu = USER_NAVIGATION
      }
    },
  },
});

export const { setSideMenu } = menuSlice.actions;

export default menuSlice.reducer;
