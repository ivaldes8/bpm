import Lucide from "@/components/Base/Lucide";
import Breadcrumb from "@/components/Base/Breadcrumb";
import { Menu } from "@/components/Base/Headless";
import fakerData from "@/utils/faker";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "@/stores/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/stores/hooks";
import Button from "@/components/Base/Button";
import { setCompany } from "@/stores/settingsSlice";

function Main() {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { userData } = useAppSelector((state) => state.auth);
  const { companyList, company } = useAppSelector((state) => state.settings);
  const { t } = useTranslation()

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className="h-[67px] z-[51] justify-between sm:justify-normal flex items-center relative border-b border-slate-200">
        <Breadcrumb className="hidden mr-auto -intro-x sm:flex">
          <Breadcrumb.Link to="/">Application</Breadcrumb.Link>
          <Breadcrumb.Link to="/" active={true}>
            Dashboard
          </Breadcrumb.Link>
        </Breadcrumb>

        <div className="mr-4 sm:mr-8 flex gap-2">
          <Menu >
            <Menu.Button as={Button} variant="outline-primary">
              {company?.Codigo ?? t("selectCompany")}
            </Menu.Button>
            <Menu.Items className="w-64" placement={window.innerWidth < 640 ? "bottom-start" : "bottom-end"}>
              {
                companyList.map((company, index) => (
                  <Menu.Item key={index} onClick={() => dispatch(setCompany(company))}>{company.Codigo}-{company.Nombre}</Menu.Item>
                ))
              }
            </Menu.Items>
          </Menu>

          {/* <Menu >
            <Menu.Button as={Button} variant="outline-primary">
              Caja: ---
            </Menu.Button>
            <Menu.Items className="w-64" placement={window.innerWidth < 640 ? "bottom-start" : "bottom-end"}>
              {
                companyList.map((company, index) => (
                  <Menu.Item key={index} onClick={() => dispatch(setCompany(company))}>{company.Codigo}-{company.Nombre}</Menu.Item>
                ))
              }
            </Menu.Items>
          </Menu>

          <Menu >
            <Menu.Button as={Button} variant="outline-primary">
              Lote: ---
            </Menu.Button>
            <Menu.Items className="w-64" placement={window.innerWidth < 640 ? "bottom-start" : "bottom-end"}>
              {
                companyList.map((company, index) => (
                  <Menu.Item key={index} onClick={() => dispatch(setCompany(company))}>{company.Codigo}-{company.Nombre}</Menu.Item>
                ))
              }
            </Menu.Items>
          </Menu> */}
        </div>


        {/* BEGIN: Account Menu */}
        <Menu>
          <Menu.Button className="flex justify-center items-center w-10 h-10 bg-theme-1 dark:bg-slate-700 overflow-hidden scale-110 rounded-full shadow-lg image-fit zoom-in intro-x">
            <Lucide icon="User" className="w-8 h-8 text-white" />
          </Menu.Button>
          <Menu.Items className="w-56 mt-px relative bg-primary/70 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
            <Menu.Header className="font-normal">
              <div className="font-medium">{userData?.Codigo}</div>
              <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                {userData?.Nombre}
              </div>
            </Menu.Header>
            <Menu.Divider className="bg-white/[0.08]" />
            <Menu.Item className="hover:bg-white/5" onClick={() => navigate("/profile")} >
              <Lucide icon="User" className="w-4 h-4 mr-2" /> {t("profile")}
            </Menu.Item>
            <Menu.Item className="hover:bg-white/5" onClick={() => navigate("change-password")}>
              <Lucide icon="Lock" className="w-4 h-4 mr-2" /> {t("change-password")}
            </Menu.Item>
            <Menu.Divider className="bg-white/[0.08]" />
            <Menu.Item className="hover:bg-white/5" onClick={() => dispatch(logout())}>
              <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" />{t("logout")}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;
