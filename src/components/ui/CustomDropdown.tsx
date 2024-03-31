import React, { useEffect, useState } from 'react';

interface Props {
    className?: string,
    handleChange: (data: any) => void,
    data: any[]
}

export default function CustomDropdown({ className, handleChange, data }: Props) {
    const [ toggle, setToggle ] = useState(false);
    const [ value, setValue ] = useState(null);

    const boxStyle = 'relative';

    const handleSelectChange = (data: any) => {
        setValue(data?.name);
        handleChange(data);
    }

    return (
        <div className={boxStyle}>
            <div
                className={`${className} hover:cursor-pointer capitalize`}
                onClick={() => setToggle(prevState => !prevState)}
            >
                { value || '--- Select Item ---' }
            </div>
            {toggle &&
                <div className="h-fit z-20 overflow-y-auto absolute top-4 w-full shadow bg-white text-ryd-subTextPrimary text-[14px]">
                    {/* <div className="bg-ryd-gray px-4 py-1 capitalize text-center" >--- Select Item ---</div> */}
                    {data?.length > 0 && data?.map((item) => (
                        <div key={item?.value} 
                        className="hover:bg-ryd-gray px-4 py-1 hover:cursor-pointer capitalize" 
                        onClick={() => {
                            setToggle(false)
                            handleSelectChange(item);
                            }}>
                        {item?.name}
                        </div>
                ))}
                </div>
            }
        </div>
    )
}
