import { Dialog } from '@/components/Base/Headless' 
import Lucide, { Icon } from '@/components/Base/Lucide'
import Button, { Variant } from '@/components/Base/Button'
import { useTranslation } from 'react-i18next'

type Props = {
    show: boolean,
    setShow: any,
    handleOnSubmit: any,
    title?: string,
    desc?: string,
    cancelText?: string,
    submitText?: string,
    showUndoneText?: boolean,
    icon?: Icon,
    iconColor?: string,
    submitButtonType?: Variant
}

const ConfirmationModal = ({ show = false, setShow, handleOnSubmit, title = "modalConfirmationTitle", desc = "modalConfirmationDesc", cancelText = "cancel", submitText = "delete", showUndoneText = true, icon = "XCircle", iconColor = "text-danger", submitButtonType = "danger" }: Props) => {

    const { t } = useTranslation();

    return (
        <Dialog staticBackdrop open={show} onClose={() => {
            setShow(false);
        }}
        >
            <Dialog.Panel>
                <div className="p-5 text-center">
                    <Lucide icon={icon} className={`w-16 h-16 mx-auto mt-3 ${iconColor}`} />
                    <div className="mt-5 text-3xl">{t(title)}</div>
                    <div className="mt-2 text-slate-500">
                        {t(desc)} <br />
                        {showUndoneText && (
                            <>{t("proccessUndoneText")}</>
                        )}

                    </div>
                </div>
                <div className="px-5 pb-8 text-center">
                    <Button type="button" variant="outline-secondary" onClick={() => {
                        setShow(false);
                    }}
                        className="w-24 mr-1"
                    >
                        {t(cancelText)}
                    </Button>
                    <Button type="button" variant={submitButtonType} className="w-24" onClick={() => {
                        handleOnSubmit();
                    }}>
                        {t(submitText)}
                    </Button>
                </div>
            </Dialog.Panel>
        </Dialog>
    )
}

export default ConfirmationModal
