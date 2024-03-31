import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



interface Props {
    children: ReactNode;
}

export default function AuthMiddleware({ children }: Props) {
    const navigate = useNavigate();
    const token = localStorage.getItem('ryd-parents-token');

    if(!token){
        toast.error('Session Expired! Login');
        navigate('/parent/sign-in');
        return null
    }else{
        return (
            <div>{children}</div>
        )
    }
}
