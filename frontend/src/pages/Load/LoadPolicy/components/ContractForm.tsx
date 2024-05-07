import Button from '@/components/Base/Button'
import InputField from '@/custom-components/FormElements/InputField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import ObservationHistory from './ObservationHistory'
import TextAreaField from '@/custom-components/FormElements/TextArea'
import Lucide from '@/components/Base/Lucide'
import { AlertContext } from '@/utils/Contexts/AlertContext'
import { LoadingContext } from '@/utils/Contexts/LoadingContext'
import handlePromise from "@/utils/promise";
import ObservationContractService from '@/services/ObservationContractService'

type Props = {
    selectedContract: any,
    setSelectedContract: (contract: any) => void
}

const ContractForm = ({ selectedContract, setSelectedContract }: Props) => {

    const { t } = useTranslation()
    const navigate = useNavigate();

    const [alert, setAlert] = useContext(AlertContext);
    const [loading, setLoading] = useContext(LoadingContext);

    const defaultValues = {
        FechaAltaSolicitud: '',
        RamoId: 0,
        RamoCodigo: '',
        Baja: false,
        ProfesionAsegurado: '',
        DeporteAsegurado: '',
        EdadAsegurado: 0,
        NoDigitalizar: false,
        observations: []
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
            NoDigitalizar: yup.boolean(),
            observations: yup.array().of(yup.object().shape({ observation: yup.string().required(t("errors.required") ?? '') }))
        }
    )

    const {
        control,
        reset,
        formState: { isValid },
        handleSubmit
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema()),
        defaultValues: defaultValues
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "observations"
    });

    const onSubmit = async (data: any) => {
        const observations = data.observations
        setLoading(true)

        await Promise.all(observations.map(async (observation: any) => {
            const toSend = {
                ContratoId: selectedContract.ContratoId,
                Contenido: observation.observation
            }

            const [error, response, data] = await handlePromise(ObservationContractService.createObservationContract(toSend));
            if (!response.ok) {
                setLoading(false)
                return setAlert({
                    type: "error",
                    show: true,
                    text: error ? error : "Error while adding observation",
                })
            }
        }))
        setLoading(false)

        setAlert({
            type: "success",
            show: true,
            text: t("Observations added successfully"),
        })

        setSelectedContract(null)
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
                observations: []
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

            <div className="box p-4 m-4 mb-2">
                <div className="flex flex-col gap-3">
                    {fields.map((item, index) => (
                        <div key={item.id} className='flex gap-2'>
                            <div className="w-full">
                                <TextAreaField
                                    control={control}
                                    name={`observations.${index}.observation`}
                                    label="observation"
                                />
                            </div>
                            <Lucide icon="XCircle" className="w-6 h-6 text-red-500 cursor-pointer" onClick={() => remove(index)} />
                        </div>
                    ))}

                    <Button variant="soft-primary" size='sm' type="button" onClick={() => append({ observation: "" })}>
                        <Lucide icon="PlusCircle" className="w-6 h-6 text-primary mr-1" />
                        {t("addObservation")}
                    </Button>
                </div>
            </div>

            <ObservationHistory selectedContract={selectedContract} />

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