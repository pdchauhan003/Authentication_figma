import React, { Children } from 'react';
import { Navigate } from 'react-router-dom';
function ProtectedOtp({children}){
    const tempEmail=localStorage.getItem('tempEmail');
    if(!tempEmail){
        return <Navigate to='/signin' replace />
    }
    return children
}
export default ProtectedOtp;