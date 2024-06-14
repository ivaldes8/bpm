import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../stores/hooks";
import { selectUser } from "../../stores/authSlice";
import { ReactNode } from "react";

type Props = {
    permissions: string[],
    children: ReactNode
}

const Protected = ({ permissions, children }: Props) => {
    const user = useAppSelector(selectUser);

    //@ts-ignore
    if (user && (!permissions.length || permissions.find((p) => p === user.user.Rol.Nombre))) {
        return children
    } else {
        return <Navigate to="/" replace />
    }
}

export default Protected
