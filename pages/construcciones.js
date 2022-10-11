import { MainLayout } from '../Components/Layouts/MainLayout'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { localText } from '../translate';
import { useConstruccionesStore } from '../Hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';

const columns = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'num_pisos', headerName: 'Numero de Pisos', flex: 1, minWidth: 200 },
    { field: 'area', headerName: 'Area en M2', flex: 1, minWidth:120 },
    { field: 'direccion', headerName: 'Direccion', flex: 1,minWidth: 120 },
    { field: 'tipo', headerName: 'Tipo', flex: 1,minWidth: 120 },
    { field: 'predio', headerName: 'Numero predial', flex: 1,minWidth: 120 },
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
                //onClick={handleUpdate(row)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                //onClick={MensajeConfirmacion(row)}
                color="inherit"
              />,
            ];
        }
    }
];

export default function construcciones(){

  const { construcciones, startListConstrucciones } = useConstruccionesStore();
  const router = useRouter();

  const createConstruccion = () => {
    router.push('/construcciones/create-construcciones');
  }

  useEffect(()=>{
    startListConstrucciones();
  },[])

    return (
        <MainLayout>
            <h1> Lista Construcciones </h1>
            <Button
            onClick={ createConstruccion } 
            color="primary" 
            sx={{ padding: 2 }}
        >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Crear Nueva Construccion
        </Button>
            <div style={{ height: 400, width: "100%" }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  headerHeight={56}
                  experimentalFeatures={{ lazyLoading: true }}
                  density='compact'
                  rows={construcciones}
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