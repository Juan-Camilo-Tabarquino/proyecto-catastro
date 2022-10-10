import { createSlice } from '@reduxjs/toolkit';

export const propietariosSlice = createSlice({
      name: 'propietarios',
      initialState:{
         propietariosJ: [],
         propietariosN: [],
      },
      reducers:{
            onListPropietariosJ: (state, { payload = [] }) =>{
              state.propietariosJ = payload;
            },
            onListPropietariosN: (state, { payload = [] }) =>{
              state.propietariosN = payload;
            },
       }
})

export const { onListPropietariosJ, onListPropietariosN } = propietariosSlice.actions