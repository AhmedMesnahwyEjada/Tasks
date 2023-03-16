import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  months: [
    {
      id: 1,
      month: 1,
      year: 2023,
      expenses: [],
      totalSpent: 0,
    },
  ],
  histories: [
    {
      id: 1,
      history: [
        {
          details: '',
          amount: 0,
          date: 0,
        },
      ],
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
    createHistory: (state, action) => {
      state.histories = [
        ...(state.histories || []),
        {id: action.payload.id, history: []},
      ];
    },
    updateExpenses: (state, action) => {
      const monthIdx = state.months.findIndex(
        month => month.id === action.payload.id,
      );
      state.months[monthIdx].expenses = action.payload.expenses;
    },
    addHistory: (state, action) => {
      let historyIdx = state.histories.findIndex(
        history => history.id === action.payload.id,
      );
      if (historyIdx === -1) {
        createHistory(state, action);
        state.histories = [
          ...(state.histories || []),
          {id: action.payload.id, history: []},
        ];
        historyIdx = state.histories.findIndex(
          history => history.id === action.payload.id,
        );
      }
      state.histories[historyIdx].history.push(action.payload.history);
    },
    removeHistory: (state, action) => {
      state.histories = state.histories.filter(
        history => history.id !== action.payload.id,
      );
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
      state.histories = state.histories?.filter(
        history => !history.id.startsWith(String(action.payload.id)),
      );
    },
  },
});

export const {
  addMonth,
  removeMonth,
  updateExpenses,
  updateTotalSpent,
  createHistory,
  addHistory,
  removeHistory,
} = monthsSlice.actions;
export default monthsSlice.reducer;
