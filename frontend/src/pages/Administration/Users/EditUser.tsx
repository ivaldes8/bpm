import React, { useContext, useEffect } from 'react'
import ParentModal from '@/custom-components/Modals/ParentModal'
import { AlertContext } from '@/utils/Contexts/AlertContext'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from 'react-i18next'
import { useForm } from "react-hook-form";
import InputField from '@/custom-components/FormElements/InputField';
import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import userRoles from '@/utils/constants/userRoles';
import Select from '@/custom-components/FormElements/Select';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';
import handlePromise from "@/utils/promise";
import UserService from '@/services/UserService';

type Props = {
    show: boolean,
    selectedRow: any,
    setShow: (show: boolean) => void
    onSubmit: () => void
}

const EditUser = ({ show, setShow, onSubmit, selectedRow }: Props) => {

    const { t } = useTranslation()

    const [alert, setAlert] = useContext(AlertContext);
    const [loading, setLoading] = useContext(LoadingContext);

    const defaultValue = {
        email: "",
        name: "",
        code: "",
        role: "USER",
        password: "",
        active: false
    }

    const updateProfileSchema = (selectedRow: any) => yup.object().shape(
        {
            email: yup.string().email(t("errors.email") ?? '').required(t("errors.required") ?? ''),
            name: yup.string().required(t("errors.required") ?? ''),
            code: yup.string().required(t("errors.required") ?? ''),
            role: yup.string().required(t("errors.required") ?? ''),
            password: selectedRow && selectedRow.id ? yup.string() : yup.string().required(t("errors.required") ?? ''),
            active: yup.boolean()
        }
    )

    const {
        control,
        reset,
        formState: { errors, isValid },
        getValues
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(updateProfileSchema(selectedRow)),
        defaultValues: defaultValue
    });


    const handleSubmit = async () => {
        const formData = getValues()
        const toSend = {
            name: formData.name,
            email: formData.email,
            code: formData.code,
            role: formData.role,
            active: formData.active
        }
        setLoading(true)
        const [error, response, data] = await handlePromise(
            selectedRow && selectedRow.id ? UserService.updateUser(selectedRow.id, toSend) :
                UserService.createUser({...toSend, password: formData.password})
        );
        setLoading(false)
        if (!response.ok) {
            return setAlert({
                type: "error",
                show: true,
                text: selectedRow && selectedRow.id ? "Update failed" : "Creation failed",
            })
        }

        setAlert({
            type: "success",
            show: true,
            text: selectedRow && selectedRow.id ? "Updated successfully" : "Created successfully",
        })

        onSubmit()
    }

    useEffect(() => {
        if (selectedRow) {
            const vals = {
                name: selectedRow.name,
                email: selectedRow.email,
                code: selectedRow.code,
                role: selectedRow.roleName,
                active: selectedRow.active
            }

            reset(vals)
        } else {
            reset(defaultValue)
        }
    }, [selectedRow])

    return (
        <ParentModal
            size='md'
            title={selectedRow ? t("editUser") : t("createUser")}
            show={show}
            setShow={setShow}
            handleOnSubmit={handleSubmit}
            submitButtonText={selectedRow ? t("edit") : t("save")}
            disableSubmitButton={!isValid}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 auto-cols-max w-full justify-center">
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

                <Select
                    control={control}
                    name="role"
                    label="role"
                    placeholder="Roles ..."
                    valueKey="id"
                    labelKey="name"

                    options={userRoles() as any[]}
                />

                {
                    !selectedRow && (
                        <InputField
                            control={control}
                            name="password"
                            label="password"
                            placeholder="Password ..."
                        />
                    )
                }

                <CheckBoxField
                    control={control}
                    name="active"
                    label="active"
                />
            </div>
        </ParentModal>
    )
}

export default EditUser