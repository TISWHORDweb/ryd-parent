import { useEffect, useState } from 'react';
import { Button, Empty, ProgramCard } from '../../../components/ui';
import UserService from '../../../services/user.service';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';

interface Props {
    handlePrevious: () => void,
    childInfo: any;
    setSuccessModal: () => void, 
    closeRegTab: () => void
}

export default function RegSubModal({ childInfo, handlePrevious, setSuccessModal, closeRegTab }: Props) {
    const userInfo: any = useSelector((state: RootState) => state.auth.userInfo);
    const userService = new UserService();

    const [ selected, setSelected ] = useState<any>(null);
    const [ programArr, setProgramArr ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ submitLoading, setSubmitLoading ] = useState(false);

    useEffect(() => {
        getPackages();
    }, [])

    const getPackages = async() => {
        setLoading(true);
        try{
            const response = await userService.getAllPackages();
            setLoading(false);
            if(!response.status){
                toast.error(response.message)
                return;
            }
            // filter programs based on student age; compare child age to viable age range  
            const programFilter = response.data.filter((item: any) => (item.minAge <= childInfo.age) && (item.maxAge >= childInfo.age))
            setProgramArr(programFilter);
        }catch(err: any){
            setLoading(false)
            toast.error(err?.message);
            return;
        }
        return false;
    };

    const handleSubmit = async() => {
        if(selected){
            console.log(selected)
            const packageId = selected;
            const timeOffset = userInfo.timeOffset;
            const day = childInfo.selectedDay.value;
            const time = childInfo.selectedTime.value;
            const childId = childInfo.id;
            const payload = { packageId, timeOffset, day, time }

            setSubmitLoading(true);
            try{
                const response = await userService.addProgram( payload, childId );
                setSubmitLoading(false);
                if(!response.status){
                    toast.error(response.message);
                    return
                }
                setSuccessModal();
                closeRegTab()

            }catch(err: any){
                setSubmitLoading(false);
                toast.error(err.message);
            }
        }
        return false;
    }

    const divStyle = `lg:h-[75vh] h-[90vh] overflow-y-auto px-7 pb-[2rem] pt-[2rem]`;
    const h1Style = `font-[400] text-[25px] leading-[36.2px] font-[AvertaStd-Semibold] text-center text-ryd-subTextPrimary mb-[2rem]`;

    const disabled = !selected ? true : false;

    return (
        <div className={divStyle}>    
            <h1 className={h1Style}>Select a program</h1>

            <div className='grid lg:grid-cols-2 grid-cols-1 gap-7 mx-auto'>
                {programArr.length > 0 ?
                <> {programArr.map((item: any) => (
                    <ProgramCard 
                        setSelected={(data) => setSelected(data)}
                        selected={selected}
                        id={item.id}
                        key={item.id}
                        price={item.amount}
                        program={item.title}
                        description={item.description}
                    />
                ))} </> : <Empty text="There is no available package for this Age group" />
                }
            </div>       

            <div className='grid lg:gap-3 gap-4 lg:grid-cols-3 grid-cols-1 mt-[4rem]'>
                <div className="col-span-1">
                    <Button 
                        text='Previous'
                        isInverted={true}
                        category='button'
                        handleClick={handlePrevious}
                        btnStyle='w-full rounded-[16px] text-[16px] leading-[26px] font-[400] text-ryd-primary border border-ryd-primary px-[26px] py-[15px]'
                    />
                </div>
                <div className="lg:col-span-2 col-span-1">
                    <Button 
                        text={submitLoading ? 'Processing...' : 'Submit'}
                        isInverted={false}
                        category='button'
                        disabled={disabled}
                        handleClick={handleSubmit}
                        btnStyle='w-full border rounded-[16px] border-0 text-[16px] leading-[26px] font-[400] text-white px-[26px] py-[15px]'
                    />
                </div>
            </div>
        </div>
    )
}
