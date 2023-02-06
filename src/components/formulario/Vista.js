import { Button, Paper, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { nuevoEmpleado, reemplazarEmpleado } from '../../store/empleadosSlice/slice';

const MostrarEmpleado = (props) => {
    // ======= HOOOKS ===========
    const [empleado , setEmpleado] = useState({id:props.id.toString()});
    const [editMode , setEditMode] = useState(props.edit);
    const [editable, setEditable] = useState(editMode || props.create)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setTextField();
    }, [])
    

    // ======= FUNCTIONS ===========
    const onChangeField = (e) => {
        const value = e.target.value;
        setEmpleado({
            ...empleado,
            [e.target.name]: value
        });
    };

    const botonPrimario = () => {
        if(props.create){
            dispatch(nuevoEmpleado(empleado));
            navigate('/');
        }else if(editMode){
            dispatch(reemplazarEmpleado(empleado))
            setEditMode(!editMode);
            setEditable(!editable);
        }else{
            setEditMode(!editMode);
            setEditable(!editable);
        }
    };

    const botonSecundario = () => {
        if(props.create){
            setEmpleado({});
        }else{
            setEditable(!editable);
            setEditMode(!editMode)
        }
    };
    // ======= PRESETS ===========
    const obtenerTitulo = () => {
        if(props.create){
            return `Creando empleado - id: ${props.id}`;
        }else if(props.edit){
            return `Editando empleado - id: ${props.id}`;
        }else{
            return `Viendo empleado - id: ${props.id}`;
        };
    };

    const obtenerTextoBotonPrimario = () => {
        return !editMode && !props.create ? 'Editar' : 'Guardar'
    }

    const obtenerTextoBotonSecundario = () => {
        return props.create ? 'Limpiar' : 'Cancelar'
    }

    const setTextField = () => {
        if(props.empleado){
            setEmpleado(props.empleado);
        }
    }

    console.log('editable ',editable);
    console.log('editMode ',editMode);

    // ======= RENDER ===========
    return (
        <Paper sx={{padding: '10px', maxWidth: '600px'}}>
            <Typography variant='h5'>
                {obtenerTitulo()}
            </Typography>
            <TextField name='nombre' disabled={!editable} value={empleado.nombre ? empleado.nombre : ''} label='Nombres' onChange={onChangeField} sx={{margin: '20px'}}/>
            <TextField name='apellido' disabled={!editable} value={empleado.apellido ? empleado.apellido : ''} label='Apellidos' onChange={onChangeField} sx={{margin: '20px'}}/>
            <TextField name='email' disabled={!editable} label='Email' value={empleado.email ? empleado.email : ''} onChange={onChangeField} sx={{margin: '20px'}}/>
            <TextField name='fecha_contrato' disabled={!editable} type='date' label='Fecha de contratacion' value={empleado.fecha_contrato ? empleado.fecha_contrato : ''}
                        InputLabelProps={{shrink: true}} onChange={onChangeField} sx={{margin: '20px'}}/>
            <TextField name='salario' disabled={!editable} label='Salario' value={empleado.salario ? empleado.salario : ''} onChange={onChangeField} sx={{margin: '20px'}}/>
            <TextField name='comision' disabled={!editable} label='Comision' value={empleado.comision ? empleado.comision : ''} onChange={onChangeField} sx={{margin: '20px'}}/>
            <Container sx={{width: '100%',display: 'flex', justifyContent: 'flex-end', margin: '20px'}}>
                    <Button variant='contained' onClick={botonPrimario} sx={{marginRight: '10px'}}>
                        {obtenerTextoBotonPrimario()}
                    </Button>
                    <Button variant='contained' onClick={botonSecundario} sx={{marginLeft: '10px', bgcolor: '#64748B'}}>
                        {obtenerTextoBotonSecundario()}
                    </Button>
            </Container>
        </Paper>
    );
}

export default MostrarEmpleado;