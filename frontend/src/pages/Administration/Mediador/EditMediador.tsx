import { useContext, useEffect } from 'react';
import ParentModal from '@/custom-components/Modals/ParentModal';
import { AlertContext } from '@/utils/Contexts/AlertContext';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from 'react-i18next'
import { useForm } from "react-hook-form";
import InputField from '@/custom-components/FormElements/InputField';
import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';
import handlePromise from "@/utils/promise";
import MediatorService from '@/services/MediatorService';
import TextAreaField from '@/custom-components/FormElements/TextArea';

type Props = {
    show: boolean,
    selectedRow: any,
    setShow: (show: boolean) => void
    onSubmit: () => void
}

const EditMediador = ({ show, setShow, onSubmit, selectedRow }: Props) => {

    const { t } = useTranslation()

    const [, setAlert] = useContext(AlertContext);
    const [, setLoading] = useContext(LoadingContext);

    const defaultValue = {
        Nombre: "",
        Codigo: "",
        Canal: "",
        Zona: "",
        Observaciones: "",
        Email: "",
        Responsable: "",
        EmailResponsable: "",
        Responsable2: "",
        EmailResponsable2: "",
        Reclamar: false,
        Activo: true
    }

    const updateProfileSchema = (selectedRow: any) => yup.object().shape(
        {
            Nombre: yup.string().required(t("errors.required") ?? ''),
            Codigo: yup.string().required(t("errors.required") ?? ''),
            Canal: yup.string().required(t("errors.required") ?? ''),
            Zona: yup.string().required(t("errors.required") ?? ''),
            Observaciones: yup.string().required(t("errors.required") ?? ''),
            Email: yup.string().email(t("errors.email") ?? '').required(t("errors.required") ?? ''),
            Responsable: yup.string().required(t("errors.required") ?? ''),
            EmailResponsable: yup.string().email(t("errors.email") ?? '').required(t("errors.required") ?? ''),
            Responsable2: yup.string().required(t("errors.required") ?? ''),
            EmailResponsable2: yup.string().email(t("errors.email") ?? '').required(t("errors.required") ?? ''),
            Reclamar: yup.boolean(),
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
            Canal: formData.Canal,
            Zona: formData.Zona,
            Observaciones: formData.Observaciones,
            Email: formData.Email,
            Responsable: formData.Responsable,
            EmailResponsable: formData.EmailResponsable,
            Responsable2: formData.Responsable2,
            EmailResponsable2: formData.EmailResponsable2,
            Reclamar: formData.Reclamar,
            Activo: formData.Activo
        }

        if (selectedRow) {
            if (selectedRow.Codigo === toSend.Codigo) {
                //@ts-ignore
                delete toSend.Codigo
            }

            if (selectedRow.Obsevaciones === toSend.Observaciones) {
                //@ts-ignore
                delete toSend.Observaciones
            }
        }
        setLoading(true)
        const [error, response,] = await handlePromise(
            selectedRow?.MediadorId ? MediatorService.updateMediator(selectedRow.MediadorId, toSend) :
                MediatorService.createMediator(toSend)
        );
        setLoading(false)
        if (!response.ok) {
            return setAlert({
                type: "error",
                show: true,
                text: error ?? selectedRow?.MediadorId ? "Update failed" : "Creation failed",
            })
        }

        setAlert({
            type: "success",
            show: true,
            text: selectedRow?.MediadorId ? "Updated successfully" : "Created successfully",
        })

        onSubmit()
    }

    useEffect(() => {
        if (selectedRow) {
            const vals = {
                Nombre: selectedRow.Nombre,
                Codigo: selectedRow.Codigo,
                Canal: selectedRow.Canal,
                Zona: selectedRow.Zona,
                Observaciones: selectedRow.Observaciones,
                Email: selectedRow.Email,
                Responsable: selectedRow.Responsable,
                EmailResponsable: selectedRow.EmailResponsable,
                Responsable2: selectedRow.Responsable2,
                EmailResponsable2: selectedRow.EmailResponsable2,
                Reclamar: selectedRow.Reclamar,
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
            title={selectedRow ? t("editCommercial") : t("createCommercial")}
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

                <InputField
                    control={control}
                    name="Canal"
                    label="channel"
                    placeholder="Canal ..."
                />

                <InputField
                    control={control}
                    name="Zona"
                    label="zone"
                    placeholder="Zona ..."
                />

                <TextAreaField
                    control={control}
                    name="Observaciones"
                    label="observations"
                    placeholder="Observaciones ..."></TextAreaField>

                <InputField
                    control={control}
                    name="Email"
                    label="email"
                    placeholder="Correo..."
                />

                <InputField
                    control={control}
                    name="Responsable"
                    label="responsible"
                    placeholder="Responsable ..." />


                <InputField
                    control={control}
                    name="EmailResponsable"
                    label="responsibleEmail"
                    placeholder="Correo del responsable ..."
                />

                <InputField
                    control={control}
                    name="Responsable2"
                    label="responsible2"
                    placeholder="Responsable 2 ..."
                />

                <InputField
                    control={control}
                    name="EmailResponsable2"
                    label="responsibleEmail2"
                    placeholder="Correo del responsable 2..."
                />

                <CheckBoxField
                    control={control}
                    name="Reclamar"
                    label="claim"
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

export default EditMediador