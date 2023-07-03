 


import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import itemsSlice from './itemsSlice ';
import contentSlice from './contentSlice ';
import studentSlice from './studentSlice ';
 

const store = configureStore({
  reducer: {
    items: itemsSlice,
    content: contentSlice,
    student: studentSlice, // Add the student slice here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
