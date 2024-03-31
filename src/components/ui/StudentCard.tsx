import React from 'react';
import { Link } from 'react-router-dom';
import achieveImg from '../../assets/images/achieveImg.svg';

interface Props {
    setTab: () => void
}

export default function StudentCard({ setTab }: Props) {
    // const {} = props;

    const cardContainerStyle = 'border-2 border-ryd-gray rounded-[16px] w-full grid relative';
    const programStyle = 'float-right rounded-[1000px] mb-2 px-[10px] py-[5px] bg-[#ECF9EA] text-ryd-green text-center w-fit text-[13px] font-[400]';
    const h1Style = 'clear-both lg:text-[26px] text-[20px] lg:mt-1 mb-2 leading-[35px] font-[400] font-[AvertaStd-Semibold] text-ryd-subTextPrimary';
    const pStyle = ' lg:text-[16px] text-[14px] leading-[32px] font-[400] text-[#576877]';
    const flexBoxStyle = 'flex flex-wrap items-center';
    const mediaBoxContainer = 'w-full flex flex-wrap gap-7 items-center mt-5';
    const mediaBtn = 'flex items-center gap-2 px-[16px] lg:py-[10px] py-[7px] rounded-[1000px] border border-[#476788] text-ryd-subTextPrimary text-[14px]';
    const goToBtn = 'flex items-center gap-2 px-[32px] lg:py-[10px] py-[7px] rounded-[1000px] border border-ryd-primary text-ryd-primary hover:bg-ryd-primary hover:text-white text-[14px]';
    const subFlexCont = 'flex items-center gap-x-2'

    return (
        <div className={cardContainerStyle}>
            <img src={achieveImg} alt="achieve" className='absolute right-5 -top-2 h-[70px] w-[70px] drop-shadow' />

            <div className='pt-7 pb-[2rem] lg:pr-[2rem] pr-[1.2rem] lg:pl-[2rem] pl-[1.2rem]'>
                {/* <div className={programStyle}>Basic</div> */}
                <h1 className={h1Style}>Okafor Henry</h1>

                <div className={subFlexCont}>
                    <label>Age:</label>
                    <p className={pStyle}>7</p>
                </div>

                <div className='flex gap-8 mt-[.4rem]'> 
                    <div className={subFlexCont}>
                        <label>Program:</label>
                        <p className={pStyle}>Advanced</p>
                    </div>

                    <div className={subFlexCont}>
                        <label>Level:</label>
                        <p className={pStyle}>II</p>
                    </div>
                </div>


                {/* <div className='flex gap-8 mt-[.4rem]'> */}
                    <div className={`${subFlexCont} mt-1`}>
                        <label>Commence date:</label>
                        <p className={pStyle}>11th october, 2024</p>
                    </div>

                <div className={mediaBoxContainer}>
                    <button onClick={setTab} className={goToBtn}>View Activity</button> 
                    <Link to='/' className={goToBtn} target='_blank' rel="noopener noreferrer">Go to class</Link> 
                </div>
            </div>
        </div>
    )
}
