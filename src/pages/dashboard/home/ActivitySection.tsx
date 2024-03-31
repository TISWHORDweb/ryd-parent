import React from 'react';
import { ActivityCard, Empty } from '../../../components/ui';

interface Props {
    data: any[] | []
}

export default function ActivitySection({ data }: Props) {
  return (
    <div className='grid gap-[3rem]'>
        { data?.length === 0 && <Empty text="No activity yet" /> }
        { data?.length > 0 && 
            <div>
                {data.map((item, index) => (
                    <ActivityCard
                    key={index} 
                    />
                ))}
            </div>
        }
    </div>
  )
}
