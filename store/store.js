import { configureStore } from '@reduxjs/toolkit';
import { prediosSlice, terrenosSlice, construccionesSlice, propietariosSlice } from './';

export const store = configureStore({
    reducer:{
        predios: prediosSlice.reducer,
        terrenos: terrenosSlice.reducer,
        construcciones: construccionesSlice.reducer,
        propietarios: propietariosSlice.reducer,
    },
})