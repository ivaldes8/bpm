import Lucide from '@/components/Base/Lucide'
import Litepicker from '@/components/Base/Litepicker'
import { useTranslation } from 'react-i18next'
import { Controller } from 'react-hook-form'
import { FormLabel } from '@/components/Base/Form'
import clsx from 'clsx'

type Props = {
    control: any,
    name: string,
    labelEnabled?: boolean
    info?: string,
    label?: string,
    disabled?: boolean,
    animationDirection?: string,
    disableM?: boolean
}

const DatePicker = ({ control, name, labelEnabled = true, info, label, disabled = false, animationDirection = "intro-x", disableM = false }: Props) => {

    const { t } = useTranslation()

    return (
        <div className={`  ${disableM ? '' : 'my-3 '} ${animationDirection}`}>
            {
                labelEnabled && (
                    <FormLabel
                        htmlFor="validation-form-1"
                        className="flex flex-col w-full sm:flex-row font-medium"
                    >
                        {label ? t(label) : ''}
                        <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500 font-normal">
                            {info ? t(info) : ''}
                        </span>
                    </FormLabel>
                )
            }

            <Controller
                control={control}
                name={name}
                render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                }) => (
                    <>
                        <div className="relative">
                            <div className="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                <Lucide icon="Calendar" className="w-4 h-4" />
                            </div>
                            <Litepicker value={value} onChange={onChange}
                                onBlur={onBlur}
                                disabled={disabled}
                                options={{
                                    lang: 'es-ES',
                                    autoApply: true,
                                    showWeekNumbers: true,
                                    format: 'YYYY-MM-DD',
                                    dropdowns: {
                                        minYear: 1990,
                                        maxYear: null,
                                        months: true,
                                        years: true,
                                    },
                                }} className={clsx([{
                                    "border-danger": error,
                                }, "block px-4 py-3 pl-12"])} />
                        </div>

                        {error && (
                            <div className="mt-2 text-danger">
                                {error.message}
                            </div>
                        )}
                    </>
                )}
            />
        </div>
    )
}

export default DatePicker
