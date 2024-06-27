import InputField from "@/custom-components/FormElements/InputField"

type Props = {
    control: any
}

const ContractFormInputs = ({ control }: Props) => {
    return (
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
    )
}

export default ContractFormInputs