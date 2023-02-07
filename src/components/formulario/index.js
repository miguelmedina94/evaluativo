import { Alert, CircularProgress, Divider, Paper } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MostrarEmpleado from './Vista';
import imagen from '../../media/alert.png'

const Formulario = () => {
    // ======= HOOOKS ===========
    const {empleados} = useSelector(state => state.empleados);
    const navigate = useNavigate();
    const editId = useParams().id;
    // ======= FUNCTIONS ===========
    const obtenerId = () => {
        if(empleados.length === 0){
            return 1;
        }else{
            return Number(empleados[empleados.length-1].id)+1;
        }
    }

    const getEmpleadoSeleccionado = () => {
        const empleadoSeleccionado = empleados.find(empleado => empleado.id === editId);
        if(empleadoSeleccionado){
            return empleadoSeleccionado;
        }else{

        }
    }
    
    // ======= PRESETS ===========
    
    // ======= RENDER ===========
    switch (window.location.pathname) {
        case '/new':
            return (
                <MostrarEmpleado id={obtenerId()} edit={false} create={true}/>
            );
        case '/edit/'+ editId:
            return (
                <MostrarEmpleado id={editId} edit={true} create={false} empleado={getEmpleadoSeleccionado()}/>
            );
        case '/show/'+ editId:
            if(getEmpleadoSeleccionado()){
                return (
                    <MostrarEmpleado id={editId} edit={false} create={false} empleado={getEmpleadoSeleccionado()}/>
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