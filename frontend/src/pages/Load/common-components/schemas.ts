import * as yup from 'yup'

export const defaultValues = {
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

export const schema = (t: any) => yup.object().shape(
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