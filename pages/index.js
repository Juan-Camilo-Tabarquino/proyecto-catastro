import { MainLayout } from '../Components/Layouts/MainLayout'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { localText } from '../translate';
import { usePrediosStore }  from '../Hooks'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';

const columns = [
    { field: 'id', headerName: 'id', hide: true},
    { field: 'numero_predial', headerName: 'Numero Predial', flex: 1, with:60},
    { field: 'avaluo', headerName: 'Avaluo', flex: 1, minWidth: 200 },
    { field: 'nombre', headerName: 'Nombre', flex: 1, minWidth:120 },
    { field: 'departamento', headerName: 'Departamento', flex: 1,minWidth: 120 },
    { field: 'municipio', headerName: 'Municipio', flex: 1,minWidth: 120 },
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


export default function Home() {

  const { predios, startListPredios } = usePrediosStore();
  const router = useRouter();
  const createPredio = async() => {
    router.push('/predios/create-predio');
  }

  useEffect(() => {
    startListPredios();
  },[])

  return (
    <MainLayout>
      <h1>Lista Predios</h1>
      <Button
            onClick={ createPredio } 
            color="primary" 
            sx={{ padding: 2 }}
        >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Crear Nuevo Predio
      </Button>
      <div style={{ height: 400, width: "100%" }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  headerHeight={56}
                  experimentalFeatures={{ lazyLoading: true }}
                  density='compact'
                  rows={predios}
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
