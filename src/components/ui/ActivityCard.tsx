import React from 'react';
import { Link } from 'react-router-dom';
import mediaIcon from '../../assets/icons/mediaIcon.svg';
import { formatDate } from '../custom-hooks';
import imgBg from '../../assets/images/bg-info.jpg';

interface Props {
    imageUrl: string, 
    amount: string, 
    title: string, 
    description: string,
    minAge: number,
    maxAge: number,
    week: number,
    createdAt: any,
    mediaUrl: string,
    attendance: any[]
}

export default function ActivityCard({
    imageUrl,
    amount,
    title,
    description,
    minAge,
    maxAge,
    week,
    createdAt,
    mediaUrl,
    attendance
}: Props) {

    const cardContainerStyle = 'h-fit border border-[#E7EEFE] shadow shadow-ryd-primaryLess1 rounded-[16px] w-full grid lg:grid-cols-5 grid-cols-1';
    const programStyle = 'rounded-[10px] px-[15px] py-[1px] bg-[#ECF9EA]/[.8] text-ryd-green  text-center w-fit text-[12px] font-[800]';
    const h1Style = 'leading-0 lg:text-[24px] text-[20px] font-[400] font-[AvertaStd-Semibold] text-ryd-subTextPrimary';
    const pStyle = 'lg:text-[15px] leading-0 text-[14px] font-[400] text-[#576877] py-2';
    const flexBoxStyle = 'flex flex-wrap items-center lg:gap-5 gap-4';
    const mediaBoxContainer = 'w-full flex flex-wrap gap-5 items-center mt-5';
    const mediaBtn = 'flex items-center gap-2 px-[16px] lg:py-[7px] py-[7px] rounded-[16px] border border-[#476788] text-ryd-subTextPrimary text-[12px]';
    const goToBtn = 'flex items-center gap-2 px-[16px] lg:py-[7px] py-[7px] rounded-[16px] border border-ryd-primary text-ryd-primary hover:bg-ryd-primary hover:text-white text-[12px]';
    const subFlexStyle = 'lg:flex items-center text-[13px] text-[#576877]';
    const subLabelStyle = 'text-white bg-ryd-primary py-1 px-3 rounded-tl-[10px] lg:rounded-bl-[10px] rounded-bl-[0px] lg:rounded-tr-[0px] rounded-tr-[10px] text-[12px]';
    const subPStyle = ' bg-ryd-primaryLess1 py-1 px-3 lg:rounded-tr-[10px] lg:rounded-bl-[0px] rounded-bl-[10px]  rounded-tr-[0px] rounded-br-[10px] text-[12px] text-center'

    return (
        <div className={cardContainerStyle}>
            <div className='col-span-1 p-2'>
                <div className="lg:h-full h-[200px]">
                    <img src={imageUrl} alt="banner" className='object-cover h-full w-full rounded-[16px] border' />
                </div>
            </div>
            <div className='lg:col-span-4 col-span-1 px-[2rem] pt-2 pb-5'>
                <div className="flex items-center justify-between py-2">
                    <h1 className={h1Style}>{title}</h1>
                    <div className={programStyle}>${amount}</div>
                </div>

                <p className={`${pStyle} first-letter:uppercase`}>{description}</p>

                <div className={flexBoxStyle}>
                    <div className={subFlexStyle}>
                        <label className={subLabelStyle}>Age Range</label>
                        <p className={subPStyle}>{minAge} - {maxAge}</p>
                    </div>
                    <div className={subFlexStyle}>
                        <label className={subLabelStyle}>Duration</label>
                        <p className={subPStyle}>{week} Weeks</p>
                    </div>
                    <div className={subFlexStyle}>
                        <label className={subLabelStyle}>Date Registered</label>
                        <p className={subPStyle}>{formatDate(createdAt)}</p>
                    </div>
                    <div className={subFlexStyle}>
                        <label className={subLabelStyle}>Attendance</label>
                        <p className={subPStyle}>{attendance.length}</p>
                    </div>
                </div>
                <div className={mediaBoxContainer}>
                    <Link to={mediaUrl} target='_blank' rel="noopener noreferrer" className={mediaBtn}>
                        <img src={mediaIcon} alt="media" className='h-[14px] w-[14px]' /> 
                        <span>Media</span> 
                    </Link>
                    <Link to='/' className={goToBtn} target='_blank' rel="noopener noreferrer">Get curriculum</Link> 
                    <Link to='/' className={goToBtn} target='_blank' rel="noopener noreferrer">Go to class</Link> 
                </div>
            </div>
        </div>
    )
}
