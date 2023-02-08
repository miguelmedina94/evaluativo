import { Error } from '@mui/icons-material';
import { Alert, Button, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { nuevoEmpleado, reemplazarEmpleado } from '../../store/empleadosSlice/slice';

const MostrarEmpleado = (props) => {
    // ======= HOOOKS ===========
    const [empleado , setEmpleado] = useState({id:props.id.toString()});
    const [mode , setMode] = useState(props.mode);
    const [editable, setEditable] = useState(false);
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
        switch(mode){
            case 'new':
                dispatch(nuevoEmpleado(empleado));
                navigate('/');
                setAlertmessage(`Se creo el empleado ${empleado.nombre} correctamente`)
                setOpen(true);
                break;
            case 'edit':
                dispatch(reemplazarEmpleado(empleado));
                setEditable(!editable);
                setMode('show');
                setAlertmessage(`Se modifico el empleado ${empleado.nombre} correctamente`)
                setOpen(true);
                break;
            case 'show':
                setEditable(!editable);
                setMode('edit');
            break;
            default:
                return;
        }
    };

    const botonSecundario = () => {
        switch (mode) {
            case 'new':
                setEmpleado({})
                break;
            case 'edit':
                setEditable(!editable);
                setMode('show');
                setTextField();
                setEditable(false);
                break;
            case 'show':
                navigate('/');
                break;
            default:
                return;
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
        switch (mode) {
            case 'new':
                return `Creando empleado - id: ${props.id}`;
            case 'edit':
                return `Editando empleado - id: ${props.id}`;
            case 'show':
                return `Viendo empleado - id: ${props.id}`;
            default:
                return;
        };
    };

    const getTextPrimaryButton = () => {
        return mode === 'show' ? 'Editar' : 'Guardar';
    }

    const getTextSecondaryButton = () => {
        return mode === 'new' ? 'Limpiar' : 'Cancelar';
    }

    const setTextField = () => {
        mode === 'show' ? setEditable(false) : setEditable(true);
        props.empleado ?  setEmpleado(props.empleado): setEmpleado({id:props.id.toString()});
    }

    const getValueTF = (attr) =>{
        return empleado[attr] ? empleado[attr] : '';
    }

    const CustomTextField = (name) =>{
        const label = name[0].toUpperCase() + name.substring(1).replace('_',' ');
        if(name === 'fecha_contrato'){
            const errorFlag = getValueTF(name).length !== 10;
            return (
                <TextField  name={name}
                disabled={!editable} 
                value={getValueTF(name)} 
                label={label}
                type={'date'}
                InputLabelProps={{shrink: true}} 
                onChange={onChangeField} 
                error={errorFlag}
                sx={{margin: '20px'}}
                />
            );
        }else{
            const errorFlag = getValueTF(name).length < 3;
            return (
                <TextField  name={name}
                disabled={!editable} 
                value={getValueTF(name)} 
                label={label}
                onChange={onChangeField} 
                error={errorFlag}
                sx={{margin: '20px'}}
                />
            );
        };
    };
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
            <Paper elevation={6} sx={{padding: '10px', maxWidth: '600px'}}>
                <Typography variant='h5'>
                    {obtenerTitulo()}
                </Typography>
                {CustomTextField('nombre')}
                {CustomTextField('apellido')}
                {CustomTextField('email')}
                {CustomTextField('telefono')}
                {CustomTextField('salario')}
                {CustomTextField('comision')}
                {CustomTextField('fecha_contrato')}
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