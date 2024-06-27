import { useContext, useEffect } from 'react'
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

    const [, setAlert] = useContext(AlertContext);
    const [, setLoading] = useContext(LoadingContext);

    const defaultValue = {
        Nombre: "",
        Codigo: "",
        Rol: "BASE",
        Password: "",
        Activo: false
    }

    const updateProfileSchema = (selectedRow: any) => yup.object().shape(
        {
            Nombre: yup.string().required(t("errors.required") ?? ''),
            Codigo: yup.string().required(t("errors.required") ?? ''),
            Rol: yup.string().required(t("errors.required") ?? ''),
            Password: selectedRow?.UsuarioId ? yup.string() : yup.string().required(t("errors.required") ?? ''),
            Activo: yup.boolean()
        }
    )

    const {
        control,
        reset,
        formState: { isValid },
        getValues
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(updateProfileSchema(selectedRow)),
        defaultValues: defaultValue
    });


    const handleSubmit = async () => {
        const formData = getValues()
        const toSend = {
            Nombre: formData.Nombre,
            Codigo: formData.Codigo,
            Rol: formData.Rol,
            Activo: formData.Activo
        }


        if (selectedRow?.Codigo === toSend.Codigo) {
            //@ts-ignore
            delete toSend.Codigo
        }

        setLoading(true)
        const [error, response,] = await handlePromise(
            selectedRow?.UsuarioId ? UserService.updateUser(selectedRow.UsuarioId, toSend) :
                UserService.createUser({ ...toSend, Password: formData.Password })
        );
        setLoading(false)
        if (!response.ok) {
            return setAlert({
                type: "error",
                show: true,
                text: error ?? selectedRow?.UsuarioId ? "Update failed" : "Creation failed",
            })
        }

        setAlert({
            type: "success",
            show: true,
            text: selectedRow?.UsuarioId ? "Updated successfully" : "Created successfully",
        })

        onSubmit()
    }

    useEffect(() => {
        if (selectedRow) {
            const vals = {
                Nombre: selectedRow.Nombre,
                email: selectedRow.email,
                Codigo: selectedRow.Codigo,
                Rol: selectedRow.roleName,
                Activo: selectedRow.Activo
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
                    name="Nombre"
                    label="name"
                    placeholder="Nombre ..."
                />

                <InputField
                    control={control}
                    name="Codigo"
                    label="code"
                    placeholder="Código ..."
                />

                <Select
                    control={control}
                    name="Rol"
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
                            name="Password"
                            label="password"
                            placeholder="Password ..."
                        />
                    )
                }

                <CheckBoxField
                    control={control}
                    name="Activo"
                    label="active"
                />
            </div>
        </ParentModal>
    )
}

export default EditUser