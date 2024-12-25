import { createSlice } from '@reduxjs/toolkit';

const loadCartItemsFromLocalStorage = () => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
};

const saveCartItemsToLocalStorage = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: loadCartItemsFromLocalStorage(),
    },
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
            saveCartItemsToLocalStorage(state.cartItems);
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            saveCartItemsToLocalStorage(state.cartItems);
        },
        updateItemQuantity: (state, action) => {
            const item = state.cartItems.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
            saveCartItemsToLocalStorage(state.cartItems);
        },
        clearCart: (state) => {
            state.cartItems = [];
            saveCartItemsToLocalStorage(state.cartItems);
        },
    },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state) => state.cart.cartItems;