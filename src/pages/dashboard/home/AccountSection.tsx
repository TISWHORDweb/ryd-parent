import React, { useEffect } from 'react';
import { Empty, StudentCard } from '../../../components/ui';


interface Props {
    data: any[] | [],
    setTab: (data: number) => void,
}

export default function AccountSection({ data, setTab,  }: Props) {
    console.log('account', data)

    return (
        <div className={`grid gap-[3rem] ${data?.length === 0 && 'border border-gray-100 rounded-[16px] pb-[6rem]'}`}>
            { data?.length === 0 && 
                <div className='mt-[3rem]'>
                    <Empty text={<>No Child profile has been created, <br /> click 'Add Child +' to get started.</>} /> 
                </div>
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
        </div>
    )
}
