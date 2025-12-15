import React from 'react';
import { Navigate } from 'react-router-dom';
function ProtectedPass({children}){
    const resetEmail=localStorage.getItem('resetEmail');
    if(!resetEmail){
        return <Navigate to='/signin' replace />
    }
    return children
}
export default ProtectedPass;