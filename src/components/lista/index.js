import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Fab, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { PersonAddAlt1, PersonRemove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { eliminarEmpleado } from '../../store/empleadosSlice/slice';

const Lista = () => {
    // ======= HOOOKS ===========
    const {empleados} = useSelector(state => state.empleados);
    const [deleteList, setDeleteList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
    
    }, [empleados])
    
    // ======= FUNCTIONS ===========
    const agregarEmpleado = () =>{
        navigate('/new');
    };

    const goEdit = (rowData) => {
        navigate(`/show/${rowData.id}`)
    }

    const deleteSelectedList = () => {
        dispatch(eliminarEmpleado(deleteList))
    }

    // ======= PRESETS ===========
    const columns = [
        { field: 'id', headerName: 'ID',type: 'number', width: 70 },
        { field: 'nombre', headerName: 'Nombre', width: 130 },
        { field: 'apellido', headerName: 'Apellido', width: 130 },
        { field: 'email',headerName: 'Email',width: 180},
        { field: 'telefono', headerName: 'Telefono',type: 'string', width: 130 },
        { field: 'fecha_contrato',headerName: 'Fecha de contrato',type: 'date',width: 150},
        { field: 'salario',headerName: 'Salario',type: 'number',width: 90},
        { field: 'comision',headerName: 'Comision',type: 'number',width: 90}
    ];
    // ======= RENDER ===========
    return (
        <Paper sx={{ height: 350, width: '100%' }}>
            <DataGrid
                rows={empleados}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row.id}
                checkboxSelection   
                disableSelectionOnClick
                onRowClick={goEdit}
                onSelectionModelChange={(selectionModel) => setDeleteList(selectionModel)}
            />
            <Fab color="primary" aria-label="add" onClick={agregarEmpleado} sx={{margin: '20px', bgcolor: '#62B6CB'}}>
                <PersonAddAlt1 />
            </Fab>
            <Fab color="secondary" aria-label="add" onClick={deleteSelectedList} sx={{margin: '20px', bgcolor: '#d50000'}}>
                <PersonRemove />
            </Fab>
        </Paper>
    );
}

export default Lista;