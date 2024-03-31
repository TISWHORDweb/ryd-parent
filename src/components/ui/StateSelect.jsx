import { useEffect, useState } from "react";
import {
  GetState,
} from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";



export default function StateSelectInput({ country, handleStateChange, className }) {
  const [ stateList, setStateList ] = useState([]);
  const [ selectedState, setSelectedState ] = useState({});
  const [ toggle, setToggle ] = useState(false);
  const boxStyle = `relative`;

  useEffect(() => {
    const idx = country ? country.id : 1;

    GetState(idx).then((result) => {
      setStateList(result);
      setSelectedState(result[0]);
      // console.log('state', result)
    });
  }, [country])

  return (
    <div className={`${boxStyle}`}>
      <div
        className={`${className} hover:cursor-pointer`}
        onClick={() => setToggle(prevState => !prevState)}
      >
        {selectedState?.name}
      </div>
      {toggle &&
        <div className="h-[30vh] overflow-y-auto absolute top-3 w-full shadow bg-white text-ryd-subTextPrimary text-[18px]">
          {stateList.length > 0 ? 
            stateList.map((item, index) => (
              <div key={index} 
                className="hover:bg-ryd-gray px-4 py-1 hover:cursor-pointer" 
                onClick={() => {
                  setSelectedState(item);
                  setToggle(false)
                  handleStateChange(item)
                  }}>
                {item?.name}
              </div>
            )) :
            <p className="text-center mt-[15%]">No available state</p>
          }
        </div>
      }
    </div>
  )
}