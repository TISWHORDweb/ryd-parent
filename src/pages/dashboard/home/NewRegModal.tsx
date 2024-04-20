import React, { useEffect, useState } from 'react';
import { Button, CustomInput, DateSelect, GenderSelect, } from '../../../components/ui';
import CustomDropdown from '../../../components/ui/CustomDropdown';
import { toast } from 'react-toastify';
import UserService from '../../../services/user.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { calculateAge } from '../../../components/custom-hooks';
import closeIcon from "../../../assets/icons/closeIcon.svg";
import DatePicker from "react-date-picker";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface ChildRegProps {
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
}

const initialValues = {
    firstName: '',
    lastName: '',
    age: 0,
    gender: 'male',
}

interface Props {
    handleNext: () => void;
    setChildInfo: (data: any) => void;
    closeModalOnOutsideClick: (data: boolean) => void;
    closeRegModal: () => void;
}


const formStyle = `lg:h-fit h-[80vh] overflow-y-auto px-7 pb-[2rem] pt-[2rem]`;
const h1Style = `font-[400] text-[25px] leading-[36.2px] font-[AvertaStd-Semibold] text-center text-ryd-subTextPrimary mb-[1rem]`;
const flexContainer = `w-full lg:flex grid gap-5 mb-[1rem]`;
const gridContainer = `w-full grid gap-1`;
const inputFieldStyle = `w-full bg-ryd-gray rounded-[16px] text-[14px] leading-[26px] font-[400] text-[#576877] px-[26px] py-[12px] outline-none active:outline-none`;
const labelStyle = `text-ryd-subTextPrimary font-[400] text-[13px] leading-[26px]`;
const legendStyle = 'mx-auto px-5 py-2 text-[11px] bg-amber-100 mt-3 rounded-[16px] mb-[1rem]';





export default function NewRegModal({ handleNext, setChildInfo, closeModalOnOutsideClick, closeRegModal }: Props) {
    const userInfo: any = useSelector((state:RootState) => state.auth.userInfo);
    const userService = new UserService();

    const [value, onChange] = useState<Value>(new Date());

    const [ formData, setFormData ] = useState(initialValues);
    const [ dayTime, setDayTime ] = useState<any>([]);
    const [ dayArr, setDayArr ] = useState<{ name: string; value: number; }[] | []>([]);
    const [ selectedDay, setSelectedDay ] = useState<{ name: string, value: number } | null>(null);
    const [ timeArr, setTimeArr ] = useState<{ name: string; value: number; }[] | []>([]);
    const  [ selectedTime, setSelectedTime ] = useState<{ name: string, value: number } | null>(null);
    const [ loading, setLoading ] = useState(false);


    // load all available days and their corresponding time for BE
    const getDayTime = async() => {
        try{
            const response = await userService.getDayTime();
            if(!response.status){
                toast.error(response.message)
                return;
            }
            setDayTime(response.data);
            // dispatch(setDayTimeInfo(response.data))

            let xdayArr = []
            if(response?.data?.length > 0){
                // extracted dayText and day values and saved them as 'name' and 'value' respectively for ease of use in the custom dropdown component
                for(let i=0; i < response.data.length; i++){
                    let name = response.data[i].dayText;
                    let value = response.data[i].day;
                    let dx = { name, value};
                    xdayArr.push(dx);
                }
                setDayArr(xdayArr);
            }
        }catch(err: any){
            toast.error(err?.message);
        }
        return false;
    };


    const handleDateChange = (e: any) => {
        const age = calculateAge(e);
        setFormData({...formData, age });
    }

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        if(!selectedDay || !selectedTime){
            toast.error('Date/Time is required!');
            return;
        }

        setLoading(true);
        try {
            const response = await userService.addChild(formData);
            setLoading(false);
            if(!response.status){
                toast.error(response.message);
                return;
            }
            const childData = { ...response.data, selectedDay, selectedTime };
            setChildInfo(childData);
            handleNext();
        }catch(err: any){
            setLoading(false);
            toast.error(err.mesage);
        }

        return false;
    };


    const keepModalOpen = () => {
        // if all these are unfilled or empty then closing modal by clicking outside is possible
        if(formData.firstName === '' && formData.lastName === '' && formData.age === 0 && selectedTime === null && selectedDay === null){
            closeModalOnOutsideClick(true)
        }else{
            closeModalOnOutsideClick(false)
        }
    }


    useEffect(() => {
        getDayTime();
        keepModalOpen();
    }, []);

    useEffect(() => {
        keepModalOpen();
    }, [formData])

    useEffect(() => {
        if(selectedDay){
            const timeX = dayTime?.filter((item: any) => item.dayText === selectedDay.name);
            const tdx = timeX[0].times;
            // extracted timeText and time values and saved them as 'name' and 'value' respectively for ease of use in the custom dropdown component
            let arr = []
            for(let i=0; i < tdx.length; i++){
                let name = tdx[i].timeText;
                let value = tdx[i].time;
                let _dy = { name, value };
                arr.push(_dy);
            }
            setTimeArr(arr)
        }
    }, [ selectedDay ]);

    const dateChange=(d: any)=>{
        console.log(d)
    }


    return (
        <form className={formStyle} onSubmit={handleSubmit}>

            <img src={closeIcon} alt="close" className='float-right relative -top-4 -right-3 hover:cursor-pointer' onClick={closeRegModal} />

            <h1 className={h1Style}>Register Child</h1>

            <div className={legendStyle}>Every child will adopt and use the parent's registered timezone and time-offset: <br />
            <span className='text-green-600'>{userInfo.timeOffset > 0 && '+' }&nbsp;&nbsp;{userInfo.timezone} ({userInfo?.timeOffset})</span> </div>

            {/* first name and last name  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>First name</label>
                    <CustomInput
                        type="text"
                        placeholder='John'
                        required={true}
                        onChange={(e: any) => setFormData({...formData, firstName: e.target.value })}
                        value={formData.firstName}
                    />
                </div>
                <div className={gridContainer}>
                    <label className={labelStyle}>Last name</label>
                    <CustomInput
                        type="text"
                        placeholder='Doe'
                        required={true}
                        onChange={(e: any) => setFormData({...formData, lastName: e.target.value })}
                        value={formData.lastName}
                    />
                </div>
            </div>

            {/* gender  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>Gender</label>
                    <GenderSelect
                        handleGenderChange={(item: string) => setFormData({...formData, gender: item })}
                        className={inputFieldStyle}
                    />
                </div>
                <div className={gridContainer}>
                    <label className={labelStyle}>Date of birth [{formData.age}]</label>
                    {/*<DatePicker onChange={handleDateChange} value={value} format={"yyyy-MM"} />*/}
                    <DateSelect
                        handleDateChange={handleDateChange}
                    />
                </div>
            </div>

            {/* available days  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>Lesson day</label>
                    <CustomDropdown
                        className={inputFieldStyle}
                        handleChange={(data: { name: string, value: number}) => setSelectedDay(data)}
                        data={dayArr}
                        />
                </div>
            </div>

            {/* available time  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>Lesson time</label>
                    <CustomDropdown
                        className={inputFieldStyle}
                        handleChange={(data: { name: string, value: number}) => setSelectedTime(data)}
                        data={timeArr}
                        />
                </div>
            </div>


            <Button
                text={loading ? 'Processing...' : 'Next'}
                isInverted={false}
                category='button'
                btnStyle='w-full rounded-[16px] border-0 mt-6 text-[16px] leading-[26px] font-[400] text-white px-[26px] py-[12px]'
            />

        </form>
    )
}
