import { MainLayout } from '../Components/Layouts/MainLayout'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { localText } from '../translate';
import { useTerrenosStore } from '../Hooks';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

export default function terrenos(){

  const { terrenos ,startListTerrenos, startDeleteTerreno } = useTerrenosStore();
  const router = useRouter();

  const createTerreno = () => {
    router.push('/terrenos/create-terrenos')
  }

  const updateTerreno = (row) => (e) => {
    e.preventDefault();
    router.push(`/terrenos/${row.id}`)
  }

  const [id, setId] = useState();
    
  const MensajeConfirmacion = (row) => (e)=>{
    e.preventDefault();
    setId(row.id);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Seguro que desea eleminar el terreno?",
      icon: "error",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Confirmar",
      }).then(async(res) => {
        try {
          await startDeleteTerreno({id});
          Swal.fire('Eliminacion exitosa','se ha borrando exitosamente el propietario','success')  
        } catch (error) {
          Swal.fire('Ha ocuurido un errir','No se ha borrando exitosamente el propietario, intentelo mas tarde','error')  
        }
      });
  }

  const columns = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'area', headerName: 'Area en M2', flex: 1, minWidth: 200 },
    { field: 'valor_comercial', headerName: 'Valor Comercial', flex: 1, minWidth:120 },
    { field: 'tipo', headerName: 'Tipo', flex: 1,minWidth: 120 },
    { field: 'construcciones', headerName: 'Construcciones', flex: 1,minWidth: 120 },
    { field: 'fuentes_agua', headerName: 'Fuentes de Agua', flex: 1,minWidth: 120 },
    { field: 'predio', headerName: 'Numero Predial', flex: 1,minWidth: 120 },
    {
      field: 'action',
      headerName: 'Acciones',
      type: 'actions',
      flex: 1,
      minWidth: 150,
      cellClassName: 'actions',
        getActions: ({ row }) => {
          return [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={updateTerreno(row)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={MensajeConfirmacion(row)}
                color="inherit"
              />,
            ];
        }
    }
  ];

  useEffect(()=>{
    startListTerrenos();
  },[])

    return (
      <MainLayout>
        <h1> Lista Terrenos </h1>
        <Button
            onClick={ createTerreno } 
            color="primary" 
            sx={{ padding: 2 }}
        >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Crear Nuevo Terreno
        </Button>
        <div style={{ height: 400, width: "100%" }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  headerHeight={56}
                  experimentalFeatures={{ lazyLoading: true }}
                  density='compact'
                  rows={terrenos}
                  columns={columns}
                  pageSize={8}
                  rowsPerPageOptions={[8]}
                  localeText ={ localText }
                />
              </div>
            </div>
        </div>
      </MainLayout>
      )
}