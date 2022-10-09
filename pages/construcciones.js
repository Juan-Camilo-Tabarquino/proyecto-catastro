import { MainLayout } from '../Components/Layouts/MainLayout'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { localText } from '../translate';

const columns = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'num_pisos', headerName: 'Numero de Pisos', flex: 1, minWidth: 200 },
    { field: 'are', headerName: 'Area en M2', flex: 1, minWidth:120 },
    { field: 'direccion', headerName: 'Direccion', flex: 1,minWidth: 120 },
    { field: 'tipo', headerName: 'Tipo', flex: 1,minWidth: 120 },
    { field: 'predioNumpredial', headerName: 'Numero predial', flex: 1,minWidth: 120 },
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
                onClick={handleUpdate(row)}
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

export default function construcciones(){
    return (
        <MainLayout>
            <h1> Informacion Construcciones </h1>
            <div style={{ height: 400, width: "100%" }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  headerHeight={56}
                  experimentalFeatures={{ lazyLoading: true }}
                  density='compact'
                  rows={0}
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