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
import TypeConciliationService from '@/services/TypeConciliationService';

type Props = {
    show: boolean,
    selectedRow: any,
    setShow: (show: boolean) => void
    onSubmit: () => void
}

const EditTypeConciliation = ({ show, setShow, onSubmit, selectedRow }: Props) => {

    const { t } = useTranslation()

    const [, setAlert] = useContext(AlertContext);
    const [, setLoading] = useContext(LoadingContext);

    const defaultValue = {
        Nombre: "",
        Activo: true
    }

    const updateProfileSchema = (selectedRow: any) => yup.object().shape(
        {
            Nombre: yup.string().required(t("errors.required") ?? ''),
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
            Activo: formData.Activo
        }
        setLoading(true)
        const [error, response, data] = await handlePromise(
            selectedRow?.tipoConciliacionId ? TypeConciliationService.updateTypeConciliation(selectedRow.FamiliaId, toSend) :
                TypeConciliationService.createTypeConciliation(toSend)
        );
        setLoading(false)
        if (!response.ok) {
            return setAlert({
                type: "error",
                show: true,
                text: error ?? selectedRow?.tipoConciliacionId ? "Update failed" : "Creation failed",
            })
        }

        setAlert({
            type: "success",
            show: true,
            text: selectedRow?.tipoConciliacionId ? "Updated successfully" : "Created successfully",
        })

        onSubmit()
    }

    useEffect(() => {
        if (selectedRow) {
            const vals = {
                Nombre: selectedRow.Nombre,
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
            title={selectedRow ? t("editTypeConciliation") : t("createTypeConciliation")}
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

                <CheckBoxField
                    control={control}
                    name="Activo"
                    label="active"
                />
            </div>
        </ParentModal>
    )
}

export default EditTypeConciliation