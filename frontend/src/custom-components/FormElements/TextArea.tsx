import clsx from 'clsx';
import { Controller } from "react-hook-form";
import { FormLabel, InputGroup, FormTextarea } from "@/components/Base/Form";
import { useTranslation } from 'react-i18next';


type Props = {
    control: any,
    name: string,
    labelEnabled?: boolean
    info?: string,
    label?: string,
    placeholder?: string
    disabled?: boolean,
    animationDirection?: string
    rows?: number,
    disableM?: boolean,
    style?: object
}


const TextArea = ({ control, name, labelEnabled = true, info, label, placeholder, disabled = false, animationDirection = "intro-x", rows = 3, disableM = false, style = {} }: Props) => {

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
                            <FormTextarea
                                id="validation-form-1"
                                rows={rows}
                                name={name}
                                value={value}
                                onChange={onChange}
                                disabled={disabled}
                                placeholder={placeholder}
                                onBlur={onBlur}
                                className={clsx([{
                                    "border-danger": error,
                                }, "block px-4 py-3 login__input"])}
                                style={style}

                            />

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

export default TextArea


//     < div className = "mt-3 input-form" >
// <FormLabel
//   htmlFor="validation-form-6"
//   className="flex flex-col w-full sm:flex-row"
// >
//   Comment
//   <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
//     Required, at least 10 characters
//   </span>
// </FormLabel>
// <FormTextarea
//   {...register("comment")}
//   id="validation-form-6"
//   name="comment"
//   className={clsx({
//     "border-danger": errors.comment,
//   })}
//   placeholder="Type your comments"
// >

// </FormTextarea>
// {
//     errors.comment && (
//         <div className="mt-2 text-danger">
//             {typeof errors.comment.message === "string" &&
//                 errors.comment.message}
//         </div>
//     )
// }
// </ >
