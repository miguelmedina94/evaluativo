import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Fab, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { PersonAddAlt1 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Lista = () => {
    // ======= HOOOKS ===========
    const {empleados} = useSelector(state => state.empleados);
    const navigate = useNavigate();
    useEffect(() => {
    
    }, [empleados])
    
    // ======= FUNCTIONS ===========
    const agregarEmpleado = () =>{
        navigate('/new');
    };

    const goEdit = (rowData) => {
        navigate(`/show/${rowData.id}`)
    }
    // ======= PRESETS ===========
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nombre', headerName: 'Nombre', width: 130 },
        { field: 'apellido', headerName: 'Apellido', width: 130 },
        { field: 'email',headerName: 'Email',type: 'number',width: 180},
        { field: 'fecha_contrato',headerName: 'Fecha de contrato',type: 'number',width: 150},
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
                onRowClick={goEdit}
            />
            <Fab color="primary" aria-label="add" onClick={agregarEmpleado} sx={{margin: '20px', bgcolor: '#62B6CB'}}>
                <PersonAddAlt1 />
            </Fab>
        </Paper>
    );
}

export default Lista;