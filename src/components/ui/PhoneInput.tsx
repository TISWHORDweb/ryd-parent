import React, { useEffect, useState } from 'react'
import PhoneInput, { getCountries, getCountryCallingCode } from 'react-phone-number-input'

type Props = {
    placeholder?: string;
    value?: string;
    handlePhoneInputChange?: () => void;
}

export default function PhoneNumberInput({ placeholder, value, handlePhoneInputChange }: Props) {
    const [ toggleCountryFlag, setToggleCountryFlag ] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<any>({});

    useEffect(() => {
        console.log('selected Country', selectedCountry);
    }, [selectedCountry])

  const inputFieldStyle = `w-full bg-ryd-gray rounded-[1000px] text-[18px] leading-[26px] font-[400] text-[#576877] px-[26px] py-[23px] outline-none active:outline-none`;

  return (
    <div className='w-full bg-red-400'>
        {/* countries name  */}
        <div className='relative'>
            <div onClick={() => setToggleCountryFlag(prevState => !prevState)} className='hover:cursor-pointer'>{}</div>
            {toggleCountryFlag &&
            <div className="absolute">
                {getCountries().map((country) => { 
                    console.log('country', country)
                    return <div key={country} onClick={() => setSelectedCountry(country)}>{country}</div>
                })}
            </div>}
        </div>
        {/* countries calling code  */}
        {/* <select
        >
            <option value="">
            </option>
            {getCountries().map((country) => (
            <option key={country} value={country}>
                 +{getCountryCallingCode(country)}
            </option>
            ))}
        </select> */}
    </div>
  )
}