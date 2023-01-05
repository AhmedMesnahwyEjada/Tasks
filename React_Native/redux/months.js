import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  months: [
    {
      id: 1,
      month: 1,
      year: 2023,
      expenses: [],
      totalSpent: 100,
    },
  ],
};

export const monthsSlice = createSlice({
  name: 'months',
  initialState,
  reducers: {
    addMonth: (state, action) => {
      const maxId = Math.max(
        ...(state.months || []).map(month => {
          return month.id;
        }),
        0,
      );
      state.months = [
        ...(state?.months || []),
        {
          id: maxId + 1,
          month: action.payload.month,
          year: action.payload.year,
          expenses: [],
          totalSpent: 0,
        },
      ];
    },
    updateExpenses: (state, action) => {
      const monthIdx = state.months.findIndex(
        month => month.id === action.payload.id,
      );
      state.months[monthIdx].expenses = action.payload.expenses;
    },
    updateTotalSpent: (state, action) => {
      const monthIdx = state.months.findIndex(
        month => month.id === action.payload.id,
      );
      state.months[monthIdx].totalSpent = action.payload.totalSpent;
    },
    removeMonth: (state, action) => {
      state.months = state.months.filter(
        month => month.id !== action.payload.id,
      );
    },
  },
});

export const {addMonth, removeMonth, updateExpenses, updateTotalSpent} =
  monthsSlice.actions;
export default monthsSlice.reducer;
