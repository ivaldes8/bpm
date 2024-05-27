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
import DocumentList from './DocumentList'
import DocumentContractService from '@/services/DocumentContractService'
import DocumentIncidenceService from '@/services/DocumentIncidenceService'

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
        CCC: '',
        CodigoSolicitud: '',
        CodigoPoliza: '',
        FechaAltaSolicitud: '',
        RamoId: 0,
        RamoCodigo: '',
        Baja: false,
        DNITomador: '',
        NombreTomador: '',
        DNIAsegurado: '',
        NombreAsegurado: '',
        ProfesionAsegurado: '',
        DeporteAsegurado: '',
        FechaNacimientoAsegurado: '',
        NoDigitalizar: false,
        observations: [],
        documents: []
    }

    const schema = () => yup.object().shape(
        {
            CCC: yup.string(),
            CodigoSolicitud: yup.string(),
            CodigoPoliza: yup.string(),
            FechaAltaSolicitud: yup.string().required(t("errors.required") ?? ''),
            RamoId: yup.number().required(t("errors.required") ?? ''),
            RamoCodigo: yup.string().required(t("errors.required") ?? ''),
            Baja: yup.boolean(),
            DNITomador: yup.string(),
            NombreTomador: yup.string(),
            DNIAsegurado: yup.string(),
            NombreAsegurado: yup.string(),
            ProfesionAsegurado: yup.string().required(t("errors.required") ?? ''),
            DeporteAsegurado: yup.string().required(t("errors.required") ?? ''),
            FechaNacimientoAsegurado: yup.string(),
            NoDigitalizar: yup.boolean(),
            observations: yup.array().of(yup.object().shape({ observation: yup.string().required(t("errors.required") ?? '') })),
            documents: yup.array()
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

        const docList = data.documents
        const observations = data.observations
        setLoading(true)

        //Create observations
        for (const observation of observations) {
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
        }

        for (const doc of docList) {
            const toSend = {
                ContratoId: selectedContract.ContratoId,
                DocId: doc.docTypeId,
                Estado: 'PRESENT',
            }

            //Mark incidences as resolved
            for (const incidence of doc.incidences) {
                const toSend = {
                    ContratoId: selectedContract.ContratoId,
                    DocumentoId: doc.id,
                    Resuelta: true,
                    TipoIncidenciaId: incidence.id,
                }

                const currentDoc = selectedContract.DocumentoContrato.find((doc: any) => doc.DocumentoId === toSend.DocumentoId)
                const existingIncidence = currentDoc?.IncidenciaDocumento.find((incidence: any) => incidence.TipoIncidenciaId === toSend.TipoIncidenciaId)

                if (existingIncidence) {
                    const [error, response, data] = await handlePromise(
                        DocumentIncidenceService.updateDocumentIncidence(existingIncidence.IncidenciaId, toSend)
                    );
                    if (!response.ok) {
                        setLoading(false)
                        return setAlert({
                            type: "error",
                            show: true,
                            text: error ? error : "Error while adding incidence document",
                        })
                    }
                }
            }

            //Update document contracts
            const [error, response, data] = await handlePromise(DocumentContractService.updateDocumentContract(doc.id, toSend));
            if (!response.ok) {
                setLoading(false)
                return setAlert({
                    type: "error",
                    show: true,
                    text: error ? error : "Error while updating document contract",
                })
            }
        }

        setLoading(false)

        setAlert({
            type: "success",
            show: true,
            text: t("Observations added successfully"),
        })

        setSelectedContract(null)
    }

    useEffect(() => {

        const resetFormFiels = async () => {
            const docList = []
            const contractDocuments = selectedContract?.DocumentoContrato;
            const RamoTipoOperacionArray = selectedContract?.Ramo.RamoTipoOperacion;

            for (let i = 0; i < contractDocuments.length; i++) {
                await docList.push({
                    id: contractDocuments[i].DocumentoId,
                    docTypeId: contractDocuments[i].TipoDocId,
                    present: true,
                    name: contractDocuments[i].MaestroDocumentos.Nombre,
                    incidences: contractDocuments[i].MaestroDocumentos.FamiliaDocumento.MaestroIncidencias.map((incidence: any) => {
                        return {
                            id: incidence.TipoIncidenciaId,
                            name: incidence.Nombre,
                            checked: contractDocuments[i].IncidenciaDocumento.find((inci: any) => inci.TipoIncidenciaId === incidence.TipoIncidenciaId)?.Resuelta === false ? true : false
                        }
                    })
                })
            }

            reset({
                CCC: selectedContract?.CCC,
                CodigoSolicitud: selectedContract?.CodigoSolicitud,
                CodigoPoliza: selectedContract?.CodigoPoliza,
                FechaAltaSolicitud: moment(selectedContract?.FechaAltaSolicitud).format('YYYY-MM-DD'),
                RamoId: selectedContract?.RamoId,
                RamoCodigo: selectedContract?.Ramo.Codigo,
                Baja: false,
                DNITomador: selectedContract?.DNITomador,
                NombreTomador: selectedContract?.NombreTomador,
                DNIAsegurado: selectedContract?.DNIAsegurado,
                NombreAsegurado: selectedContract?.NombreAsegurado,
                ProfesionAsegurado: selectedContract?.ProfesionAsegurado,
                DeporteAsegurado: selectedContract?.DeporteAsegurado,
                FechaNacimientoAsegurado: selectedContract?.FechaNacimientoAsegurado ? moment(selectedContract?.FechaNacimientoAsegurado).format('YYYY-MM-DD') : '',
                NoDigitalizar: false,
                observations: [],
                documents: docList
            })
        }
        if (selectedContract) {
            resetFormFiels()
        }
    }, [selectedContract])


    return (
        <form className="flex flex-col mt-4 box" onSubmit={handleSubmit(onSubmit)}>
            <div className="box p-4 m-4 mb-2">
                <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
                    <div className="w-full sm:w-1/2">
                        <InputField
                            control={control}
                            name="CCC"
                            type='text'
                            label="CCC"
                            disabled
                        />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <InputField
                            control={control}
                            name="CodigoSolicitud"
                            type='text'
                            label="RequestCode"
                            disabled
                        />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <InputField
                            control={control}
                            name="CodigoPoliza"
                            type='text'
                            label="PolicyCode"
                            disabled
                        />
                    </div>
                </div>

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
                            name="DNITomador"
                            type='text'
                            label="AgentDNI"
                            disabled
                        />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <InputField
                            control={control}
                            name="NombreTomador"
                            type='text'
                            label="AgentName"
                            disabled
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
                    <div className="w-full sm:w-1/2">
                        <InputField
                            control={control}
                            name="DNIAsegurado"
                            type='text'
                            label="InsuranceDNI"
                            disabled
                        />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <InputField
                            control={control}
                            name="NombreAsegurado"
                            type='text'
                            label="InsuranceName"
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
                            name="FechaNacimientoAsegurado"
                            type='date'
                            label="InsuranceBirthDate"
                            disabled
                        />
                    </div>
                </div>
            </div>

            <DocumentList control={control} />

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