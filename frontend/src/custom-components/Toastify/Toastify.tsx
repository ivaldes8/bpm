import { useEffect, useContext } from 'react'
import Toast from "toastify-js";
import { AlertContext } from '../../utils/Contexts/AlertContext'
import Notification from '@/components/Base/Notification'
import Lucide from '@/components/Base/Lucide'
import { useTranslation } from 'react-i18next'


const Toastify = () => {

    const { t } = useTranslation();
    const [alert,] = useContext(AlertContext);

    useEffect(() => {
        if (alert?.show) {
            const element = document
                .querySelectorAll("#show-notification")[0]
                .cloneNode(true) as HTMLElement;
            element.classList.remove("hidden");
            element.classList.add("flex");
            Toast({
                node: element,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
            }).showToast();
        }
    }, [alert])

    return (
        <>
            {alert && (
                <Notification
                    id="show-notification"
                    className="hidden"
                >
                    {
                        alert.type === "success" ? (
                            <Lucide icon="CheckCircle" className="text-success" />
                        ) : (
                            <Lucide icon="XCircle" className="text-danger" />
                        )
                    }
                    <div className="ml-4 mr-4">
                        <div className="font-medium">{t(alert.text)}</div>
                        {
                            alert.desc && (
                                <div className="mt-1 text-slate-500">
                                    {t(alert.desc)}
                                </div>
                            )
                        }
                    </div>
                </Notification>
            )}
        </>
    )
}

export default Toastify
