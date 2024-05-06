import Button from '@/components/Base/Button'
import InputField from '@/custom-components/FormElements/InputField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import ObservationHistory from './ObservationHistory'

type Props = {
    selectedContract: any,
    setSelectedContract: (contract: any) => void
}

const ContractForm = ({ selectedContract, setSelectedContract }: Props) => {

    const { t } = useTranslation()
    const navigate = useNavigate();

    const defaultValues = {
        FechaAltaSolicitud: '',
        RamoId: 0,
        RamoCodigo: '',
        Baja: false,
        ProfesionAsegurado: '',
        DeporteAsegurado: '',
        EdadAsegurado: 0,
        NoDigitalizar: false,
    }

    const schema = () => yup.object().shape(
        {
            FechaAltaSolicitud: yup.string().required(t("errors.required") ?? ''),
            RamoId: yup.number().required(t("errors.required") ?? ''),
            RamoCodigo: yup.string().required(t("errors.required") ?? ''),
            Baja: yup.boolean(),
            ProfesionAsegurado: yup.string().required(t("errors.required") ?? ''),
            DeporteAsegurado: yup.string().required(t("errors.required") ?? ''),
            EdadAsegurado: yup.number().required(t("errors.required") ?? ''),
            NoDigitalizar: yup.boolean()
        }
    )

    const {
        control,
        reset,
        formState: { errors, isValid },
        getValues,
        handleSubmit
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema()),
        defaultValues: defaultValues
    });

    const onSubmit = async (data: any) => {
        console.log(data, "Form data")
    }

    useEffect(() => {
        if (selectedContract) {
            reset({
                FechaAltaSolicitud: moment(selectedContract?.FechaAltaSolicitud).format('YYYY-MM-DD'),
                RamoId: selectedContract?.RamoId,
                RamoCodigo: selectedContract?.Ramo.Codigo,
                Baja: false,
                ProfesionAsegurado: selectedContract?.ProfesionAsegurado,
                DeporteAsegurado: selectedContract?.DeporteAsegurado,
                EdadAsegurado: selectedContract?.EdadAsegurado,
                NoDigitalizar: false,
            })
        }
    }, [selectedContract])


    return (
        <form className="flex flex-col mt-4 box" onSubmit={handleSubmit(onSubmit)}>
            <div className="box p-4 m-4 mb-2">
                <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
                    <div className="w-full sm:w-1/2">
                        <InputField
                            control={control}
                            name="FechaAltaSolicitud"
                            type='date'
                            label="RegistrationDateRequest"
                            disabled
                        />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <InputField
                            control={control}
                            name="RamoCodigo"
                            type='text'
                            label="Branch"
                            disabled
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
                    <div className="w-full sm:w-1/2">
                        <InputField
                            control={control}
                            name="ProfesionAsegurado"
                            type='text'
                            label="InsuranceProfession"
                            disabled
                        />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <InputField
                            control={control}
                            name="DeporteAsegurado"
                            type='text'
                            label="InsuranceSport"
                            disabled
                        />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <InputField
                            control={control}
                            name="EdadAsegurado"
                            type='number'
                            label="InsuranceAge"
                            disabled
                        />
                    </div>
                </div>
            </div>

            <ObservationHistory selectedContract={selectedContract}/>

            <div className="flex flex-col sm:flex-row justify-center items-center my-2 gap-3">
                <Button variant="secondary" onClick={() => navigate('/')}>
                    {t("goBack")}
                </Button>
                <Button variant="danger" onClick={() => setSelectedContract(null)}>
                    {t("clearForm")}
                </Button>
                <Button variant="primary" disabled={!isValid} type='submit'>
                    {t("save")}
                </Button>
            </div>

        </form>
    )
}

export default ContractForm