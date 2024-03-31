import React, { useState } from 'react';
import { homeTabs } from '../../../utils/constants';
import { CustomSearchInput } from '../../../components/ui';
import AccountSection from './AccountSection';
import ActivitySection from './ActivitySection';

interface Props {
}

export default function SectionThree() {
    const [ activeTab, setActiveTab ] = useState(0);
    const [ imgSrc, setImgSrc ] = useState('');

    const sectionStyle = `w-full flex justify-between flex-wrap  mt-[1.5rem] gap-y-3`;

    const handleSearch = () => {}

    return (
        <section className='w-full grid pb-[70px]'>
            <section className={sectionStyle}>
                {/* tabs  */}
                <div className='flex items-between gap-x-5'>
                    {homeTabs.map((tab) => {
                        let img = activeTab === tab.id ? require(`../../../assets/icons/on.${tab.icon}`) : require(`../../../assets/icons/${tab.icon}`);
                        return (
                            <div 
                                key={tab.id} 
                                onClick={() => setActiveTab(tab.id)} 
                                className={`flex items-center gap-x-2 py-3 px-5 text-[14px] rounded-[1000px] hover:cursor-pointer ${ activeTab === tab.id ? 'bg-ryd-primary text-white' : '' }`}
                                // onMouseOver={() => setImgSrc(tab.name)}
                                // onMouseOut={() => setImgSrc(tab.name)}
                                >
                                <img src={img} alt="tab icon" />
                                <p>{tab.name}</p>
                            </div>
                        )
                    })}
                </div>
                {/* filter  */}
                <div className='lg:w-[300px] w-full'>
                    <CustomSearchInput 
                        handleSearch={handleSearch}
                        placeholder='Search'
                    />
                </div>
            </section>
            <section className='mt-[3.2rem]'>
                {activeTab === 0 &&
                    <AccountSection setTab={() => setActiveTab(1)} data={[]} />
                }
                {activeTab === 1 &&
                    <ActivitySection data={[]} />
                }
            </section>
        </section>
    )
}
