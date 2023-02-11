//FUNCION PARA VALIDAD LOS CAMPOS SI ESTAN LLENOS Y QUE NO GUARDE EN ESE CASO
export const validateSliceChange = (empleado,e) => {
    const error = {type: 'success'};
        if (empleado.nombre === '' && e.target.name === 'nombre'){
            error.message = `El campo nombre no puede estar vacio`;
            error.open = true;
            error.type = 'error'
        }
        if (empleado.apellido === '' && e.target.name === 'apellido'){
            error.message = `El campo apellido no puede estar vacio`;
            error.open = true;
            error.type = 'error'
        }
        if (empleado.telefono === '' && e.target.name === 'telefono'){
            error.message = `El campo telefono no puede estar vacio`;
            error.open = true;
            error.type = 'error'
        }
        if (empleado.fecha_contrato === '' && e.target.name === 'fecha_contrato'){
            error.message = `El campo fecha contrato no puede estar vacio`;
            error.open = true;
            error.type = 'error'
        }
    return error;
}