import { useEffect, useState } from 'react';
import { AppLayout } from '../../../components/layouts';
import { CustomModal } from '../../../components/ui';
import NewRegModal from './NewRegModal';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import RegSubModal from './RegSubModal';
import successGif from '../../../assets/images/success.json';
import Lottie from 'lottie-react';
import UserService from '../../../services/user.service';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency, setRenewal, setCart } from '../../../redux/reducers/userSlice';
import { RootState } from '../../../redux/rootReducer';
import SurveySection from './SurveySection';


export default function Home() {
    const { child } = useSelector((state: RootState) => state.user)
    const userService = new UserService();
    const dispatch = useDispatch();

    const [ toggleRegModal, setToggleRegModal ] = useState(false);
    const [ regTab, setRegTab ] = useState(0);
    const [ childInfo, setChildInfo ] = useState<any>({});
    const [ successModal, setSuccessModal ] = useState(false);
    const [ programArr, setProgramArr ] = useState<any>(null);
    const [ isRenewing, setIsRenewing ] = useState<any>(false);
    const [ survey, setSurvey ] = useState<any>([])


    const getSurvey = async() => {
        try{
            const response =  await userService.getSurvey();
            if(!response.status){
                return;
            }
            setSurvey(response.data)
        }catch(err){
            return;
        }
    }

    const getCart = async() => {
        try{
            const response = await userService.getCart();
            if(!response.status){
                return;
            }
            if(response.data > 0){
                setCart(true);
                dispatch(setCart(true))
            }
        }catch(err){
            return
        }
    }

    const getCurrency = async() => {
        try{
            const response = await userService.getCurrency();
            if(!response.status){
                // toast.error(response.message);
                return;
            }
            dispatch(setCurrency(response.data));
        }catch(err){
            return;
        }
    }

    const getPackages = async() => {
        try{
            const response = await userService.getAllPackages();
            if(!response.status){
                return;
            }
            // filter programs based on student age; compare child age to viable age range  
            const programFilter = response.data.find((item: any) => (item?.minAge <= child?.child?.age) && (item?.maxAge >= child?.child?.age))
            setProgramArr(programFilter);
        }catch(err: any){
            return;
        }
        return false;
    };

    const closeRegToggleModal = () => {
        setRegTab(0);
        setToggleRegModal(false);
        dispatch(setRenewal(null))
    }

    const handleNext = () => {
        setRegTab(prevState => prevState + 1);
    }
    const handlePrevious = () => {
        setRegTab(prevState => prevState - 1);
    }


    useEffect(() => {
        getCart();
        getCurrency();
        getSurvey();
    }, [])

    useEffect(() => {
        if(child){
            setRegTab(1);
            setToggleRegModal(true);
            setIsRenewing(true)
            setChildInfo(child)
            getPackages();
        }else{
            setRegTab(0);
            setToggleRegModal(false);
        }
    }, [child])


    const pStyle = 'lg:text-[18px] text-[14px] leading-[26px] font-[400] text-center font-[AvertaStd-Light]';
    const h1Style = 'text-center lg:leading-[48.8px] leading-[33px] lg:text-[35px] text-[26px] font-[400] font-[AvertaStd-Semibold] text-ryd-headerTextPrimary';

    return (
        <AppLayout>
            {survey.length > 0 && <SurveySection surveys={survey} />}
            <SectionOne 
                toggleRegModal={() => setToggleRegModal(true)}
            />
            <SectionThree  /> 

            
            {toggleRegModal && 
             <CustomModal
             modalStyle={`relative bg-white ${regTab === 0 ? 'lg:w-[35%] lg:mt-[1rem] mt-[3rem]' : 'lg:w-[30%] lg:mt-[5rem] mt-[3rem]'} md:w-[70%] w-[95%] mx-auto rounded-[16px] `}
             closeModal={closeRegToggleModal}
             >
                {regTab === 0 &&
                    <NewRegModal 
                        setChildInfo={(data: any) => { 
                            setChildInfo(data);
                        }}
                        handleNext={handleNext}
                    />
                }
                { regTab === 1 &&
                    <RegSubModal 
                        childInfo={childInfo}
                        handlePrevious={handlePrevious}
                        isRenewing={isRenewing}
                        closeRegTab={() => {
                            setRegTab(0)
                            setToggleRegModal(false);
                            setCart(true);
                            dispatch(setRenewal(null))
                        }}
                        setSuccessModal={() => setSuccessModal(true)}
                    />
                }
            </CustomModal>
            }

            {successModal && 
                <CustomModal
                modalStyle="relative bg-white lg:w-[35%] md:w-[70%] w-[95%] mx-auto rounded-[16px] lg:mt-[7rem] mt-[3rem]"
                closeModal={() => setSuccessModal(false)}
                >
                    <div className='p-[2rem]'>
                        <div className='lg:h-[180px] h-[100px] lg:w-[180px] w-[100px] mx-auto'>
                            <Lottie animationData={successGif} />
                        </div>
                        <h1 className={h1Style}>Successful!</h1>
                        <p className={pStyle}>Go to cart to initate payment and complete the registration process <br /> or<br /> Click on 'Add +' button to enroll another child!</p>
                    </div>
                </CustomModal>
            }
        </AppLayout>
    )
}
