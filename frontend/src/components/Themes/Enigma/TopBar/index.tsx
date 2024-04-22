import { Link, useNavigate } from "react-router-dom";
import Lucide from "@/components/Base/Lucide";
import logoUrl from "@/assets/images/serviformlogoOnly.png";
import { Menu } from "@/components/Base/Headless";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { logout } from "@/stores/authSlice";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/stores/hooks";
import Button from "@/components/Base/Button";
import { useState } from "react";
import { FormInput } from "@/components/Base/Form";
import { setCaja, setCompany, setLote } from "@/stores/settingsSlice";
import ParentModal from "@/custom-components/Modals/ParentModal";

function Main(props: { layout?: "side-menu" | "simple-menu" | "top-menu" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { userData } = useAppSelector((state) => state.auth);
  const { companyList, company, lote, caja } = useAppSelector((state) => state.settings);
  const { t } = useTranslation()

  const [showLoteCajaModal, setShowLoteCajaModal] = useState<boolean>(false);

  return (
    <>
      <div
        className={clsx([
          "h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700",
          props.layout == "top-menu" && "dark:md:from-darkmode-800",
          "before:content-[''] before:absolute before:h-[65px] before:inset-0 before:top-0 before:mx-7 before:bg-primary/30 before:mt-3 before:rounded-xl before:hidden before:md:block before:dark:bg-darkmode-600/30",
          "after:content-['']  after:absolute after:inset-0 after:h-[65px] after:mx-3 after:bg-primary after:mt-5 after:rounded-xl after:shadow-md after:hidden after:md:block after:dark:bg-darkmode-600",
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
              BPM{" "}
            </span>
          </Link>
          {/* END: Logo */}



          <div className="sm:justify-end justify-between w-full flex">
            <div className="items-center hidden sm:flex">
              <div className="relative intro-x">
                <div className="hidden sm:block">
                  <FormInput
                    value={lote ?? ''}
                    type="text"
                    className="border-transparent w-24 shadow-none rounded-full bg-slate-200 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-28 dark:bg-darkmode-400/70"
                    placeholder={t("batch")}
                    onChange={(e) => dispatch(setLote(e.target.value))}
                  />
                </div>
              </div>
              <Lucide icon="SeparatorVertical" className="z-10 w-5 h-5 text-white dark:text-slate-500" />
              <div className="relative intro-x">
                <div className="hidden sm:block">
                  <FormInput
                    value={caja ?? ''}
                    type="text"
                    className="border-transparent w-24 shadow-none rounded-full bg-slate-200 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-28 dark:bg-darkmode-400/70"
                    placeholder={t("box")}
                    onChange={(e) => dispatch(setCaja(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="relative sm:hidden z-10">
                <Button variant="primary" onClick={() => setShowLoteCajaModal(true)}>
                  {lote ?? t("batch")}
                  {"/"}
                  {caja ?? t("box")}
                </Button>
              </div>

              <Menu className="z-10 ml-2 mr-auto">
                <Menu.Button as={Button} variant="primary">
                  {company?.Codigo ?? t("company")}
                </Menu.Button>
                <Menu.Items className="w-64" placement={window.innerWidth < 640 ? "bottom-start" : "bottom-end"}>
                  {
                    companyList.map((company, index) => (
                      <Menu.Item key={index} onClick={() => dispatch(setCompany(company))}>{company.Codigo}-{company.Nombre}</Menu.Item>
                    ))
                  }
                </Menu.Items>
              </Menu>
            </div>

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
        </div>
      </div>

      <ParentModal
        size='sm'
        title={t("batchBoxEdit")}
        show={showLoteCajaModal}
        setShow={setShowLoteCajaModal}
        hideFooter={true}
      >
        <div className="items-center flex justify-center">
          <div className="relative intro-x">
            <div className="block">
              <FormInput
                value={lote ?? ''}
                type="text"
                className="border-transparent w-24 shadow-none rounded-full bg-slate-200 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-28 dark:bg-darkmode-400/70"
                placeholder={t("batch")}
                onChange={(e) => dispatch(setLote(e.target.value))}
              />
            </div>
          </div>
          <Lucide icon="SeparatorVertical" className="w-5 h-5 dark:text-slate-500" />
          <div className="relative intro-x">
            <div className="block">
              <FormInput
                value={caja ?? ''}
                type="text"
                className="border-transparent w-24 shadow-none rounded-full bg-slate-200 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-28 dark:bg-darkmode-400/70"
                placeholder={t("box")}
                onChange={(e) => dispatch(setCaja(e.target.value))}
              />
            </div>
          </div>
        </div>
      </ParentModal>
    </>
  );
}

export default Main;
