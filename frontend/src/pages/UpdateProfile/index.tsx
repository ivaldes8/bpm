import _ from "lodash";
import { useContext, useEffect } from "react";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
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

  const [alert, setAlert] = useContext(AlertContext);
  const [loading, setLoading] = useContext(LoadingContext);

  const defaultValue = {
    email: "",
    name: "",
    code: "",
    role: ""
  }

  const updateProfileSchema = yup.object().shape(
    {
      email: yup.string().email(t("errors.email") ?? '').required(t("errors.required") ?? ''),
      name: yup.string().required(t("errors.required") ?? ''),
      code: yup.string().required(t("errors.required") ?? ''),
      role: yup.string()
    }
  )

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(updateProfileSchema),
    defaultValues: defaultValue
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    const toSend = {
      name: data.name,
      email: data.email,
      code: data.code
    }

    dispatch(updateProfile(toSend))
  }

  useEffect(() => {
    if (userData) {
      const vals = {
        email: userData.email,
        name: userData.name,
        code: userData.code,
        role: userData.role.name
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
    console.log(isLoading)
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
              name="email"
              label="email"
              placeholder="Email ..."
            />

            <InputField
              control={control}
              name="name"
              label="name"
              placeholder="Name ..."
            />

            <InputField
              control={control}
              name="code"
              label="code"
              placeholder="Code ..."
            />

            <InputField
              disabled
              control={control}
              name="role"
              label="role"
              placeholder="Role ..."
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
