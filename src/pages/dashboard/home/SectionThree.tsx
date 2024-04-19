import React, { useEffect, useState } from 'react';
import { homeTabs } from '../../../utils/constants';
import { CustomSearchInput } from '../../../components/ui';
import AccountSection from './AccountSection';
import ActivitySection from './ActivitySection';
import UserService from '../../../services/user.service';

interface Props {
    setRegTab: () => void
}

export default function SectionThree() {
    const userService = new UserService();
    const [ activeTab, setActiveTab ] = useState(0);
    const [ imgSrc, setImgSrc ] = useState('');
    const [ data, setData ] = useState<any>([]);
    const [ activeChild, setActiveChild ] = useState<any>(null);
    const [ searchValue, setSearchValue ] = useState<any>('');


    const getPackages = async() => {
        try {
            const response  =  await userService.getChildren();
            if(!response.status){ return }
            setData(response.data);
        }catch(err){
            return;
        }
    }

    const handleSetSearchValue = (e: any) => {
       setSearchValue(e.target.value);
       if(e.target.value === ''){
            getPackages();
       }
    }

    const handleSearch = () => {
        if(searchValue === ''){
            getPackages();
            return;
        }else{
            const filteredResult = data.filter((item: any) => 
                item?.firstName.toLowerCase().includes(searchValue) || 
                item?.lastName.toLowerCase().includes(searchValue) || 
                item?.programs[0].package.title.toLowerCase().includes(searchValue));

            setData(filteredResult);
        }
    }


    useEffect(() => {
        getPackages()
    }, []);

    useEffect(() => {
        if(activeChild){
            const activeChildActivity = data.filter((item: any) => item?.id === activeChild);
            setData(activeChildActivity);
        }else{
            getPackages();
        }

    }, [activeChild]);


    const sectionStyle = `w-full flex justify-between flex-wrap  mt-[2.5rem] gap-y-3`;

    return (
        <section className='w-full grid pb-[70px]'>
            <section className={sectionStyle}>
                {/* tabs  */}
                <div className='flex lg:order-1 order-2 items-between bg-ryd-gray rounded-[16px] lg:mt-0 mt-3'>
                    {homeTabs.map((tab) => {
                        let img = activeTab === tab.id ? require(`../../../assets/icons/on.${tab.icon}`) : require(`../../../assets/icons/${tab.icon}`);
                        return (
                            <div 
                                key={tab.id} 
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setActiveChild(null)
                                }} 
                                className={`flex items-center gap-x-2 px-5 py-3 text-[14px] rounded-[16px] hover:cursor-pointer ${ activeTab === tab.id ? 'bg-ryd-primary text-white' : 'text-[#b4b4b48f]' }`}
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
                <div className='lg:w-[350px] lg:order-2 order-1 w-full'>
                    <CustomSearchInput 
                        handleSearch={handleSearch}
                        setSearchValue={handleSetSearchValue}
                        placeholder='Search by name or program...'
                    />
                </div>
            </section>
            <section className='mt-[3.2rem]'>
                {activeTab === 0 &&
                    <AccountSection 
                    setTab={(data: number) => {
                        setActiveTab(1)
                        setActiveChild(data);
                    }} 
                    data={data} 
                    />
                }
                {activeTab === 1 &&
                    <ActivitySection data={data} />
                }
            </section>
        </section>
    )
}
