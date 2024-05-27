import Alert from '@/components/Base/Alert'
import { Disclosure } from '@/components/Base/Headless'
import Lucide from '@/components/Base/Lucide'
import CheckBoxField from '@/custom-components/FormElements/CheckBoxField'
import InputField from '@/custom-components/FormElements/InputField'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Props = {
    control: any
}

const DocumentList = ({ control }: Props) => {
    const { t } = useTranslation()

    const { fields } = useFieldArray({
        control,
        name: "documents"
    });

    return (
        <div className="box p-4 m-4 mb-0">
            <Disclosure defaultOpen>
                {({ open }) => (
                    <>
                        <Disclosure.Button>
                            {open ? t('hideDocumentList') : t('showDocumentList')}
                        </Disclosure.Button>
                        <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                            <div className="pt-0 p-2 m-2 mb-2">
                                {fields && fields.length > 0 ? (
                                    <div className="flex flex-col gap-0">
                                        {fields.map((item, index) => (
                                            <div key={item.id} className='flex gap-2 items-center'>
                                                <div>
                                                    <CheckBoxField
                                                        control={control}
                                                        name={`documents.${index}.present`}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <InputField
                                                        control={control}
                                                        name={`documents.${index}.name`}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Alert variant="soft-secondary" className="flex items-center my-4 justify-center">
                                        <Lucide icon="AlertOctagon" className="w-6 h-6 mr-2" />{" "}
                                        {t("noDocumentsFound")}
                                    </Alert>
                                )}

                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div >
    )
}

export default DocumentList