import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContentState {
  content: string;
}

const initialState: ContentState = {
  content: '',
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const { setContent } = contentSlice.actions;

export default contentSlice.reducer;
