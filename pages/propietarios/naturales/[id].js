import { SaveOutlined } from '@mui/icons-material'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { usePropietariosStore } from '../../../Hooks'
import { MainLayout } from '../../../Components/Layouts/MainLayout'
import { useForm, usePrediosStore } from '../../../Hooks'
import { useRouter } from 'next/router'


const nuevoPropietario = {
    direccion: '',
    email: '',
    telefono: '',
    tipo_documento: '',
    numero_documento: '',
    nombre: '',
    apellidos: '',
    predio: '',
}

export default function CreatePropietarioNatural (){
    const router = useRouter();
    const { predios,startListPredios } = usePrediosStore();
    const { propietariosN, startUpdatePropietarioN, startListProietariosN } = usePropietariosStore();
    const propietarioActual = propietariosN.find(propietario => propietario.id === router.query.id);
    const { direccion, email, telefono, tipo_documento, numero_documento, nombre, apellidos, predio, onInputChange} = useForm(propietarioActual);
    
    const onSubmit = async(e) => {
        e.preventDefault();
        if( numero_documento < 0 || nombre.trim() === '' || tipo_documento.trim() === '' || apellidos.trim() === ''  || email.trim() === ''|| telefono < 0 || direccion.trim() === '' || predio === 0 || predio === ""){
            Swal.fire('Error','Todos los campos son requeridos para crear un terreno.','error');
        }else{
            const id = parseInt(router.query.id);
            await startUpdatePropietarioN({id,direccion,telefono,email,tipo_documento,numero_documento,nombre,apellidos,predio});
        }
    }

    useEffect(() => {
     startListPredios();
     startListProietariosN();
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
            <Typography fontSize={ 39 } fontWeight="ligth"> Crear nuevo Propietario Natural </Typography>
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
                placeholder="Ingrese el tipo de documento"
                label="Tipo de documento"
                name="tipo_documento"
                value={ tipo_documento }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese el numero del documento"
                label="Numero de documento"
                name="numero_documento"
                value={ numero_documento }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese los nombres del propietario"
                label="Nombres"
                name="nombre"
                value={ nombre }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese los apellidos del propietario"
                label="Apellidos"
                name="apellidos"
                value={ apellidos }
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