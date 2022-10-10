import { createSlice } from '@reduxjs/toolkit';

export const construccionesSlice = createSlice({
      name: 'construcciones',
      initialState:{
         construcciones: [],
      },
      reducers:{
            onListConstrucciones: (state,{ payload = [] }) =>{
              state.construcciones = payload;
            },
       }
})

export const { onListConstrucciones } = construccionesSlice.actions