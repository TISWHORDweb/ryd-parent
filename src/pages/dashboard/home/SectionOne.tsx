import React from 'react';
import sectionImg from '../../../assets/images/sectionImg.svg';
import sectionImg2 from '../../../assets/icons/g_hat.svg';

export default function SectionOne() {
    const sectionOneStyle = `rounded-[16px] w-full bg-ryd-primaryLess1 flex lg:justify-between lg:px-[5rem] px-5 lg:py-0 py-5 mt-[1.5rem]`;
    const headerH1Style = `lg:text-[22px] text-[18px] leading-[30px] font-[400] font-[AvertaStd-Semibold] text-[#020C16]`;
    const headerPStyle = `text-[14px] leading-[24px] text-white rounded-[65px] bg-ryd-primary/[.9] py-4 px-6 border-0`;

    return (
        <section className={sectionOneStyle}>
            <div className='h-fit my-auto grid  items-center gap-10'>
                <h1 className={headerH1Style}>Welcome to your RYD Activity Board</h1>
                <div className='flex gap-x-1.5 items-center'>
                    <img src={sectionImg2} alt="section img2" className='h-[63px] w-[63px]' />
                    <p className={headerPStyle}>Yet to enroll your child? Click 'Add' to get started 😉</p>
                </div>
            </div>
            <div className='lg:block hidden'>
                <img src={sectionImg} alt="section img" />
            </div>
        </section>
    )
}
