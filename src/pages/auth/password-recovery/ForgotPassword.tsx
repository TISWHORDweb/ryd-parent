import React, { useState } from 'react'
import { AuthLayout } from '../../../components/layouts'
import { Button, CustomInput } from '../../../components/ui';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../../services/auth.service';
import { toast } from 'react-toastify';

type Props = {};

const initialValues = {
    email: ''
}

export default function ForgotPassword(props : Props){
    const authService = new AuthService();
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState(initialValues);
    const [ loading, setLoading ] = useState(false);
  
    const h1Style = `font-[400] text-[28px] leading-[36.2px] font-[AvertaStd-Semibold] text-center text-ryd-subTextPrimary mt-[7rem] mb-[1.5rem]`;
    const flexContainer = `w-full lg:flex grid gap-10 mb-[2rem]`;
    const gridContainer = `w-full grid gap-2`;
    const labelStyle = `text-ryd-subTextPrimary font-[400] text-[15px] leading-[26px]`;

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await authService.forgotPassword(formData);
            setLoading(false);
            if(!response.status){
                toast.error(response?.message);
                return;
            }
            toast.error(response.message);
            navigate('/parent/sign-in');
        }catch(err: any){
            setLoading(false);
            toast.error(err.message);
            return
        }
    }

    return (
        <AuthLayout
            headerText="Password Recovery"
            subText={<>No worries! Enter your email address, and we'll help <br /> you reset your password</>}
        >
            <h1 className={`${h1Style}`}>Forgot Your Password?</h1>

            <form className='mt-[3rem]' onSubmit={handleSubmit}>
                {/* email address  */}
                <div className={flexContainer}>
                    <div className={gridContainer}>
                        <label className={labelStyle}>Email Address</label>
                        <CustomInput
                            type="email" 
                            placeholder='Example@example.com'
                            required={true}
                            onChange={(e: any) => setFormData({...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <Button 
                    text={loading ? 'Processing...' : 'Reset Password'}
                    isInverted={false}
                    category='button'
                    btnStyle='w-full rounded-[1000px] border-0 mt-6 text-[18px] leading-[26px] font-[400] text-white px-[26px] py-[15px]'
                />

                <p className="text-[16px] font-[400] leading-[26px] text-center mt-[2rem]">
                    <span className="text-ryd-subTextPrimary">Remembered your password? </span><Link to='/parent/sign-in' className="text-ryd-primary">Log in now!</Link>
                </p>
            </form>
        </AuthLayout>
    )
}