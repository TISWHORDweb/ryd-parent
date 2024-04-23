import React, { useEffect, useState } from 'react';
import { CustomModal, Empty, StudentCard } from '../../../components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { setCart } from '../../../redux/reducers/userSlice';


interface Props {
    data: any[] | [],
    setTab: (data: number) => void,
    loading?: boolean,
}

export default function AccountSection({ data, setTab, loading }: Props) {
    const dispatch = useDispatch();
    const cart: any = useSelector((state:RootState) => state.user.cart);

    const [ isNewCohort, setIsNewCohort ] = useState(false);
    const [ kids, setKids ] = useState([])


    const checkCohort = (_arg: boolean) => {
        const dsf: any = [];
        dsf.push(...kids);

        if(_arg){
            setIsNewCohort(_arg);
            setKids(dsf)
        }
    }

    return (
        <>
            <div className={`grid gap-[3rem] relative ${data?.length === 0 && 'border border-gray-100 rounded-[16px] pb-[6rem]'}`}>
                { loading ? <div className='h-[100px] w-[100px] left-[50%] top-[20%] rounded-full absolute border border-ryd-primary border-l-white animate-spin'></div> :
                <>
                    { data?.length === 0 &&
                        (
                        <div className='mt-[3rem]'>
                            <Empty text={<>No Child profile has been created, <br /> click 'Add Child +' to get started.</>} />
                        </div>
                        )
                    }
                    { data?.length > 0 &&
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-[2rem] gap-y-10'>
                            {data.map((item, index) => {
                            // checkCohort(item.allowNewCohort); 
                                return (
                                    <StudentCard
                                        key={index}
                                        item={item}
                                        setTab={setTab}
                                    />
                                )}
                            )}
                        </div>
                    }
                </>
                }
            </div>

            {isNewCohort &&
              <CustomModal
                modalStyle="relative bg-white lg:w-[35%] md:w-[70%] w-[95%] mx-auto rounded-[16px] lg:mt-[7rem] mt-[3rem]"
                closeModal={() => setIsNewCohort(false)}
                >
                    <div className='p-[2rem]'>
                        {/* <img src={closeIcon} alt="close" className='float-right relative -top-4 -right-3 hover:cursor-pointer' onClick={() => setSuccessModal(false)} />

                        <div className='lg:h-[180px] h-[100px] lg:w-[180px] w-[100px] mx-auto'>
                            <Lottie animationData={successGif} />
                        </div>
                        <h1 className={h1Style}>Successful!</h1>
                        <p className={pStyle}>
                            Go to cart to initiate payment and complete the registration process <br /> or<br /> Click on 'Add +' button to enroll another child!
                        </p> */}
                    </div>
                </CustomModal>
            }
        </>
    )
}
