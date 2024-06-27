import Button from '@/components/Base/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import TextAreaField from '@/custom-components/FormElements/TextArea'
import Lucide from '@/components/Base/Lucide'
import { AlertContext } from '@/utils/Contexts/AlertContext'
import { LoadingContext } from '@/utils/Contexts/LoadingContext'
import handlePromise from "@/utils/promise";
import ObservationContractService from '@/services/ObservationContractService'
import DocumentList from './DocumentList'
import DocumentContractService from '@/services/DocumentContractService'
import DocumentIncidenceService from '@/services/DocumentIncidenceService'
import ObservationHistory from '../../common-components/ObservationHistory'
import { defaultValues, schema } from '../../common-components/schemas'
import ContractFormInputs from '../../common-components/ContractFormInputs'

type Props = {
    selectedContract: any,
    setSelectedContract: (contract: any) => void
}

const ContractForm = ({ selectedContract, setSelectedContract }: Props) => {

    const { t } = useTranslation()
    const navigate = useNavigate();

    const [, setAlert] = useContext(AlertContext);
    const [, setLoading] = useContext(LoadingContext);

    const {
        control,
        reset,
        formState: { isValid },
        handleSubmit
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema(t)),
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

            const [error, response,] = await handlePromise(ObservationContractService.createObservationContract(toSend));
            if (!response.ok) {
                setLoading(false)
                return setAlert({
                    type: "error",
                    show: true,
                    text: error ?? "Error while adding observation",
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
                    const [error, response,] = await handlePromise(
                        DocumentIncidenceService.updateDocumentIncidence(existingIncidence.IncidenciaId, toSend)
                    );
                    if (!response.ok) {
                        setLoading(false)
                        return setAlert({
                            type: "error",
                            show: true,
                            text: error ?? "Error while adding incidence document",
                        })
                    }
                }
            }

            //Update document contracts
            const [error, response,] = await handlePromise(DocumentContractService.updateDocumentContract(doc.id, toSend));
            if (!response.ok) {
                setLoading(false)
                return setAlert({
                    type: "error",
                    show: true,
                    text: error ?? "Error while updating document contract",
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

            for (const contractDocument of contractDocuments) {
                docList.push({
                    id: contractDocument.DocumentoId,
                    docTypeId: contractDocument.TipoDocId,
                    present: true,
                    name: contractDocument.MaestroDocumentos.Nombre,
                    incidences: contractDocument.MaestroDocumentos.FamiliaDocumento.MaestroIncidencias.map((incidence: any) => {
                        return {
                            id: incidence.TipoIncidenciaId,
                            name: incidence.Nombre,
                            checked: contractDocument.IncidenciaDocumento.find((inci: any) => inci.TipoIncidenciaId === incidence.TipoIncidenciaId)?.Resuelta === false
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

            <ContractFormInputs control={control} />

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