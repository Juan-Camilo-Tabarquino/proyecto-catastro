import { MainLayout } from '../Components/Layouts/MainLayout'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { localText } from '../translate';
import { usePropietariosStore } from '../Hooks';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function propietarios(){

  const { propietariosN, propietariosJ, startListProietariosN, startListProietariosJ, startDeletePropietario } = usePropietariosStore();

  const router = useRouter();

  const createPropietarioN = () =>{
    router.push('/propietarios/naturales/create-naturales');
  }

  const createPropietarioJ = () =>{
    router.push('/propietarios/juridicos/create-juridico');
  }

  const updatePropietarioN = (row) => (e) =>{
    e.preventDefault();
    router.push(`/propietarios/naturales/${row.id}`);
  }

  const updatePropietarioJ = (row) => (e) =>{
    e.preventDefault();
    router.push(`/propietarios/juridicos/${row.id}`);
  }

  const [id, setId] = useState();
    
  const MensajeConfirmacion = (row) => (e)=>{
    e.preventDefault();
    setId(row.id);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estás por borrar un proyecto, este no se podrá recuperar más adelante.",
      icon: "error",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Confirmar",
      }).then(async(res) => {
        try {
          await startDeletePropietario({id});
          Swal.fire('Eliminacion exitosa','se ha borrando exitosamente el propietario','success')  
        } catch (error) {
          Swal.fire('Ha ocuurido un errir','No se ha borrando exitosamente el propietario, intentelo mas tarde','error')  
        }
      });
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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
                onClick={updatePropietarioN(row)}
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
                onClick={MensajeConfirmacion(row)}
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
      <>

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
      </>
      )
}