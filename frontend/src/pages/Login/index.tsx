import ThemeSwitcher from "@/components/ThemeSwitcher";
import logoUrl from "@/assets/images/serviformlogo.png";
import illustrationUrl from "@/assets/images/illustration.svg";
import Button from "@/components/Base/Button";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AlertContext } from "@/utils/Contexts/AlertContext";
import { LoadingContext } from "@/utils/Contexts/LoadingContext";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/stores/hooks";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getUserData, login } from "@/stores/authSlice";
import { setSideMenu } from "@/stores/menuSlice";
import InputField from "@/custom-components/FormElements/InputField";

function Main() {

  const { t } = useTranslation();

  const [, setAlert] = useContext(AlertContext);

  const [loading, setLoading] = useContext(LoadingContext);

  const navigate = useNavigate()

  const dispatch = useAppDispatch();

  const defaultValue = {
    codigo: "",
    password: "",
  }

  const loginSchema = yup.object().shape(
    {
      codigo: yup.string().required(t("errors.required") ?? ''),
      password: yup.string().required(t("errors.required") ?? ''),
    }
  )

  const {
    control,
    trigger,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
    defaultValues: defaultValue
  });

  const getAuthUser = async () => {
    setLoading(true)
    await dispatch(getUserData())
    await dispatch(setSideMenu())
    setLoading(false)
    navigate("/")
  }

  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await trigger();
    const data = getValues()

    if (!result) {
      setAlert({
        type: "error",
        show: true,
        text: t("Login failed!"),
        desc: t("Please check the form fields.")
      })
    } else {

      const toSend = {
        codigo: data.codigo,
        password: data.password
      }

      setLoading(true);
      await dispatch(login(toSend));
      setLoading(false);

      setAlert({
        type: "success",
        show: true,
        text: "loginSuccessfull",
        desc: "welcomeToBPM"
      })
      await getAuthUser()
    }
  };

  return (
    <>
      <div
        className={clsx([
          "p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
          "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
          "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
        ])}
      >
        <ThemeSwitcher />
        <div className="container relative z-10 sm:px-10">
          <div className="block grid-cols-2 gap-4 xl:grid">
            {/* BEGIN: Login Info */}
            <div className="flex-col hidden min-h-screen xl:flex">
              <a href="" className="flex items-center pt-5 -intro-x">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="w-[150px]"
                  src={logoUrl}
                />
                {/* <span className="ml-3 text-lg text-white"> BPM </span> */}
              </a>
              <div className="my-auto">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="w-1/2 -mt-16 -intro-x"
                  src={illustrationUrl}
                />
                <div className="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
                  {t("loginText1")}
                </div>
                <div className="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
                  {t("loginText2")}
                </div>
              </div>
            </div>

            <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
              <form
                className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4"
                onSubmit={onSubmit}
              >

                <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                  {t("login")}
                </h2>
                <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
                  {t("loginText2")}
                </div>
                <div className="mt-8 intro-x">
                  <InputField
                    control={control}
                    name="codigo"
                    label="code"
                    placeholder="Código ..."
                  />
                  <InputField
                    control={control}
                    name="password"
                    label="password"
                    placeholder="Contraseña ..."
                    type="password"
                  />
                </div>

                <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                  <Button
                    disabled={!isValid || loading}
                    type="submit"
                    variant="primary"
                    className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                  >
                    {t("login")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
