import clsx from 'clsx';
import { Controller } from "react-hook-form";
import { FormLabel, InputGroup, FormSelect } from "@/components/Base/Form";
import { useTranslation } from 'react-i18next';
import Lucide, { Icon } from '@/components/Base/Lucide';

type Props = {
    control: any,
    name: string,
    labelEnabled?: boolean
    info?: string,
    label?: string,
    placeholder?: string
    disabled?: boolean,
    showIcon?: boolean,
    icoName?: Icon,
    animationDirection?: string,
    options: Array<any>,
    multiple?: boolean,
    valueKey?: string,
    labelKey?: string,
    addNull?: boolean,
    onChangeE?: any,
    disableM?: boolean,
    noSelectText?: string
}

const Select = ({ control, name, labelEnabled = true, info, label, placeholder, disabled = false, showIcon = false, icoName = "Activity", animationDirection = "intro-x", options, multiple = false, valueKey = "value", labelKey = "label", addNull = true, onChangeE, disableM = false, noSelectText = "noSelected" }: Props) => {

    const { t } = useTranslation()

    return (
        <div className={`input-form ${disableM ? '' : 'my-3 '} ${animationDirection}`}>
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

                        <InputGroup>
                            {showIcon && (
                                <InputGroup.Text id={icoName}>
                                    <Lucide icon={icoName} />
                                </InputGroup.Text>
                            )}

                            <FormSelect
                                aria-label="Default select example"
                                value={value}
                                onChange={(e) => {
                                    onChange(e)
                                    if (onChangeE) onChangeE(e);
                                }}
                                disabled={disabled}
                                name={name}
                                multiple={multiple}
                                onBlur={onBlur}
                                className={clsx([{
                                    "border-danger": error,
                                }, "w-full py-3"])}
                            >
                                <option value="">{t(noSelectText)}</option>
                                {
                                    options.map((o) => (
                                        <option key={o[valueKey]} value={o[valueKey]}>{o[labelKey]}</option>
                                    ))
                                }
                            </FormSelect>

                        </InputGroup>
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

export default Select
