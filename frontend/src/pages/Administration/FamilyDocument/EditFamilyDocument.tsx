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
import FamilyDocumentService from '@/services/FamilyDocumentService';

type Props = {
    show: boolean,
    selectedRow: any,
    setShow: (show: boolean) => void
    onSubmit: () => void
}

const EditFamilyDocument = ({ show, setShow, onSubmit, selectedRow }: Props) => {

    const { t } = useTranslation()

    const [, setAlert] = useContext(AlertContext);
    const [, setLoading] = useContext(LoadingContext);

    const defaultValue = {
        Nombre: "",
        Codigo: "",
        Activo: true
    }

    const updateProfileSchema = (selectedRow: any) => yup.object().shape(
        {
            Nombre: yup.string().required(t("errors.required") ?? ''),
            Codigo: yup.string().required(t("errors.required") ?? ''),
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
            Activo: formData.Activo
        }

        if (selectedRow) {
            if (selectedRow.Codigo === toSend.Codigo) {
                //@ts-ignore
                delete toSend.Codigo
            }
        }
        setLoading(true)
        const [error, response,] = await handlePromise(
            selectedRow?.FamiliaId ? FamilyDocumentService.updateFamilyDocument(selectedRow.FamiliaId, toSend) :
                FamilyDocumentService.createFamilyDocument(toSend)
        );
        setLoading(false)
        if (!response.ok) {
            return setAlert({
                type: "error",
                show: true,
                text: error ?? selectedRow?.FamiliaId ? "Update failed" : "Creation failed",
            })
        }

        setAlert({
            type: "success",
            show: true,
            text: selectedRow?.FamiliaId ? "Updated successfully" : "Created successfully",
        })

        onSubmit()
    }

    useEffect(() => {
        if (selectedRow) {
            const vals = {
                Nombre: selectedRow.Nombre,
                Codigo: selectedRow.Codigo,
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
            title={selectedRow ? t("editFamilyDocument") : t("createFamilyDocument")}
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

                <CheckBoxField
                    control={control}
                    name="Activo"
                    label="active"
                />
            </div>
        </ParentModal>
    )
}

export default EditFamilyDocument