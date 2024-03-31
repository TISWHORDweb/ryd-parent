import React from 'react';
import { Empty, StudentCard } from '../../../components/ui';


interface Props {
    data: any[] | [],
    setTab: () => void,
}

export default function AccountSection({ data, setTab }: Props) {
  return (
    <div className='grid gap-[3rem]'>
        { data?.length === 0 && <Empty text="No accounts yet" /> }
        { data?.length > 0 && 
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-x-[3rem] gap-y-7'>
                {data.map((item, index) => (
                    <StudentCard
                    key={index} 
                    setTab={setTab}
                    />
                ))}
            </div>
        }
    </div>
  )
}
