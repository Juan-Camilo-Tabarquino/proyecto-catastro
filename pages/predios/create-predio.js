import { DeleteOutline, SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { MainLayout } from '../../Components/Layouts/MainLayout'

const nuevoPredio = {
    numero_predial: 0,
    avaluo: 0,
    nombre: '',
    departamento: '',
    municipio: '',
}

export default function CreatePredio (){
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
               // onClick={ onSaveNote } 
                //disabled={ isSaving }
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
            name="title"
            //value={ title }
            //onChange={ onInputChange }
            />

            <TextField
            type="text"
            variant="filled"
            fullWidth
            placeholder="Ingrese el avaluo del predio"
            label="Avaluo"
            name="body"
            //value={ body }
            //onChange={ onInputChange }
            />

            <TextField
            type="text"
            variant="filled"
            fullWidth
            placeholder="Ingrese el nombre del predio"
            label="Nombre"
            name="body"
            //value={ body }
            //onChange={ onInputChange }
            />

            <TextField
            type="text"
            variant="filled"
            fullWidth
            placeholder="Ingrese el departamento"
            label="Departamento"
            name="body"
            //value={ body }
            //onChange={ onInputChange }
            />

            <TextField
            type="text"
            variant="filled"
            fullWidth
            placeholder="Ingrese el municipio"
            label="Municipio"
            name="body"
            //value={ body }
            //onChange={ onInputChange }
            />

        </Grid>
    </Grid>
   </MainLayout>
  )
}
