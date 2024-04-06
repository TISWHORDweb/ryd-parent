import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TimeProps } from "./_model";

interface DayTimeProps {
  dayTimeInfo: TimeProps | [];
  currency: any,
  cart: boolean,
  child: any,
}

const initialState: DayTimeProps = {
    dayTimeInfo: [],
    currency: {},
    cart: false,
    child: null,
};

const userSlice = createSlice({
  name: "timeDay",
  initialState,
  reducers: {
    setDayTimeInfo: (
      state: any,
      action: PayloadAction<{ dayTimeInfo: any,  }>,
    ) => {
      state.dayTimeInfo = action?.payload;
    },

    setCurrency: ( state: any, action: PayloadAction<{ currency: string }>) => {
      state.currency = action?.payload
    },
    setRenewal: ( state: any, action: PayloadAction<any>) => {
      state.child = action?.payload;
    },
    setCart: (state: any, action: PayloadAction<boolean>) => {
      state.cart = action?.payload
    }
  },
});

export const { setDayTimeInfo, setCurrency, setCart, setRenewal } = userSlice.actions;
export default userSlice.reducer;
