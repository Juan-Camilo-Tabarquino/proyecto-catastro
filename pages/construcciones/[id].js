import { SaveOutlined } from '@mui/icons-material'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { MainLayout } from '../../Components/Layouts/MainLayout'
import { useConstruccionesStore, useForm, usePrediosStore, useTerrenosStore } from '../../Hooks'

export default function CreateConstrucciones (){

    const router = useRouter();
    const { construcciones ,startUpadteConstruccion, startListConstrucciones } = useConstruccionesStore();
    const construccionActual = construcciones.find(construccion => construccion.id === router.query.id)
    const { num_pisos, area, direccion, tipo, onInputChange} = useForm(construccionActual);
    const { predios,startListPredios } = usePrediosStore();
    
    const onSubmit = async(e) => {
        e.preventDefault();
        if( area < 0 || num_pisos < 1 || tipo.trim() === '' || direccion.trim() === ''){
            Swal.fire('Error','Todos los campos son requeridos para crear un terreno.','error')
        }else{
            const id = router.query.id;
            await startUpadteConstruccion({id,num_pisos,area, direccion, tipo})
        }
    }

    useEffect(() => {
     startListConstrucciones();
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
        </Grid>
    </Grid>
   </MainLayout>
  )
}