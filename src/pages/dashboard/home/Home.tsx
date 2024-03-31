import { useEffect, useState } from 'react';
import { AppLayout } from '../../../components/layouts';
import { CustomModal } from '../../../components/ui';
import CartModal from './CartModal';
import NewRegModal from './NewRegModal';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import RegSubModal from './RegSubModal';
import successGif from '../../../assets/images/success.json';
import Lottie from 'lottie-react';
import UserService from '../../../services/user.service';


export default function Home() {
    const userService = new UserService();

    const [ toggleRegModal, setToggleRegModal ] = useState(false);
    const [ toggleCartModal, setToggleCartModal ] = useState(false);
    const [ cart, setCart ] = useState(false);
    const [ regTab, setRegTab ] = useState(0);
    const [ childInfo, setChildInfo ] = useState<any>({});
    const [ successModal, setSuccessModal ] = useState(false)

    useEffect(() => {
        getCart();
    }, [])

    const getCart = async() => {
        try{
            const response = await userService.getCart();
            if(!response.status){
                return;
            }
            setCart(true);
        }catch(err){
            return
        }
    }


    const closeRegToggleModal = () => {
        setRegTab(0);
        setToggleRegModal(false)
    }

    const handleNext = () => {
        setRegTab(prevState => prevState + 1);
    }
    const handlePrevious = () => {
        setRegTab(prevState => prevState - 1);
    }

    const pStyle = 'lg:text-[18px] text-[14px] leading-[26px] font-[400] text-center font-[AvertaStd-Light]';
    const h1Style = 'text-center lg:leading-[48.8px] leading-[33px] lg:text-[35px] text-[26px] font-[400] font-[AvertaStd-Semibold] text-ryd-headerTextPrimary';

    return (
        <AppLayout>
            <SectionOne />
            <SectionTwo 
                toggleCartModal={() => setToggleCartModal(true)}
                toggleRegModal={() => setToggleRegModal(true)}
                cart={cart}
            />
            <SectionThree  /> 

            {toggleCartModal && 
                <CustomModal
                modalStyle="relative bg-white lg:w-[35%] md:w-[70%] w-[95%] mx-auto rounded-[16px] lg:mt-[7rem] mt-[3rem]"
                closeModal={() => setToggleCartModal(false)}
                >
                    <CartModal closeCart={() => setToggleCartModal(false)} />
                </CustomModal>
            }

            {toggleRegModal && 
             <CustomModal
             modalStyle={`relative bg-white ${regTab === 0 ? 'lg:w-[35%] lg:mt-[1rem] mt-[3rem]' : 'lg:w-[45%] lg:mt-[5rem] mt-[3rem]'} md:w-[70%] w-[95%] mx-auto rounded-[16px] `}
             closeModal={closeRegToggleModal}
             >
                {regTab === 0 &&
                    <NewRegModal 
                        setChildInfo={(data: any) => setChildInfo(data)}
                        handleNext={handleNext}
                    />
                }
                { regTab === 1 &&
                    <RegSubModal 
                        childInfo={childInfo}
                        handlePrevious={handlePrevious}
                        closeRegTab={() => {
                            setRegTab(0)
                            setToggleRegModal(false);
                            setCart(true);
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
