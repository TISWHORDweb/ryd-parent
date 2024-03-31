import { useEffect, useState } from "react";
import {
    GetCountries,
  } from "react-country-state-city";



export default function CountrySelectInput({ handleCountryChange, className }) {
  const [ countries, setCountries ] = useState([]);
  const [ selectedCountry, setSelectedCountry ] = useState({});
  const [ toggle, setToggle ] = useState(false);
  const boxStyle = 'relative';

  useEffect(() => {
    GetCountries().then((result) => {
      setCountries(result);
      setSelectedCountry(result[0]);
    });
  },[])


  return (
    <div className={`${boxStyle}`}>
      <div
        className={`${className} hover:cursor-pointer`}
        onClick={() => setToggle(prevState => !prevState)}
      >
        {selectedCountry.name}
      </div>
      {toggle &&
        <div className="h-[30vh] z-20 overflow-y-auto absolute top-3 w-full shadow bg-white text-ryd-subTextPrimary text-[16px]">
          {countries.length > 0 && countries.map((item, index) => (
            <div key={index} 
              className="hover:bg-ryd-gray px-4 py-1 hover:cursor-pointer" 
              onClick={() => {
                setSelectedCountry(item);
                setToggle(false)
                handleCountryChange(item);
                }}>
              {item.name}
            </div>
          ))}
        </div>
      }
    </div>
  )
}


          // const country = stateList[e.target.value]; 
          // setCountryid(country.id);
          // GetState(country.id).then((result) => {
          //   setStateList(result);
          // });
          // value={country.id}