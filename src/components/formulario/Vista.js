import { Alert, Button, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { nuevoEmpleado, reemplazarEmpleado } from '../../store/empleadosSlice/slice';

const MostrarEmpleado = (props) => {
    // ======= HOOOKS ===========
    const [empleado , setEmpleado] = useState({id:props.id.toString()});
    const [editMode , setEditMode] = useState(props.edit);
    const [editable, setEditable] = useState(editMode || props.create);
    const [alertMessage , setAlertmessage] = useState('');
    const [open , setOpen] = useState(false);
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

    const primaryButton = () => {
        if(props.create){
            dispatch(nuevoEmpleado(empleado));
            navigate('/');
            setAlertmessage(`Se creo el empleado ${empleado.nombre} correctamente`)
            setOpen(true);
        }else if(editMode){
            dispatch(reemplazarEmpleado(empleado));
            setEditMode(!editMode);
            setEditable(!editable);
            setAlertmessage(`Se modifico el empleado ${empleado.nombre} correctamente`)
            setOpen(true);
        }else{
            setEditMode(!editMode);
            setEditable(!editable);
        }
    };

    const botonSecundario = () => {
        if(props.create){
            setEmpleado({});
        }else if(editMode){
            setEditable(!editable);
            setEditMode(!editMode)
        }else{
            navigate('/');
        }
    };

    
    const onClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
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

    const getTextPrimaryButton = () => {
        return !editMode && !props.create ? 'Editar' : 'Guardar'
    }

    const getTextSecondaryButton = () => {
        return props.create ? 'Limpiar' : 'Cancelar'
    }

    const setTextField = () => {
        if(props.empleado){
            setEmpleado(props.empleado);
        }
    }

    // ======= RENDER ===========
    return (
        <>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
                    <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
                    {alertMessage}
                    </Alert>
                </Snackbar>
            </Stack>
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
                        <Button variant='contained' onClick={primaryButton} sx={{marginRight: '10px'}}>
                            {getTextPrimaryButton()}
                        </Button>
                        <Button variant='contained' onClick={botonSecundario} sx={{marginLeft: '10px', bgcolor: '#64748B'}}>
                            {getTextSecondaryButton()}
                        </Button>
                </Container>
            </Paper>
            </>
    );
}

export default MostrarEmpleado;