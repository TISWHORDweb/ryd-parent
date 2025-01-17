import React, { useEffect, useState } from 'react';
import { Button, } from '../../../components/ui';
import CustomDropdown from '../../../components/ui/CustomDropdown';
import { toast } from 'react-toastify';
import UserService from '../../../services/user.service';
import closeIcon from "../../../assets/icons/closeIcon.svg";

export interface ChildRegProps {
}

const initialValues = {
}

interface Props {
    handleNext: () => void;
    setChildInfo: (_arg1: number, _arg2: number, _cohortId: number) => void;
    closeModalOnOutsideClick: (data: boolean) => void;
    closeRegTab: () => void;
}


const formStyle = `h-fit overflow-y-auto px-7 pb-[2rem] pt-[2rem]`;
const h1Style = `font-[400] text-[25px] leading-[36.2px] font-[AvertaStd-Semibold] text-center text-ryd-subTextPrimary mb-[1rem]`;
const flexContainer = `w-full lg:flex grid gap-5 mb-[1rem]`;
const gridContainer = `w-full grid gap-1`;
const inputFieldStyle = `w-full bg-ryd-gray rounded-[16px] text-[14px] leading-[26px] font-[400] text-[#576877] px-[26px] py-[12px] outline-none active:outline-none`;
const labelStyle = `text-ryd-subTextPrimary font-[400] text-[13px] leading-[26px]`;
// const legendStyle = 'mx-auto px-5 py-2 text-[11px] bg-amber-100 mt-3 rounded-[16px] mb-[1rem]';




export default function RegRenewalModal({ handleNext, setChildInfo, closeModalOnOutsideClick, closeRegTab }: Props) {
    // const userInfo: any = useSelector((state:RootState) => state.auth.userInfo);
    const userService = new UserService();

    const [ formData, setFormData ] = useState(initialValues);
    const [ dayTime, setDayTime ] = useState<any>([]);
    const [ dayArr, setDayArr ] = useState<{ name: string; value: number; }[] | []>([]);
    const [ timeArr, setTimeArr ] = useState<{ name: string; value: number; }[] | []>([]);
    const [ cohortId, setCohortId ] = useState(0);
    const [ cohortArr, setCohortArr ] = useState<{ name: string; value: number; }[] | []>([]);

    const  [ selectedTime, setSelectedTime ] = useState<{ name: string, value: number } | null>(null);
    const [ selectedDay, setSelectedDay ] = useState<{ name: string, value: number } | null>(null);
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

            const responseCohort = await userService.getCohort()
            if(!responseCohort.status){
                toast.error(responseCohort.message)
                return;
            }
            setCohortArr(responseCohort.data);
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



    const handleSubmit = async(e: any) => {
        e.preventDefault();
        if(!selectedDay || !selectedTime || !cohortId){
            toast.error('Date or time or cohort is required!');
            return;
        }

        setChildInfo(selectedDay.value, selectedTime.value, cohortId)
        // console.log('from renew', selectedDay, selectedTime)
        handleNext();
    };


    const keepModalOpen = () => {
        // if all these are unfilled or empty then closing modal by clicking outside is possible
        if(selectedTime === null && selectedDay === null){
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



    return (
        <form className={formStyle} onSubmit={handleSubmit}>

            <img src={closeIcon} alt="close" className='float-right relative -top-4 -right-3 hover:cursor-pointer' onClick={closeRegTab} />

            <h1 className={h1Style}>Child Registration</h1>

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

            {/* available cohort  */}
            <div className={flexContainer}>
                <div className={gridContainer}>
                    <label className={labelStyle}>Choose Cohort</label>
                    <select className={inputFieldStyle} onChange={(e: any) => {
                        setCohortId(Number(e.target.value))
                    }}>
                        <option value={0}>--Choose Cohort--</option>
                        {cohortArr && cohortArr.map((d: any, i: number) => <option key={i} value={d.id}>{d.title}</option>)}
                    </select>
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
