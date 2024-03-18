import { createContext, SetStateAction, useState, Dispatch } from "react";


type LoadingContextType = {
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
}


export const LoadingContext = createContext<LoadingContextType | any>(null);
