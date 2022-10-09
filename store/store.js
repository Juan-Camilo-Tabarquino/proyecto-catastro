import { configureStore } from '@reduxjs/toolkit';
import { prediosSlice } from './';

export const store = configureStore({
    reducer:{
        predios: prediosSlice.reducer,
    },
})