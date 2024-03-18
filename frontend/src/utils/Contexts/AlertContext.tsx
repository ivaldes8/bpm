import { createContext, SetStateAction, useState, Dispatch } from "react";


export type AlertType = {
    type: string,
    show: boolean,
    text: string,
    desc: string | null
}


type AlertContextType = {
    alert: AlertType,
    setAlert: Dispatch<SetStateAction<AlertType>>,
}



export const AlertContext = createContext<AlertContextType | any>(null);
