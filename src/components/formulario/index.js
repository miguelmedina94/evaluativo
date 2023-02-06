import { CircularProgress } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MostrarEmpleado from './Vista';

const Formulario = () => {
    // ======= HOOOKS ===========
    const {empleados} = useSelector(state => state.empleados);
    const editId = useParams().id;
    // ======= FUNCTIONS ===========
    const obtenerId = () => {
        // if(empleados){
        //     return empleados.length + 1;
        // }
        if(empleados.length === 0){
            return 1;
        }else{
            console.log(empleados);
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
            return (
                <MostrarEmpleado id={editId} edit={false} create={false} empleado={getEmpleadoSeleccionado()}/>
            );
        default:
            <CircularProgress/>;
    }
    
}

export default Formulario;