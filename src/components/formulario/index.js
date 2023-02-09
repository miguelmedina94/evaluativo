import { Alert, CircularProgress, Divider, Paper } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MostrarEmpleado from './Vista';
import imagen from '../../media/alert.png'

const Formulario = () => {
    // ======= HOOOKS ===========
    const {empleados} = useSelector(state => state.empleados);
    const {idNuevo}  = useSelector(state => state.idNuevo);
    const navigate = useNavigate();
    const editId = useParams().id;

    const getEmpleadoSeleccionado = () => {
        const empleadoSeleccionado = empleados.find(empleado => empleado.id === editId);
        if(empleadoSeleccionado){
            return empleadoSeleccionado;
        }
    }
    
    // ======= PRESETS ===========
    
    // ======= RENDER ===========
    switch (window.location.pathname) {
        case '/new':
            return (
                <MostrarEmpleado id={idNuevo} mode={'new'}/>
            );
        case '/edit/'+ editId:
            if(getEmpleadoSeleccionado()){
                return (
                    <MostrarEmpleado id={editId} mode={'edit'} empleado={getEmpleadoSeleccionado()}/>
                );
            }else{
                setTimeout(() => {
                    navigate('/')
                }, 3000);
                return (
                    <Paper sx={{maxWidth: '500px'}}>
                        <Divider />
                            <Alert severity='error'> NO SE ENCONTRO EL EMPLEADO</Alert>
                            <img src={imagen} alt='error' width={500}/>
                        <Divider />
                    </Paper>
                );
            };
        case '/show/'+ editId:
            if(getEmpleadoSeleccionado()){
                return (
                    <MostrarEmpleado id={editId} mode={'show'} empleado={getEmpleadoSeleccionado()}/>
                );
            }else{
                setTimeout(() => {
                    navigate('/')
                }, 3000);
                return (
                    <Paper sx={{maxWidth: '500px'}}>
                        <Divider />
                            <Alert severity='error'> NO SE ENCONTRO EL EMPLEADO</Alert>
                            <img src={imagen} alt='error' width={500}/>
                        <Divider />
                    </Paper>
                );
            };
        default:
            <CircularProgress/>;
    }
    
}

export default Formulario;