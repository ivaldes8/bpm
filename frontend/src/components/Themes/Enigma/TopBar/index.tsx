import { Link, useNavigate } from "react-router-dom";
import Lucide from "@/components/Base/Lucide";
import logoUrl from "@/assets/images/logo.svg";
import Breadcrumb from "@/components/Base/Breadcrumb";
import { Menu } from "@/components/Base/Headless";
import _ from "lodash";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { logout } from "@/stores/authSlice";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/stores/hooks";

function Main(props: { layout?: "side-menu" | "simple-menu" | "top-menu" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { userData } = useAppSelector((state) => state.auth);
  const { t } = useTranslation()

  return (
    <>
      <div
        className={clsx([
          "h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700",
          props.layout == "top-menu" && "dark:md:from-darkmode-800",
          "before:content-[''] before:absolute before:h-[65px] before:inset-0 before:top-0 before:mx-7 before:bg-primary/30 before:mt-3 before:rounded-xl before:hidden before:md:block before:dark:bg-darkmode-600/30",
          "after:content-[''] after:absolute after:inset-0 after:h-[65px] after:mx-3 after:bg-primary after:mt-5 after:rounded-xl after:shadow-md after:hidden after:md:block after:dark:bg-darkmode-600",
        ])}
      >
        <div className="flex items-center h-full">
          {/* BEGIN: Logo */}
          <Link
            to="/"
            className={clsx([
              "-intro-x hidden md:flex",
              props.layout == "side-menu" && "xl:w-[180px]",
              props.layout == "simple-menu" && "xl:w-auto",
              props.layout == "top-menu" && "w-auto",
            ])}
          >
            <img
              alt="Enigma Tailwind HTML Admin Template"
              className="w-6"
              src={logoUrl}
            />
            <span
              className={clsx([
                "ml-3 text-lg text-white",
                props.layout == "side-menu" && "hidden xl:block",
                props.layout == "simple-menu" && "hidden",
              ])}
            >
              {" "}
              Enigma{" "}
            </span>
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <Breadcrumb
            light
            className={clsx([
              "h-[45px] md:ml-10 md:border-l border-white/[0.08] dark:border-white/[0.08] mr-auto -intro-x",
              props.layout != "top-menu" && "md:pl-6",
              props.layout == "top-menu" && "md:pl-10",
            ])}
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
    </>
  );
}

export default Main;
