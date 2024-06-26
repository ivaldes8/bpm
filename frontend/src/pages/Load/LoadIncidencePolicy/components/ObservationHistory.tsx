import Alert from '@/components/Base/Alert'
import { Disclosure } from '@/components/Base/Headless'
import Lucide from '@/components/Base/Lucide'
import { useTranslation } from 'react-i18next'

type Props = {
    selectedContract: any
}

const ObservationHistory = ({ selectedContract }: Props) => {
    const { t } = useTranslation()

    return (
        <div className="box p-4 m-4 mb-2">
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button>
                            {open ? t('hideObservations') : t('showObservations')}
                        </Disclosure.Button>
                        <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                            {selectedContract?.ObservacionContrato && selectedContract?.ObservacionContrato.length > 0 ? (
                                <div>
                                    {selectedContract.ObservacionContrato.map((comment: any, index: number) => (
                                        <div key={comment.FechaAlta} className="flex items-center mb-4 box p-4">
                                            <div className='w-full'>
                                                <div className="flex flex-col sm:flex-row justify-between mb-1">
                                                    <div className="text-sm font-medium text-gray-900">{comment.Usuario?.Nombre} - {comment.Usuario?.Codigo}</div>
                                                    <div className="text-sm text-gray-500">{new Date(comment.FechaAlta).toLocaleDateString()}-{new Date(comment.FechaAlta).toLocaleTimeString()}</div>
                                                </div>
                                                <hr />
                                                <div className="text-gray-700">{comment.Contenido}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Alert variant="soft-secondary" className="flex items-center my-4 justify-center">
                                    <Lucide icon="AlertOctagon" className="w-6 h-6 mr-2" />{" "}
                                    {t("noCommentsFound")}
                                </Alert>
                            )}
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div >
    )
}

export default ObservationHistory