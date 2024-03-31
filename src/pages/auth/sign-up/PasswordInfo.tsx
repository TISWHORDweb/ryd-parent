import React, { useState } from 'react'
import { AuthLayout } from '../../../components/layouts'
import { Button, CustomInput, Stepper } from '../../../components/ui'
import { AuthProps } from './PersonalInfo';
import { toast } from 'react-toastify';



export default function PasswordInfo({ props, setActiveTab }: AuthProps){
    const [error, setError] = useState(false);
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const h1Style = `font-[400] text-[28px] leading-[36.2px] font-[AvertaStd-Semibold] text-center text-ryd-subTextPrimary mt-5 mb-[1.5rem]`;
    const flexContainer = `w-full lg:flex grid gap-10 mb-[2rem]`;
    const gridContainer = `w-full grid gap-2`;
    const labelStyle = `text-ryd-subTextPrimary font-[400] text-[15px] leading-[26px]`;

    const { setFormData, formData } = props;


    const respObj: any = localStorage.getItem('email-confirmation');
    const obj = JSON.parse(respObj);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(formData.password !== confirmPassword){
            setError(true);
            return;
        }

        // console.log('form data', formData);
        setError(false);
        toast.success(obj.message)
        setActiveTab();
    }

    return (
        <AuthLayout
        headerText="Secure Your Account"
        subText={<>Create a strong password to ensure the safety of your <br /> account. Use a combination of letters, numbers, and <br /> symbols for added security.</>}
        >
            <h1 className={h1Style}>Create Password</h1>
            <Stepper currentTab={2} />

            <form className='mt-[3rem]' onSubmit={handleSubmit}>
                {/* password  */}
                <div className={flexContainer}>
                    <div className={gridContainer}>
                        <label className={labelStyle}>Enter password</label>
                        <CustomInput
                            type="password" 
                            placeholder='XXXXXXXXX'
                            required={true}
                            onChange={(e: any) => setFormData({...formData, password: e.target.value })}
                        />
                    </div>
                </div>

                {/* confirm password  */}
                <div className='mb-[2rem]'>
                    <div className={gridContainer}>
                        <label className={labelStyle}>Confirm Password</label>
                        <CustomInput
                            type="password" 
                            placeholder='XXXXXXXXX'
                            required={true}
                            onChange={(e: any) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <small className='text-red-600'>{error && 'Passwords must match!'}</small>
                </div>

                <Button 
                    text={'Continue'}
                    isInverted={false}
                    category='button'
                    btnStyle='w-full rounded-[1000px] border-0 mt-6 text-[18px] leading-[26px] font-[400] text-white px-[26px] py-[15px]'
                />
            </form>
        </AuthLayout>
    )
}