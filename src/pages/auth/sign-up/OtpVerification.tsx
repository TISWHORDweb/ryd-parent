import React, { Dispatch, SetStateAction, useState } from 'react'
import { AuthLayout } from '../../../components/layouts'
import { OtpVerification, Stepper } from '../../../components/ui';
import { toast } from 'react-toastify';
import { AuthProps } from './PersonalInfo';
import AuthService from '../../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../redux/reducers/authSlice';

interface Props {
    setSubmitForm: Dispatch<SetStateAction<boolean>>,
    formData: any
}

export default function OtpVerificationForm({ setSubmitForm, formData }: Props){
    const authService = new AuthService();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const h1Style = `font-[400] text-[28px] leading-[36.2px] font-[AvertaStd-Semibold] text-center text-ryd-subTextPrimary mt-[5rem] mb-[1.5rem]`;


    const handleVerification = async(data: number | string) => {
        const obj: any = localStorage.getItem('email-confirmation');
        const tdx = JSON.parse(obj);
        const newOtp = tdx?.data?.otp + '1';
        if(data === newOtp){
            registerParent();
        }else{
            toast.error('Invalid OTP!');
            return;
        }
    }

    const registerParent = async() => {
        setLoading(true);
        try {
            const response  = await authService.signUp(formData);
            setLoading(false);
            if(!response.status){
                toast.error(response?.message);
                return
            }
            navigate('/success');
            localStorage.setItem('ryd-parent-token', response?.data?.token);
            dispatch(setUserInfo(response.data));
        }catch(err: any){
            setLoading(false);
            toast.error(err.message);
            return
        }
    }

    return (
        <AuthLayout
        headerText="Confirm Email Address"
        subText={<>A one-time verification password has been sent <br /> to your mail, verify to proceed.</>}
        >
            <h1 className={h1Style}>Verify OTP</h1>
            <Stepper currentTab={3} />

            <div className='lg:w-[80%] w-[90%] mx-auto mt-[5rem]'>
                <OtpVerification btnText={loading ? "Processing..." : "Verify OTP"} handleVerification={handleVerification} />
            </div>
        </AuthLayout>
    )
}