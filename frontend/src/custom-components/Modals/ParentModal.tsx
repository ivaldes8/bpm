import React from 'react'
import { Dialog } from '@/components/Base/Headless'
import Button from '@/components/Base/Button'
import Lucide, { Icon } from '@/components/Base/Lucide'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Size } from '@/components/Base/Headless/Dialog'

type Props = {
    show: boolean,
    setShow: any,
    handleOnSubmit?: any,
    children: React.ReactElement,
    title?: string,
    cancelButtonText?: string,
    submitButtonText?: string,
    disableSubmitButton?: boolean,
    size?: Size,
    hideFooter?: boolean,
    hideTitle?: boolean,
    disableHeight?: boolean,
    hasIconHeader?: boolean,
    iconHeader?: Icon,
    iconHeaderColor?: string,
    navigateOnClose? : string
}

const ParentModal = ({ navigateOnClose ,show = false, setShow, handleOnSubmit, children, title = "", hasIconHeader = false, iconHeader = "Pencil", iconHeaderColor = "text-warning", cancelButtonText = "cancel", submitButtonText = "accept", size = "xl", disableHeight = false, hideTitle = false, hideFooter = false, disableSubmitButton = false }: Props) => {

    const { t } = useTranslation();

    const navigate =  useNavigate()

    return (
        <Dialog size={size} staticBackdrop open={show} onClose={() => {
            setShow(false);
        }}
        >
            <Dialog.Panel>
                {
                    !hideTitle && (
                        <Dialog.Title>
                            <div className="mr-auto flex">
                                {
                                    hasIconHeader && (
                                        <Lucide icon={iconHeader} className={`w-8 h-8 ${iconHeaderColor}`} />
                                    )
                                }
                                <h2 className="text-base font-medium">
                                    {t(title)}
                                </h2>
                            </div>

                            <div style={{ cursor: "pointer" }} onClick={() => {
                                setShow(false);
                                if(navigateOnClose){
                                    navigate(navigateOnClose);
                                }
                            }}>
                                <Lucide icon="X" className="w-8 h-8 text-slate-400" />
                            </div>

                        </Dialog.Title>
                    )
                }

                <Dialog.Description className={`grid gap-4 gap-y-3  ${!disableHeight && 'max-h-[70vh]'} `} style={{ overflowY: "auto" }}>
                    {children}
                </Dialog.Description>
                {
                    !hideFooter && (
                        <Dialog.Footer>
                            <Button type="button" variant="outline-secondary" onClick={() => {
                                setShow(false);
                            }}
                                className="w-20 mr-1"
                            >
                                {t(cancelButtonText)}
                            </Button>
                            <Button disabled={disableSubmitButton} variant="primary" type="button" className="w-20" onClick={() => {
                                handleOnSubmit();
                            }}>
                                {t(submitButtonText)}
                            </Button>
                        </Dialog.Footer>
                    )
                }
            </Dialog.Panel>
        </Dialog>
    )
}

export default ParentModal
