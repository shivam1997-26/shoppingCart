// actions.js
import { addItem, decrementItem, incrementItem, removeItem } from './cartSlice';

export const addCartItem = (item) => (dispatch) => {
  dispatch(addItem(item));
};

export const removeCartItem = (itemId) => (dispatch) => {
  dispatch(removeItem(itemId));
};

export const incrementCartItem = (itemId) => (dispatch) => {
  dispatch(incrementItem({ id: itemId }));
};

export const decrementCartItem = (itemId) => (dispatch) => {
  dispatch(decrementItem({ id: itemId }));
};
