import { createSlice, PayloadAction, ThunkAction, Action } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Item {
  id: number;
  name: string;
  description: string;
}

interface ItemsState {
  items: Item[];
  content: string;
}

const initialState: ItemsState = {
  items: [],
  content: '',
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<{ id: number; updatedItem: Partial<Item> }>) => {
      const { id, updatedItem } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        state.items[itemIndex] = { ...state.items[itemIndex], ...updatedItem };
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const { setItems, addItem, updateItem, deleteItem, setContent } = itemsSlice.actions;

export const fetchItems = (): ThunkAction<void, RootState, unknown, Action<string>> => dispatch => {
  const dummyItems: Item[] = [
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
    { id: 3, name: 'Item 3', description: 'Description 3' },
  ];

  dispatch(setItems(dummyItems));
};

export default itemsSlice.reducer;

