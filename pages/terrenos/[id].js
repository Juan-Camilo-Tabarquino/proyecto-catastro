import { SaveOutlined } from '@mui/icons-material'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { MainLayout } from '../../Components/Layouts/MainLayout'
import { useForm, usePrediosStore, useTerrenosStore } from '../../Hooks'

export default function CreateTerrenos (){
    const router = useRouter();
    const { terrenos ,startUpdateTerrenos } = useTerrenosStore();
    const terrenoActual = terrenos.find(terreno => terreno.id === router.query.id)
    const { area, valor_comercial, tipo, construcciones, fuentes_agua, predio, onInputChange} = useForm(terrenoActual);
    const { predios,startListPredios } = usePrediosStore();
    
    const onSubmit = async(e) => {
        e.preventDefault();
        if( area < 0 || valor_comercial < 0 || tipo.trim() === '' || construcciones.trim() === '' || fuentes_agua.trim() === '' || predio === 0 || predio === ""){
            Swal.fire('Error','Todos los campos son requeridos para crear un terreno.','error')
        }else{
            const id = router.query.id;
            await startUpdateTerrenos({id,area,valor_comercial,construcciones, fuentes_agua})
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
            <Typography fontSize={ 39 } fontWeight="ligth"> Actualizar Terreno </Typography>
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
                placeholder="Ingrese el numero predial"
                label="Area del Terreno en M2"
                sx={{ border: 'none', mb: 1}}
                name="area"
                value={ area }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese el avaluo del predio"
                label="Valor Comercial"
                name="valor_comercial"
                value={ valor_comercial }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese el departamento"
                label="Posee construciones"
                name="construcciones"
                value={ construcciones }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese el municipio"
                label="Posee fuentes de agua cerca"
                name="fuentes_agua"
                value={ fuentes_agua }
                onChange={ onInputChange }
            />
        </Grid>
    </Grid>
   </MainLayout>
  )
}