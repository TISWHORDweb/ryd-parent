import React from 'react';
import emptyImg from '../../assets/images/empty.png';

interface Props {
    text: string
}

export default function Empty({ text }: Props) {
    const container = 'w-fit mx-auto mt-[5rem] grid gap-y-3';

    return (
        <div className={container}>
            <img src={emptyImg} alt="empty" className='h-[120px] w-[120px] mx-auto' />
            <p className='text-center text-[18px] font-[400]'>{text}</p>
        </div>
    )
}
