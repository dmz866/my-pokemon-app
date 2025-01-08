import { PropsWithChildren, ReactElement } from 'react';
import { Navigate } from "react-router";
import { IS_USER_AUTHTENTICATED } from '../constants';
import { getLocalItem } from '../utils';

export const ProtectedRoute = ({ children }: PropsWithChildren): ReactElement => {
    const isUserAuthenticated = getLocalItem(IS_USER_AUTHTENTICATED);
    
    if (!isUserAuthenticated || isUserAuthenticated !== 'true') {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};