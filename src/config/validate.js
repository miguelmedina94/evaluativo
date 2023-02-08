export const validateSliceChange = (empleado,name) => {
    const error = {type: 'error'};
        if (empleado.nombre === ''){
            error.message = `El campo nombre no puede estar vacio`;
            error.open = true;
        }
        if (empleado.apellido === ''){
            error.message = `El campo apellido no puede estar vacio`;
            error.open = true;
        }
        if (empleado.telefono === ''){
            error.message = `El campo telefono no puede estar vacio`;
            error.open = true;
        }
        if (empleado.fecha_contrato === ''){
            error.message = `El campo fecha contrato no puede estar vacio`;
            error.open = true;
        }
    return error;
}

