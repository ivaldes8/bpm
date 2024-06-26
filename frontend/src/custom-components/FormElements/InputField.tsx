import clsx from 'clsx';
import { Controller } from "react-hook-form";
import { FormInput, FormLabel } from "@/components/Base/Form";
import { useTranslation } from 'react-i18next';
import Lucide, { Icon } from '@/components/Base/Lucide';

type Props = {
    control: any,
    name: string,
    type?: string,
    labelEnabled?: boolean
    info?: string,
    label?: string,
    placeholder?: string
    disabled?: boolean,
    showIcon?: boolean,
    icoName?: Icon,
    animationDirection?: string,
    disableM?: boolean,
    accept?: string
}

const InputField = ({ control, name, type = "text", labelEnabled = true, info, label, placeholder, disabled = false, showIcon = false, icoName = "Bone", animationDirection = "intro-x", disableM = false, accept }: Props) => {

    const { t } = useTranslation()

    return (
        <div className={`${disableM ? '' : 'my-3 '} ${animationDirection}`}>
            {
                labelEnabled && (
                    <FormLabel
                        htmlFor="validation-form-1"
                        className="flex flex-col w-full sm:flex-row font-medium text-xs mb-0"
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
                            {
                                showIcon && (
                                    <div className="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                        <Lucide icon={icoName} className="w-4 h-4" />
                                    </div>
                                )
                            }

                            <FormInput
                                formInputSize="sm"
                                id="validation-form-1"
                                accept={accept ?? undefined}
                                name={name}
                                value={type !== 'file' ? value : null}
                                onChange={(e: any) => {
                                    if (type !== 'file') {
                                        onChange(e)

                                    } else {
                                        onChange(e.target.files[0])
                                    }
                                }}
                                type={type}
                                disabled={disabled}
                                placeholder={placeholder}
                                onBlur={onBlur}
                                className={clsx([{
                                    "border-danger": error,
                                }, `block items-center px-4 py-2 ${showIcon && 'pl-12'}`])}

                            />
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

export default InputField
