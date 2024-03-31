import React from 'react';
import shoppingCart from '../../../assets/icons/shoppingCart.svg';
import { Button } from '../../../components/ui';

interface Props {
    toggleCartModal: () => void, 
    toggleRegModal: () => void,
    cart: boolean
}

export default function SectionTwo({ toggleCartModal, toggleRegModal, cart }: Props) {

    const btnContainer = `flex items-center gap-x-2`;
    const addBtnStyle = ' rounded-[1000px] border-0 text-[16px] hover:bg-ryd-primary/[0.9] font-[400] text-white px-[26px] py-[14px]';
    const cartDivStyle = 'px-[26px] py-[15px] bg-ryd-primaryLess1/[.3] hover:bg-ryd-primaryLess1/[.7] hover:cursor-pointer rounded-full';

    return (
        <section className='mt-[2.5rem] w-full flex justify-end'>
            <div className={btnContainer}>
                <div className='flex items-center relative'>
                    {cart &&
                    <div 
                        className='absolute top-0 right-0 bg-orange-400 border border-white rounded-[32px] p-2 text-[10px] text-white animate-pulse' 
                        title='new item in cart'></div> 
                    } {/***** notification dot  ***/}
                    <div onClick={toggleCartModal} className={cartDivStyle}>
                        <img src={shoppingCart} alt="shopping-cart" />
                    </div>
                </div>
                <Button 
                    text='Add +'
                    isInverted={false}
                    category='button'
                    handleClick={toggleRegModal}
                    btnStyle={addBtnStyle}
                />
            </div>
            <div></div>
        </section>
    )
}
