import { createSlice } from '@reduxjs/toolkit';

const loadCartItems = () => {
    const storedItems = localStorage.getItem('cart');
    return storedItems ? JSON.parse(storedItems) : [];
  };
  
  const initialState = {
    items: loadCartItems(),
  };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const itemToIncrement = state.items.find(item => item.id === action.payload.id);
            if (itemToIncrement) {
                itemToIncrement.quantity++;
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        incrementItem(state, action) {

            const { id } = action.payload;
            const itemToIncrement = state.items.find(item => item.id === id);
            if (itemToIncrement) {
                itemToIncrement.quantity++;
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        decrementItem(state, action) {

            const { id } = action.payload;
            const itemToDecrement = state.items.find(item => item.id === id);
            if (itemToDecrement && itemToDecrement.quantity > 1) {
                itemToDecrement.quantity--;
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
    },
});

export const { addItem, removeItem, incrementItem, decrementItem } = cartSlice.actions;
export default cartSlice.reducer;
