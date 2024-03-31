import { useEffect, useState } from 'react'
import { AuthLayout } from '../../../components/layouts';
import { Button, CountrySelectInput, CustomInput, PhoneNumberInput, StateSelectInput, Stepper } from '../../../components/ui';
import { Link } from 'react-router-dom';
import { fetchTimezoneInfo } from '../../../components/custom-hooks';
import AuthService from '../../../services/auth.service';
import { toast } from 'react-toastify';

export type AuthProps = {
    props: {
        setFormData: (data: any) => void,
        loading?: boolean,
        formData: {
            firstName: string,
            lastName: string,
            email: string,
            country: string,
            state: string,
            phone: string,
            password: string,
            timezone: string,
            timeOffset: number
        
        }
    },
    setActiveTab: () => void,
}

export default function PersonalInfo({ props, setActiveTab }: AuthProps) {
  const authService = new AuthService();
  const [ country, setCountry ] = useState<any>(null);
  const [ txZone, setTxZone ] = useState<any>(null);
  const [ stateItem, setStateItem ] = useState(0);
  const [loading, setLoading] = useState(false);

  const { setFormData, formData } = props;

  const h1Style = `font-[400] text-[28px] leading-[36.2px] font-[AvertaStd-Semibold] text-center text-ryd-subTextPrimary mt-5 mb-[1.5rem]`;
  const flexContainer = `w-full lg:flex grid gap-10 mb-[2rem]`;
  const gridContainer = `w-full grid gap-2`;
  const inputFieldStyle = `w-full bg-ryd-gray rounded-[1000px] text-[16px] leading-[26px] font-[400] text-[#576877] px-[26px] py-[15px] outline-none active:outline-none`;
  const labelStyle = `text-ryd-subTextPrimary font-[400] text-[15px] leading-[26px]`;

  useEffect(() => {
    const  { timeOffset, timezoneName } = fetchTimezoneInfo();
    setTxZone({timeOffset, timezoneName});
    setFormData({...formData, timeOffset: timeOffset, timezone: timezoneName });
  }, [])

  const handleStateChange = (data: any) => {
        setStateItem(data);
        setFormData({...formData, state: data.name});
    }

  const handleCountryChange = (data: any) => {
        
        setCountry(data);
        setFormData({...formData, country: data.name });
    }

  const handleSubmit = async(e: any) => {
        e.preventDefault();

        setLoading(true);
        try{
            const response = await authService.verifyEmail({ email: formData.email });
            setLoading(false)
            if(!response.status){
                toast.error(response?.message);
                return
            }
            const obj = JSON.stringify(response)
            localStorage.setItem('email-confirmation', obj);
            setActiveTab()
        }catch(err: any){
            setLoading(false)
            toast.error(err?.message);
        }
        // verify email 
    }



  return (
    <AuthLayout>
        <h1 className={`${h1Style}`}>Parents Details</h1>
        <Stepper currentTab={1} />

        <form className='mt-[3rem] pb-[2rem]' onSubmit={handleSubmit}>
            {/* first name and last name  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>First name</label>
                    <CustomInput
                        type="text" 
                        placeholder='John'
                        required={true}
                        onChange={(e: any) => setFormData({...formData, firstName: e.target.value })}
                    />
                </div>
                <div className={gridContainer}>
                    <label className={labelStyle}>Last name</label>
                    <CustomInput
                        type="text" 
                        placeholder='Doe'
                        required={true}
                        onChange={(e: any) => setFormData({...formData, lastName: e.target.value })}
                    />
                </div>
            </div>

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

            {/* country and state  */}
             <div className='mb-[2rem]'>
                <div className={'w-full lg:flex grid gap-10'}>
                    <div className={gridContainer}>
                        <label className={labelStyle}>Country</label>
                        <CountrySelectInput
                            handleCountryChange={handleCountryChange}
                            className={inputFieldStyle}
                            />
                    </div>
                    <div className={gridContainer}>
                        <label className={labelStyle}>State</label>
                        <StateSelectInput
                            country={country}
                            handleStateChange={handleStateChange}
                            className={inputFieldStyle}
                            />
                    </div>
                </div>
                {txZone && <div className='mx-auto px-5 py-3 text-[11px] bg-amber-100 mt-3 rounded-[16px]'>Your timezone and time-offset is <span className='text-green-600'>{txZone?.timeOffset} {txZone.timezoneName}</span> based on your current location</div>}
            </div>

            {/* phone number  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>Phone</label>
                    <CustomInput
                        type="tel" 
                        placeholder='+234 812 8224 769'
                        pattern="[0-9]*"
                        onChange={(e: any) => setFormData({...formData, phone: e.target.value})}
                        required={true}
                    />
                </div>
            </div>

            <Button 
                text={loading ? 'Processing...' : 'Continue'}
                isInverted={false}
                category='button'
                btnStyle='w-full rounded-[1000px] border-0 mt-6 text-[18px] leading-[26px] font-[400] text-white px-[26px] py-[15px]'
            />

            <p className="text-[16px] font-[400] leading-[26px] text-center mt-[2rem]">
                <span className="text-ryd-subTextPrimary">Already have an account? </span><Link to='/parent/sign-in' className="text-ryd-primary">Sign In</Link>
            </p>
        </form>
    </AuthLayout>
  )
}