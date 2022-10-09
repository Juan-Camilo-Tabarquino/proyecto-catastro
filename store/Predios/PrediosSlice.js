import { createSlice } from '@reduxjs/toolkit';

export const prediosSlice = createSlice({
      name: 'predios',
      initialState:{
         predios: [],
      },
      reducers:{
            onListPredios: (state, { payload = [] }) =>{
              state.predios = payload;
            },
       }
})

export const { onListPredios } = prediosSlice.actions