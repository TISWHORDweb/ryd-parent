import React, { useEffect, useState } from 'react';
import { CustomModal, Empty } from '../../../components/ui';
import UserService from '../../../services/user.service';
import { toast } from 'react-toastify';
import { formatDate } from '../../../components/custom-hooks';
import RegSubModal from "./RegSubModal";
import {setCart, setRenewal, setResume} from "../../../redux/reducers/userSlice";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from '../../../redux/rootReducer';


const tableHeader = 'text-[15px] font-[400] leading-[26px] font-[AvertaStd-Semibold] text-ryd-headerTextPrimary';
const tableBody = 'text-[14px] font-[400] font-[AvertaStd-Light]  leading-[26px] text-[#616161]';
const attendanceBtnStyle = 'rounded-[7px] bg-green-600 py-2.5 px-2.5 text-white text-[11px] border-0';
const btnStyle = 'text-[10px] px-3 py-1 rounded-[8px] bg-white'

export default function RecentlyAddedSection() {
    const userInfo: any = useSelector((state: RootState) => state.auth.userInfo);
    const userService = new UserService();
    const dispatch = useDispatch()

    const [ childrenArr, setChildrenArr ] = useState([])
    const [ isRegComplete, setIsRegComplete ] = useState(false);
    const [ toggleDel, setToggleDel ] = useState(false);
    const [ togglePayModal, setTogglePayModal ] = useState(false);
    const [ selectedChild, setSelectedChild ] = useState<any>({});
    const [ loading, setLoading ] = useState(true);

    const handleRegResumption = (data: any) => {
        setSelectedChild(data);
        setTogglePayModal(true);
        dispatch(setResume(data));
    }

    useEffect(() => {
        if(selectedChild){
            if(selectedChild?.package?.length > 0){
                window.open(`https://api-pro.rydlearning.com/common/payment-init/${userInfo?.id}`,'_blank');
                dispatch(setResume(null));
            }
        }
    }, [selectedChild])

    const triggerDelete = (data: any) => {
        setSelectedChild(data);
        setToggleDel(true);
    }

    const handleChildDelete = async() => {
        setLoading(true);
        try{
           const response = await userService.deleteChild(selectedChild?.id);
           setLoading(false);
           if(!response.status){
            toast.error(response?.message);
            return;
           }
           toast.success(`${selectedChild?.firstName} has been deleted!`);
           getChildren();
           setToggleDel(false);
        }catch(err: any){
            setLoading(false);
            toast.error(err?.message);
            return
        }
    }

      const getChildren = async() => {
        try{
           const response = await userService.getAllChildren();
           if(!response.status){
            // toast.error(response.message);
            return;
           }
        //    setData(response.data)
            const res = response.data;
            setChildrenArr(res)
            setLoading(false);
        }catch(err: any){
            toast.error(err?.message);
            return;
        }
    }

    const handleClosePayModal = () => {
        setTogglePayModal(false)
        setSelectedChild({});
        dispatch(setCart(false))
        dispatch(setResume(null))
    }


    useEffect(() => {
        getChildren();
    }, []);




    return (
        loading ? <div className='h-[100px] w-[100px] rounded-full absolute left-[50%] top-[50%] border border-ryd-primary border-l-white animate-spin'></div> :
        <>
            <div className={`mt-[3rem] ${childrenArr?.length > 0 ? 'border-x border-x-[#F7F7F7] border-b border-b-[#F7F7F7]' : 'border-0'} md:w-full w-[700px] overflow-x-auto`}>
                { childrenArr?.length > 0 ?
                    <>
                        <ul>
                            <li className='w-full flex items-center p-3 rounded-t-[10px] bg-[#F7F7F7]'>
                                <p className={`${tableHeader} w-[20%]`}>First Name</p>
                                <p className={`${tableHeader} w-[20%]`}>Last Name</p>
                                <p className={`${tableHeader} w-[10%] `}>Age</p>
                                <p className={`${tableHeader} w-[15%] `}>Date Added</p>
                                <p className={`${tableHeader} w-[15%] `}>Reg. Status</p>
                                <p className={`${tableHeader} w-[20%] text-left`}>Action</p>
                            </li>
                        </ul>
                        <ol>
                        {childrenArr?.map((item: any, index: number) => {
                            return(
                                <li key={index} className={`w-full flex items-center p-3 ${index % 2 !== 0 ? 'bg-[#F7F7F7]' : 'bg-white'}`}>
                                    <p className={`${tableBody} w-[20%] capitalize`}>{item?.firstName}</p>
                                    <p className={`${tableBody} w-[20%] capitalize`}> {item?.lastName}</p>
                                    <p className={`${tableBody} w-[10%] `}>{item?.age}</p>
                                    <p className={`${tableBody} w-[15%] `}>{formatDate(item?.createdAt)}</p>
                                    <p className={`${tableBody} w-[15%] `}>{item?.programs?.length === 0 ? <span>Incomplete</span> : <span>Completed</span>}</p>
                                   {item?.programs?.length === 0 ?
                                        <p className={`${tableBody} w-[20%] flex items-left justify-left gap-x-4`}>
                                            <button
                                               onClick={() => handleRegResumption(item)}
                                               title='inactive: coming soon'
                                               className={`${btnStyle} border border-green-600 text-green-600 hover:bg-green-600 hover:text-white`}
                                               >
                                               Resume
                                            </button>
                                            <button
                                                onClick={() => triggerDelete(item)}
                                                className={`${btnStyle} border border-red-700 text-red-700 hover:bg-red-700 hover:text-white`}
                                                >
                                                Remove
                                            </button>
                                        </p> :
                                       <>
                                           <p className={`${tableBody} flex items-center justify-center gap-x-4`}>
                                               <button disabled={true}
                                                       className={`${btnStyle} border border-gray-200 text-gray-200`}>Done
                                               </button>
                                           </p>
                                           <p className={`${tableBody} flex items-center justify-center gap-x-4`} style={{marginLeft: 5}}>
                                               <button disabled={true}
                                                       className={`${btnStyle} border border-gray-200 text-gray-200`}>Get Certificate.
                                               </button>
                                           </p>
                                       </>
                                   }
                                </li>
                            )
                        })}
                        </ol>
                    </> :
                    <Empty text='You have no recent child record'/>
                }

            </div>

            {toggleDel &&
            <CustomModal
                modalStyle="relative bg-white lg:w-[25%] w-[80%] mx-auto rounded-[16px] lg:mt-[13rem] mt-[4rem]"
                closeModal={() => setToggleDel(false)}
                >
                <div className='p-[2rem]'>
                    <h2 className='text-[18px] text-center mb-5'>Are you sure you want to delete child?</h2>
                    <div className='flex items-center gap-x-5 text-[14px]'>
                        <button onClick={handleChildDelete}  className={`w-full px-5 py-3 border border-red-700 bg-red-700 text-white rounded-[8px]`}>{loading ? 'deleting...' : 'Yes, delete'}</button>
                        <button  onClick={() => setToggleDel(false)} className={`w-full px-5 py-3 border border-gray-200 bg-gray-200 text-black rounded-[8px]`}>No</button>
                    </div>
                </div>
            </CustomModal>
            }

            {/* {togglePayModal &&
                <CustomModal
                    modalStyle={`relative bg-white lg:w-[30%] lg:mt-[5rem] mt-[3rem] md:w-[70%] w-[95%] mx-auto rounded-[16px] `}
                    closeModal={handleClosePayModal}
                >
                    <RegSubModal
                        childInfo={selectedChild}
                        handlePrevious={handleClosePayModal}
                        isRenewing={false}
                        closeRegTab={handleClosePayModal}
                    />
                </CustomModal>
            } */}
        </>
    )
}
