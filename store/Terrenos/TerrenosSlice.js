import { createSlice } from '@reduxjs/toolkit';

export const terrenosSlice = createSlice({
      name: 'terrenos',
      initialState:{
         terrenos: [],
      },
      reducers:{
            onListTerrenos: (state, { payload = [] }) =>{
              state.terrenos = payload;
            },
       }
})

export const { onListTerrenos } = terrenosSlice.actions