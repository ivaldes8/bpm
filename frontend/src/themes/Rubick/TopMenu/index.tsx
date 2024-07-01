import "@/assets/css/themes/rubick/top-nav.css";
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/stores/hooks";
import { FormattedMenu } from "@/types/sideMenu";
import { linkTo, nestedMenu } from "@/utils/themes";
import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";
import logoUrl from "@/assets/images/serviformlogoOnly.png";
import clsx from "clsx";
import MobileMenu from "@/components/MobileMenu";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "@/stores/authSlice";
import { FormInput } from "@/components/Base/Form";
import { setCaja, setCompany, setLote } from "@/stores/settingsSlice";
import Button from "@/components/Base/Button";
import ParentModal from "@/custom-components/Modals/ParentModal";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState<
    Array<FormattedMenu | "divider">
  >([]);
  const { menu } = useAppSelector((state) => state.menu);
  const topMenu = () => nestedMenu(menu, location);

  const dispatch = useDispatch()
  const { userData } = useAppSelector((state) => state.auth);
  const { companyList, company, lote, caja } = useAppSelector((state) => state.settings);
  const { t } = useTranslation()

  const [showLoteCajaModal, setShowLoteCajaModal] = useState<boolean>(false);

  useEffect(() => {
    setFormattedMenu(topMenu());
  }, [menu, location.pathname]);

  return (
    <div
      className={clsx([
        "rubick px-5 sm:px-8 py-5",
        "before:content-[''] before:bg-gradient-to-b before:from-theme-1 before:to-theme-2 dark:before:from-darkmode-800 dark:before:to-darkmode-800 before:fixed before:inset-0 before:z-[-1]",
      ])}
    >
      <MobileMenu />
      {/* BEGIN: Top Bar */}
      <div className="border-b border-white/[0.08] mt-[2.2rem] md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 pt-3 md:pt-0 mb-10">
        <div className="flex items-center h-[70px] z-[51] relative">
          {/* BEGIN: Logo */}
          <Link to="/" className="hidden -intro-x md:flex">
            <img
              alt="Midone Tailwind HTML Admin Template"
              className="w-6"
              src={logoUrl}
            />
            <span className="ml-3 text-lg text-white"> BPM </span>
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
      {/* END: Top Bar */}
      {/* BEGIN: Top Menu */}
      <nav className="relative z-50 hidden top-nav md:block">
        <ul className="pb-3 xl:pb-0 xl:px-[50px] flex flex-wrap">
          {formattedMenu.map(
            (menu, menuKey) =>
              menu != "divider" && (
                <li key={menuKey}>
                  <a
                    href={menu.subMenu ? "#" : menu.pathname}
                    className={clsx([
                      menu.active ? "top-menu top-menu--active" : "top-menu",
                    ])}
                    onClick={(event) => {
                      event.preventDefault();
                      linkTo(menu, navigate);
                    }}
                  >
                    <div className="top-menu__icon">
                      <Lucide icon={menu.icon} />
                    </div>
                    <div className="top-menu__title">
                      {menu.title}
                      {menu.subMenu && (
                        <Lucide
                          className="top-menu__sub-icon"
                          icon="ChevronDown"
                        />
                      )}
                    </div>
                  </a>
                  {menu.subMenu && (
                    <ul>
                      {menu.subMenu.map((subMenu, subMenuKey) => (
                        <li key={subMenuKey}>
                          <a
                            href={subMenu.subMenu ? "#" : subMenu.pathname}
                            className="top-menu"
                            onClick={(event) => {
                              event.preventDefault();
                              linkTo(subMenu, navigate);
                            }}
                          >
                            <div className="top-menu__icon">
                              <Lucide icon={subMenu.icon} />
                            </div>
                            <div className="top-menu__title">
                              {subMenu.title}
                              {subMenu.subMenu && (
                                <Lucide
                                  v-if="subMenu.subMenu"
                                  className="top-menu__sub-icon"
                                  icon="ChevronDown"
                                />
                              )}
                            </div>
                          </a>
                          {subMenu.subMenu && (
                            <ul
                              v-if="subMenu.subMenu"
                              className={clsx({
                                "side-menu__sub-open": subMenu.activeDropdown,
                              })}
                            >
                              {subMenu.subMenu.map(
                                (lastSubMenu, lastSubMenuKey) => (
                                  <li key={lastSubMenuKey}>
                                    <a
                                      href={
                                        lastSubMenu.subMenu
                                          ? "#"
                                          : lastSubMenu.pathname
                                      }
                                      className="top-menu"
                                      onClick={(event) => {
                                        event.preventDefault();
                                        linkTo(lastSubMenu, navigate);
                                      }}
                                    >
                                      <div className="top-menu__icon">
                                        <Lucide icon={lastSubMenu.icon} />
                                      </div>
                                      <div className="top-menu__title">
                                        {lastSubMenu.title}
                                      </div>
                                    </a>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
          )}
        </ul>
      </nav>
      {/* END: Top Menu */}
      {/* BEGIN: Content */}
      <div className="rounded-[30px] min-w-0 min-h-screen flex-1 pb-10 bg-slate-100 dark:bg-darkmode-700 px-4 md:px-[22px] max-w-full md:max-w-auto before:content-[''] before:w-full before:h-px before:block">
        <Outlet />
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
    </div>
  );
}

export default Main;
