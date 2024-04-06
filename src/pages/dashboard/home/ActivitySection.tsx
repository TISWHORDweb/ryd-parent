import React from 'react';
import { ActivityCard, Empty } from '../../../components/ui';

interface Props {
    data: any[] | []
}

export default function ActivitySection({ data }: Props) {
  return (
    <div className={`grid gap-[3rem] ${data?.length === 0 && 'border border-gray-100 rounded-[16px] pb-[6rem]'}`}>
        { data?.length === 0 && 
            <div className='mt-[3rem]'>
                <Empty text={<>You have no activity yet, <br /> click 'Add +' to get started.</>} /> 
            </div>
        }
        { data?.length > 0 && 
            <div className='grid gap-5'>
                {data?.map((item, index) => (
                    <ActivityCard
                        key={index} 
                        imageUrl={item?.programs[0]?.package?.imageUrl}
                        title={item?.programs[0]?.package?.title}
                        amount={item?.programs[0]?.package?.amount}
                        description={item?.programs[0]?.package?.description}
                        minAge={item?.programs[0]?.package?.minAge}
                        maxAge={item?.programs[0]?.package?.maxAge}
                        week={item?.programs[0]?.package?.weekDuration}
                        createdAt={item?.programs[0]?.package?.createdAt}
                        mediaUrl={item?.programs[0]?.mediaUrl}
                        attendance={item?.programs[0].attendance}
                    />
                ))}
            </div>
        }
    </div>
  )
}
