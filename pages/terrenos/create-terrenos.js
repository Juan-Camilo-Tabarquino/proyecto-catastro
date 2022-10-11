import { SaveOutlined } from '@mui/icons-material'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { MainLayout } from '../../Components/Layouts/MainLayout'
import { useForm, usePrediosStore, useTerrenosStore } from '../../Hooks'


const nuevoTerreno = {
    area: '',
    valor_comercial: '',
    tipo: '',
    construcciones: '',
    fuentes_agua: '',
    predio: '',
}

export default function CreateTerrenos (){

    const { area, valor_comercial, tipo, construcciones, fuentes_agua, predio, onInputChange} = useForm(nuevoTerreno);
    const { predios,startListPredios } = usePrediosStore();
    const { startCreateTerrenos } = useTerrenosStore();
    
    const onSubmit = async(e) => {
        e.preventDefault();
        if( area < 0 || valor_comercial < 0 || tipo.trim() === '' || construcciones.trim() === '' || fuentes_agua.trim() === '' || predio === 0 || predio === ""){
            Swal.fire('Error','Todos los campos son requeridos para crear un terreno.','error')
        }else{
            await startCreateTerrenos({area,valor_comercial,tipo,construcciones, fuentes_agua, predio})
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
            <Typography fontSize={ 39 } fontWeight="ligth"> Crear nuevo Terreno </Typography>
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
                placeholder="Ingrese el nombre del predio"
                label="Tipo"
                name="tipo"
                value={ tipo }
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