import { useContext, useEffect } from 'react'
import ParentModal from '@/custom-components/Modals/ParentModal'
import { AlertContext } from '@/utils/Contexts/AlertContext'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from 'react-i18next'
import { useForm } from "react-hook-form";
import InputField from '@/custom-components/FormElements/InputField';
import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';
import handlePromise from "@/utils/promise";
import CompanyService from '@/services/CompanyService';
import TextAreaField from '@/custom-components/FormElements/TextArea';

type Props = {
    show: boolean,
    selectedRow: any,
    setShow: (show: boolean) => void
    onSubmit: () => void
}

const EditCompany = ({ show, setShow, onSubmit, selectedRow }: Props) => {

    const { t } = useTranslation()

    const [, setAlert] = useContext(AlertContext);
    const [, setLoading] = useContext(LoadingContext);

    const defaultValue = {
        Nombre: "",
        Codigo: "",
        Descripcion: "",
        Telefono: "",
        CorreoComp: "",
        ReclamarComp: false,
        CorreoSoporte: "",
        ReclamarSoporte: false,
        Activo: true
    }

    const updateProfileSchema = (selectedRow: any) => yup.object().shape(
        {
            Nombre: yup.string().required(t("errors.required") ?? ''),
            Codigo: yup.string().required(t("errors.required") ?? ''),
            Descripcion: yup.string().required(t("errors.required") ?? ''),
            Telefono: yup.string().required(t("errors.required") ?? ''),
            CorreoComp: yup.string().email(t("errors.email") ?? '').required(t("errors.required") ?? ''),
            ReclamarComp: yup.boolean(),
            CorreoSoporte: yup.string().email(t("errors.email") ?? '').required(t("errors.required") ?? ''),
            ReclamarSoporte: yup.boolean(),
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
            Descripcion: formData.Descripcion,
            Telefono: formData.Telefono,
            CorreoComp: formData.CorreoComp,
            ReclamarComp: formData.ReclamarComp,
            CorreoSoporte: formData.CorreoSoporte,
            ReclamarSoporte: formData.ReclamarSoporte,
            Activo: formData.Activo
        }

        if (selectedRow) {
            if (selectedRow.Codigo === toSend.Codigo) {
                //@ts-ignore
                delete toSend.Codigo
            }

            if (selectedRow.Descripcion === toSend.Descripcion) {
                //@ts-ignore
                delete toSend.Descripcion
            }
        }
        setLoading(true)
        const [error, response,] = await handlePromise(
            selectedRow?.CompaniaId ? CompanyService.updateCompany(selectedRow.CompaniaId, toSend) :
                CompanyService.createCompany(toSend)
        );
        setLoading(false)
        if (!response.ok) {
            return setAlert({
                type: "error",
                show: true,
                text: error ?? selectedRow?.CompaniaId ? "Update failed" : "Creation failed",
            })
        }

        setAlert({
            type: "success",
            show: true,
            text: selectedRow?.CompaniaId ? "Updated successfully" : "Created successfully",
        })

        onSubmit()
    }

    useEffect(() => {
        if (selectedRow) {
            const vals = {
                Nombre: selectedRow.Nombre,
                Codigo: selectedRow.Codigo,
                Descripcion: selectedRow.Descripcion,
                Telefono: selectedRow.Telefono,
                CorreoComp: selectedRow.CorreoComp,
                ReclamarComp: selectedRow.ReclamarComp,
                CorreoSoporte: selectedRow.CorreoSoporte,
                ReclamarSoporte: selectedRow.ReclamarSoporte,
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
            title={selectedRow ? t("editCompany") : t("createCompany")}
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

                <TextAreaField
                    control={control}
                    name="Descripcion"
                    label="description"
                    placeholder="Descripción ..."
                />

                <InputField
                    control={control}
                    name="Telefono"
                    label="phone"
                    placeholder="Teléfono ..."
                />

                <InputField
                    control={control}
                    name="CorreoComp"
                    label="companyEmail"
                    placeholder="Correo Comañía ..."
                />

                <InputField
                    control={control}
                    name="CorreoSoporte"
                    label="supportEmail"
                    placeholder="Correo Soporte ..." />

                <CheckBoxField
                    control={control}
                    name="ReclamarComp"
                    label="claimCompany"
                />

                <CheckBoxField
                    control={control}
                    name="ReclamarSoporte"
                    label="claimSupport"
                />

                <CheckBoxField
                    control={control}
                    name="Activo"
                    label="active"
                />
            </div>
        </ParentModal>
    )
}

export default EditCompany