import { Alert, Button, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateSliceChange } from '../../config/validate';
import { nuevoEmpleado, reemplazarEmpleado } from '../../store/empleadosSlice/slice';

const MostrarEmpleado = (props) => {
    // ======= HOOOKS ===========
    const [empleado , setEmpleado] = useState({id:props.id.toString()});
    const [mode , setMode] = useState(props.mode);
    const [editable, setEditable] = useState(false);
    const [alert , setAlert] = useState({});
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
                if(alert.type === 'success'){
                    dispatch(nuevoEmpleado(empleado));
                    setAlert({open: true, 
                            message: `Se creo el empleado ${empleado.nombre} correctamente`,
                            type: 'success'});
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                }
                break;
            case 'edit':
                if(alert.type === 'success'){
                    dispatch(reemplazarEmpleado(empleado));
                    setEditable(!editable);
                    setMode('show');
                    setAlert({open: true, 
                        message: `Se modifico el empleado ${empleado.nombre} correctamente`,
                        type: 'success'});
                }
                break;
            case 'show':
                setEditable(!editable);
                setMode('edit');
            break;
            default:
                return;
        }
    }

    const botonSecundario = () => {
        switch (mode) {
            case 'new':
                setEmpleado({})
                break;
            case 'edit':
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

    const onClose = (event,reason) => {
        if (reason !== 'clickaway') {
            setAlert({open: false});
        }
    };

    const mostrarMensaje = () => {
        return (
                <Snackbar open={alert.open} autoHideDuration={3000} onClose={onClose}>
                    <Alert onClose={onClose} severity={alert.type} sx={{ width: '100%'}}>
                    {alert.message}
                    </Alert>
                </Snackbar>
        );
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

    const customTextField = (name) =>{
        const label = name[0].toUpperCase() + name.substring(1).replace('_',' ');
        if(name === 'fecha_contrato'){
            return (
                <TextField  name={name}
                required
                disabled={!editable} 
                value={getValueTF(name)} 
                label={label}
                type={'date'}
                InputLabelProps={{shrink: true}} 
                onChange={onChangeField}
                onBlur={() => setAlert(validateSliceChange(empleado))}
                sx={{margin: '20px'}}
                />
            );
        }else{
            const req = name === 'nombre' || name === 'apellido' || name === 'telefono' ? true : false;
            return (
                <TextField  name={name}
                disabled={!editable} 
                value={getValueTF(name)} 
                label={label}
                onChange={onChangeField}
                onBlur={() => setAlert(validateSliceChange(empleado))}
                required={req}
                sx={{margin: '20px'}}
                />
            );
        };
    };

    // ======= RENDER ===========
    return (
        <>
            
            <Stack spacing={2} sx={{ width: '100%' }}>
                {mostrarMensaje()}
            </Stack>
            <Paper elevation={6} sx={{padding: '10px', maxWidth: '600px'}}>
                <Typography variant='h5'>
                    {obtenerTitulo()}
                </Typography>
                {customTextField('nombre')}
                {customTextField('apellido')}
                {customTextField('email')}
                {customTextField('telefono')}
                {customTextField('salario')}
                {customTextField('comision')}
                {customTextField('fecha_contrato')}
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