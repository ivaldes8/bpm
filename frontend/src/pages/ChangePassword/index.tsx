import Button from "@/components/Base/Button";
import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { AlertContext } from "@/utils/Contexts/AlertContext";
import { LoadingContext } from "@/utils/Contexts/LoadingContext";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { changePassword, reset as resetState } from "@/stores/authSlice";
import { useAppSelector } from "@/stores/hooks";
import InputField from "@/custom-components/FormElements/InputField";

function Main() {

  const { t } = useTranslation()

  const [, setAlert] = useContext(AlertContext);
  const [, setLoading] = useContext(LoadingContext);

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth);

  const defaultValue = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  }

  const updatePasswordSchema = yup.object().shape(
    {
      oldPassword: yup.string().required(t("errors.required") ?? ''),
      newPassword: yup.string().required(t("errors.required") ?? ''),
      confirmPassword: yup.string()
        .required(t("errors.required") ?? '')
        .oneOf([yup.ref('newPassword')], t("errors.passwordMatch") ?? ''),
    }
  )

  const {
    control,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(updatePasswordSchema),
    defaultValues: defaultValue
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    const toSend = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    }

    dispatch(changePassword(toSend))
  }

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
        text: "Password changed successfully!",
      })

      reset(defaultValue)
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
      <div className="intro-y box lg:mt-5 flex flex-col">
        <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 className="mr-auto text-base font-medium">{t("Change Password")}</h2>
        </div>

        <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-x-5">
            <InputField
              control={control}
              name="oldPassword"
              label="oldPassword"
              type="password"
              placeholder="Old password ..."
            />

            <InputField
              control={control}
              name="newPassword"
              label="newPassword"
              type="password"
              placeholder="New password ..."
            />

            <InputField
              control={control}
              name="confirmPassword"
              label="confirmPassword"
              type="password"
              placeholder="Confirm password ..."
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
    </>
  );
}

export default Main;
