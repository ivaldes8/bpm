import { useContext, useEffect } from "react";
import Button from "@/components/Base/Button";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "@/custom-components/FormElements/InputField";
import { useAppSelector } from "@/stores/hooks";
import { useDispatch } from "react-redux";
import { updateProfile, reset as resetState } from "@/stores/authSlice";
import { AlertContext } from "@/utils/Contexts/AlertContext";
import { LoadingContext } from "@/utils/Contexts/LoadingContext";

function Main() {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userData, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth);

  const [, setAlert] = useContext(AlertContext);
  const [, setLoading] = useContext(LoadingContext);

  const defaultValue = {
    Nombre: "",
    Codigo: ""
  }

  const updateProfileSchema = yup.object().shape(
    {
      Nombre: yup.string().required(t("errors.required") ?? ''),
      Codigo: yup.string().required(t("errors.required") ?? '')
    }
  )

  const {
    control,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(updateProfileSchema),
    defaultValues: defaultValue
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    const toSend = {
      Nombre: data.Nombre,
      Codigo: data.Codigo
    }

    if (userData.Codigo === toSend.Codigo) {
      delete toSend.Codigo
    }

    dispatch(updateProfile(toSend))
  }

  useEffect(() => {
    if (userData) {
      const vals = {
        Nombre: userData.Nombre,
        Codigo: userData.Codigo
      }

      reset(vals)
    }
  }, [])

  useEffect(() => {
    if (isError) {
      setAlert({
        type: "error",
        show: true,
        text: "Action failed!",
        desc: message
      })
    }
  }, [isError])

  useEffect(() => {
    if (isSuccess) {
      setAlert({
        type: "success",
        show: true,
        text: "Profile updated successfully!",
      })
    }
  }, [isSuccess])

  useEffect(() => {
    if (isLoading) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [isLoading])

  useEffect(() => {
    dispatch(resetState())
  }, [isError, isSuccess])

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">{t("updateProfile")}</h2>
      </div>
      {/* BEGIN: Personal Information */}
      <div className="mt-5 intro-y box">
        <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 className="mr-auto text-base font-medium">
            {t("personalInfo")}
          </h2>
        </div>
        <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-x-5">
            <InputField
              control={control}
              name="Nombre"
              label="name"
              placeholder="Name ..."
            />

            <InputField
              control={control}
              name="Codigo"
              label="code"
              placeholder="Code ..."
            />
          </div>
          <div className="flex justify-end items-end mt-4">
            <Button
              disabled={!isValid || isLoading}
              variant="primary"
              type="submit"
              className="w-20"
            >
              {t("save")}
            </Button>
          </div>
        </form>
      </div>
      {/* END: Personal Information */}
    </>
  );
}

export default Main;
