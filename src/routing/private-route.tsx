import { PropsWithChildren, ReactElement } from 'react';
import { Navigate } from "react-router";
import { USER } from '../constants';
import { getLocalItem } from '../utils';

export const ProtectedRoute = (props: PropsWithChildren): ReactElement => {
    const user = getLocalItem(USER);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return (<>
        children
    </>);
};