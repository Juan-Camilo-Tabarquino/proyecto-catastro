import { MainLayout } from '../Components/Layouts/MainLayout'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { localText } from '../translate';
import { usePropietariosStore } from '../Hooks';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';

export default function propietarios(){

  const { propietariosN, propietariosJ, startListProietariosN, startListProietariosJ } = usePropietariosStore();

  const router = useRouter();

  const createPropietarioN = () =>{
    router.push('/propietarios/naturales/create-naturales');
  }

  const createPropietarioJ = () =>{
    router.push('/propietarios/juridicos/create-juridico');
  }

  const updatePropietarioN = () =>{
    router.push('/propietarios/naturales/create-naturales');
  }

  const updatePropietarioJ = (row) => (e) =>{
    e.preventDefault();
    console.log(row)
    router.push(`/propietarios/juridicos/${row.id}`);
  }

  const columns = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'direccion', headerName: 'Direccion', flex: 1, minWidth:120 },
    { field: 'email', headerName: 'Correo', flex: 1, minWidth: 200 },
    { field: 'telefono', headerName: 'Telefono', flex: 1,minWidth: 120 },
    { field: 'tipo_documento', headerName: 'Tipo de documento', flex: 1,minWidth: 120 },
    { field: 'numero_documento', headerName: 'Numero de Documento', flex: 1,minWidth: 120 },
    { field: 'nombre', headerName: 'Nombres', flex: 1,minWidth: 120 },
    { field: 'apellidos', headerName: 'Apellidos', flex: 1,minWidth: 120 },
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

const columns2 = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'direccion', headerName: 'Direccion', flex: 1, minWidth:120 },
    { field: 'email', headerName: 'Correo', flex: 1, minWidth: 200 },
    { field: 'telefono', headerName: 'Telefono', flex: 1,minWidth: 120 },
    { field: 'nit', headerName: 'NIT', flex: 1,minWidth: 120 },
    { field: 'razon_social', headerName: 'Razon social', flex: 1,minWidth: 120 },
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
                onClick={updatePropietarioJ(row)}
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



  useEffect(() => {
    startListProietariosN();
    startListProietariosJ();
  },[])

    return (
        <MainLayout>
            <h1> Lista Propietarios (Personas Naturales) </h1>
            <Button
            onClick={ createPropietarioN } 
            color="primary" 
            sx={{ padding: 2 }}
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Crear Nuevo Propietario Natural
            </Button>
            <div style={{ height: 400, width: "100%" }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  headerHeight={56}
                  experimentalFeatures={{ lazyLoading: true }}
                  density='compact'
                  rows={propietariosN}
                  columns={columns}
                  pageSize={8}
                  rowsPerPageOptions={[8]}
                  localeText ={ localText }
                />
              </div>
            </div>
            </div>
            <h1> Lista Propietarios (Personas Juridicas) </h1>
            <Button
            onClick={ createPropietarioJ } 
            color="primary" 
            sx={{ padding: 2 }}
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Crear Nuevo Propietario Juridico
            </Button>
            <div style={{ height: 400, width: "100%" }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  headerHeight={56}
                  experimentalFeatures={{ lazyLoading: true }}
                  density='compact'
                  rows={propietariosJ}
                  columns={columns2}
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