import Lucide from "@/components/Base/Lucide";
import logoUrl from "@/assets/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "@/components/Base/Breadcrumb";
import { Menu } from "@/components/Base/Headless";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "@/stores/authSlice";
import { useAppSelector } from "@/stores/hooks";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { userData } = useAppSelector((state) => state.auth);
  const { t } = useTranslation()


  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className="top-bar-boxed relative z-[51] -mx-5 mb-12 mt-12 h-[70px] border-b border-white/[0.08] px-3 sm:-mx-8 sm:px-8 md:-mt-5 md:pt-0">
        <div className="flex items-center h-full">
          {/* BEGIN: Logo */}
          <Link to="/" className="hidden -intro-x md:flex">
            <img
              alt="Icewall Tailwind HTML Admin Template"
              className="w-6"
              src={logoUrl}
            />
            <span className="ml-3 text-lg text-white"> Icewall </span>
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <Breadcrumb
            light
            className="h-full md:ml-10 md:pl-10 md:border-l border-white/[0.08] mr-auto -intro-x"
          >
            <Breadcrumb.Link to="/">Application</Breadcrumb.Link>
            <Breadcrumb.Link to="/" active={true}>
              Dashboard
            </Breadcrumb.Link>
          </Breadcrumb>
          {/* END: Breadcrumb */}
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
          {/* END: Account Menu */}
        </div>
      </div>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;
