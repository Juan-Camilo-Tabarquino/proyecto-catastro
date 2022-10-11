import { SaveOutlined } from '@mui/icons-material'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { MainLayout } from '../../Components/Layouts/MainLayout'
import { useConstruccionesStore, useForm, usePrediosStore, useTerrenosStore } from '../../Hooks'


const nuevaContruccion = {
    num_pisos: '',
    area: '',
    direccion: '',
    tipo: '',
    predio: '',
}

export default function CreateConstrucciones (){

    const { num_pisos, area, direccion, tipo, predio, onInputChange} = useForm(nuevaContruccion);
    const { predios,startListPredios } = usePrediosStore();
    const { startCreateConstruccion } = useConstruccionesStore();
    
    const onSubmit = async(e) => {
        e.preventDefault();
        if( area < 0 || area.trim() === '' || num_pisos < 1 || num_pisos.trim() === '' || tipo.trim() === '' || direccion.trim() === '' || predio === 0 || predio === ""){
            Swal.fire('Error','Todos los campos son requeridos para crear un terreno.','error')
        }else{
            await startCreateConstruccion({num_pisos,area, direccion, tipo,predio})
        }
    }

    useEffect(() => {
     startListPredios();
    },[])

  return (
   <MainLayout>
    <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems='center'
        sx={{ 
            mb: 1, 
            width: '80%',      
        }}
    >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight="ligth"> Crear nueva Construccion </Typography>
        </Grid>
        <Grid item>
            <Button
                onClick={ onSubmit } 
                color="primary" 
                sx={{ padding: 2 }}
            >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                    Guardar
            </Button>
        </Grid>
        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese el numero de pisos de la construccion"
                label="Numero de Pisos"
                sx={{ border: 'none', mb: 1}}
                name="num_pisos"
                value={ num_pisos }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese el area de la construccion"
                label="Area en M2"
                name="area"
                value={ area }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese la direccion"
                label="Direccion de la construccion"
                name="direccion"
                value={ direccion }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese el tipo de la construccion"
                label="Tipo"
                name="tipo"
                value={ tipo }
                onChange={ onInputChange }
            />

            <Box  sx={{ minWidth: 500, mt: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Predio</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Predio"
                    name="predio"
                    value={predio}
                    onChange={onInputChange}
                    >
                    <MenuItem value={0}>Seleccione un predio</MenuItem>
                    {
                        predios.map((predio) => {
                            return <MenuItem key={predio.id} value={predio.id}>{predio.nombre}</MenuItem>
                        })
                    }
                    </Select>
                </FormControl>
            </Box>
        </Grid>
    </Grid>
   </MainLayout>
  )
}