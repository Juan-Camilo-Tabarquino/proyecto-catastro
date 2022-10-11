import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import Router from 'next/router'
import React from 'react'
import { MainLayout } from '../../Components/Layouts/MainLayout'
import { useForm, usePrediosStore } from '../../Hooks'


const nuevoPredio = {
    numero_predial: '',
    avaluo: '',
    nombre: '',
    departamento: '',
    municipio: '',
}

export default function CreatePredio (){

    const { numero_predial, avaluo, nombre, departamento, municipio, onInputChange} = useForm(nuevoPredio);
    const { startCreatePredios } = usePrediosStore();
    
    const onSubmit = async(e) => {
        e.preventDefault();
        
        if( numero_predial < 0 || avaluo < 0 || nombre.trim() === '' || departamento.trim() === '' || municipio.trim() === ''){
            console.log('Ingrese datos')
        }else{
            await startCreatePredios({numero_predial,avaluo,nombre,departamento,municipio})
            console.log(numero_predial,avaluo,nombre,departamento,municipio);
        }
    }

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
            <Typography fontSize={ 39 } fontWeight="ligth"> Crear nuevo Predio </Typography>
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
                label="Numero Predial"
                sx={{ border: 'none', mb: 1}}
                name="numero_predial"
                value={ numero_predial }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese el avaluo del predio"
                label="Avaluo"
                name="avaluo"
                value={ avaluo }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese el nombre del predio"
                label="Nombre"
                name="nombre"
                value={ nombre }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese el departamento"
                label="Departamento"
                name="departamento"
                value={ departamento }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese el municipio"
                label="Municipio"
                name="municipio"
                value={ municipio }
                onChange={ onInputChange }
            />

        </Grid>
    </Grid>
   </MainLayout>
  )
}
