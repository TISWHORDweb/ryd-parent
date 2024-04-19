import React, { useEffect } from 'react';
import { Empty, StudentCard } from '../../../components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { setCart } from '../../../redux/reducers/userSlice';


interface Props {
    data: any[] | [],
    setTab: (data: number) => void,
    loading?: boolean,
}

export default function AccountSection({ data, setTab, loading }: Props) {
    const cart: any = useSelector((state:RootState) => state.user.cart);
    const dispatch = useDispatch();

    const handleShowCart = () => {
        dispatch(setCart(true))
    }

    return (
        <div className={`grid gap-[3rem] relative ${data?.length === 0 && 'border border-gray-100 rounded-[16px] pb-[6rem]'}`}>
            { loading ? <div className='h-[100px] w-[100px] left-[50%] top-[20%] rounded-full absolute border border-ryd-primary border-l-white animate-spin'></div> :
            <>
                { data?.length === 0 && 
                ( !cart ? 
                    <div className='mt-[3rem]'>
                        <Empty text={<>No Child profile has been created, <br /> click 'Add Child +' to get started.</>} /> 
                    </div> : 
                    <div className='mt-[3rem] w-fit mx-auto'>
                        <p className='text-center text-[18px] font-[800] mb-3 text-gray-300'>You have unpaid in your cart awaiting checkout.</p>
                        <button onClick={handleShowCart} className='py-3 px-[2rem] mx-auto rounded-[8px] bg-ryd-primary text-white'>Open Cart</button>
                    </div>
                    )
                }
                { data?.length > 0 && 
                    <div className='grid lg:grid-cols-2 grid-cols-1 gap-x-[5rem] gap-y-10'>
                        {data.map((item,index) => (
                            <StudentCard
                                key={index} 
                                item={item}
                                setTab={setTab}
                            />
                        ))}
                    </div>
                }
            </>
            }
        </div>
    )
}
