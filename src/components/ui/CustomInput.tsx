import React, { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function CustomInput({ type, placeholder, onChange, required, pattern, maxLength }: Props){
    const inputFieldStyle = `w-full bg-ryd-gray rounded-[1000px] text-[16px] leading-[26px] font-[400] text-[#576877] px-[26px] py-[15px] outline-none active:outline-none`;

    return (
        <input 
            type={type || "text"}
            placeholder={placeholder}
            className={`${inputFieldStyle}`}
            onChange={onChange}
            pattern={pattern}
            required={required}
            maxLength={maxLength}
        />
    )
}
