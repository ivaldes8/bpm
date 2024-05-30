import ParentModal from '@/custom-components/Modals/ParentModal'
import { useTranslation } from 'react-i18next'
import ReactJson from 'react-json-view'

type Props = {
    show: boolean,
    selectedRow: any,
    setShow: (show: boolean) => void
}

const UploadDetail = ({ show, setShow, selectedRow }: Props) => {

    const { t } = useTranslation()

    return (
        <ParentModal
            size='lg'
            title={t("uploadDetail")}
            show={show}
            setShow={setShow}
            hideFooter
        >
            <div className="flex w-full justify-center items-center">
                {selectedRow?.ErrorLogs ? (
                    <ReactJson src={JSON.parse(selectedRow?.ErrorLogs)} />
                ) : null}
            </div>
        </ParentModal>
    )
}

export default UploadDetail