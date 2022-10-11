import { SaveOutlined } from '@mui/icons-material'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { usePropietariosStore } from '../../../Hooks'
import { MainLayout } from '../../../Components/Layouts/MainLayout'
import { useForm, usePrediosStore } from '../../../Hooks'


const nuevoPropietario = {
    direccion: '',
    email: '',
    telefono: '',
    nit: '',
    razon_social: '',
    predio: '',
}

export default function CreatePropietarioJuridico (){

    const { direccion, email, telefono, nit, razon_social, predio, onInputChange} = useForm(nuevoPropietario);
    const { predios,startListPredios } = usePrediosStore();
    const { startCreatePropietarioJuridico } = usePropietariosStore();
    
    const onSubmit = async(e) => {
        e.preventDefault();
        if( nit < 0 || nit.trim() === '' || razon_social.trim() === '' || email.trim() === '' || telefono.trim() === '' || telefono < 0 || direccion.trim() === '' || predio === 0 || predio === ""){
            Swal.fire('Error','Todos los campos son requeridos para crear un terreno.','error');
        }else{
            await startCreatePropietarioJuridico({direccion,telefono,email,nit,razon_social,predio});
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
            <Typography fontSize={ 39 } fontWeight="ligth"> Crear nuevo Propietario Juridico </Typography>
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
                placeholder="Ingrese la direccion del propietario"
                label="Direccion"
                sx={{ border: 'none', mb: 1}}
                name="direccion"
                value={ direccion }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese el telefono del propietario"
                label="Telefono"
                name="telefono"
                value={ telefono }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese el correo del propietario"
                label="Ingrese al correo"
                name="email"
                value={ email }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese el tipo de la construccion"
                label="NIT"
                name="nit"
                value={ nit }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese la razon social del propietario"
                label="Razon Social"
                name="razon_social"
                value={ razon_social }
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