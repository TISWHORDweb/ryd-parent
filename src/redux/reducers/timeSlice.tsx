import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TimeProps } from "./_model";

interface DayTimeProps {
  dayTimeInfo: TimeProps | [];
}

const initialState: DayTimeProps = {
    dayTimeInfo: [],
};

const dayTimeSlice = createSlice({
  name: "timeDay",
  initialState,
  reducers: {
    setDayTimeInfo: (
      state: any,
      action: PayloadAction<{ userInfo: any, isLoggedIn: boolean }>,
    ) => {
      state.dayTimeInfo = action?.payload;
    },
  },
});

export const { setDayTimeInfo } = dayTimeSlice.actions;
export default dayTimeSlice.reducer;
