import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import Swal from 'sweetalert2'
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
    const router = useRouter();
    const { predios, startUpdatePredio } = usePrediosStore();
    const predioActual = predios.find(predio => predio.id === router.query.id );
    const { avaluo, nombre, onInputChange} = useForm(predioActual);
    
    const onSubmit = async(e) => {
        e.preventDefault();
        
        if( avaluo < 0 || nombre.trim() === ''){
            Swal.fire('Error','Todos los campos son requeridos para crear un predio.','error')
        }else{
            const id = router.query.id;
            await startUpdatePredio({id,avaluo,nombre})
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
            <Typography fontSize={ 39 } fontWeight="ligth"> Actualizar Predio </Typography>
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
        </Grid>
    </Grid>
   </MainLayout>
  )
}
