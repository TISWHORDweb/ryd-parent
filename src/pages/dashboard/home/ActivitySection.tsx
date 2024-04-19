import React from 'react';
import { ActivityCard, Empty } from '../../../components/ui';

interface Props {
    data: any[] | [],
    loading: boolean
}

export default function ActivitySection({ data, loading }: Props) {
  return (
    <div className={`grid gap-[3rem] relative ${data?.length === 0 && 'border border-gray-100 rounded-[16px] pb-[6rem]'}`}>
        {loading ? <div className='h-[100px] w-[100px] rounded-full absolute left-[50%] top-[20%] border border-ryd-primary border-l-white animate-spin'></div> :
        <>
            { data?.length === 0 && 
                <div className='mt-[3rem]'>
                    <Empty text={<>You have no activity yet, <br /> click 'Add Child +' to get started.</>} /> 
                </div>
            }
            { data?.length > 0 && 
                <div className='grid gap-5'>
                    {data?.map((item, index) => (
                        <ActivityCard
                            key={index} 
                            childName={item?.firstName}
                            imageUrl={item?.programs[0]?.package?.imageUrl}
                            title={item?.programs[0]?.package?.title}
                            amount={item?.programs[0]?.package?.amount}
                            altAmount={item?.programs[0]?.package?.altAmount}
                            description={item?.programs[0]?.package?.description}
                            minAge={item?.programs[0]?.package?.minAge}
                            maxAge={item?.programs[0]?.package?.maxAge}
                            week={item?.programs[0]?.package?.weekDuration}
                            createdAt={item?.programs[0]?.package?.createdAt}
                            mediaUrl={item?.programs[0]?.mediaUrl}
                            teacher={item?.programs[0]?.teacher?.firstName + ' ' + item?.programs[0]?.teacher?.lastName}
                            attendance={item?.programs[0].attendance}
                            classUrl={item?.programs[0]?.teacher?.classLink}
                            docUrl={item?.programs[0]?.teacher?.docUrl}
                        />
                    ))}
                </div>
            }
        </>
        }
    </div>
  )
}
