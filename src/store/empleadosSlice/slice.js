import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    empleados : [
        {
            id: '1',
            nombre: 'Miguel Angel',
            apellido: 'Medina',
            email: 'miiguelmedina@gmail.com',
            fecha_contrato: '2023-02-01',
            salario: 1234,
            comision: 5
        },
        {
            id: '2',
            nombre: 'Pablo Mariano',
            apellido: 'Alderete',
            email: 'mariano_mpk@hotmail.es',
            fecha_contrato: '2018-05-15',
            salario: 2222,
            comision: 15
        },
        {
            id: '3',
            nombre: 'Luciano Sebastian',
            apellido: 'Morales Carrasco',
            email: 'luciano.testamet123@gmail.com',
            fecha_contrato: '2020-10-01',
            salario: 6534,
            comision: 8
        },
        {
            id: '4',
            nombre: 'Luciano Sebastian',
            apellido: 'Morales Carrasco',
            email: 'luciano.testamet123@gmail.com',
            fecha_contrato: '2020-10-01',
            salario: 6534,
            comision: 8
        },
        {
            id: '5',
            nombre: 'Luciano Sebastian',
            apellido: 'Morales Carrasco',
            email: 'luciano.testamet123@gmail.com',
            fecha_contrato: '2020-10-01',
            salario: 6534,
            comision: 8
        },
        {
            id: '6',
            nombre: 'Luciano Sebastian',
            apellido: 'Morales Carrasco',
            email: 'luciano.testamet123@gmail.com',
            fecha_contrato: '2020-10-01',
            salario: 6534,
            comision: 8
        },
        {
            id: '7',
            nombre: 'Luciano Sebastian',
            apellido: 'Morales Carrasco',
            email: 'luciano.testamet123@gmail.com',
            fecha_contrato: '2020-10-01',
            salario: 6534,
            comision: 8
        },
        {
            id: '8',
            nombre: 'Luciano Sebastian',
            apellido: 'Morales Carrasco',
            email: 'luciano.testamet123@gmail.com',
            fecha_contrato: '2020-10-01',
            salario: 6534,
            comision: 8
        },
        {
            id: '9',
            nombre: 'Luciano Sebastian',
            apellido: 'Morales Carrasco',
            email: 'luciano.testamet123@gmail.com',
            fecha_contrato: '2020-10-01',
            salario: 6534,
            comision: 8
        }
    ]
}

export const empleadosSlice = createSlice({
    name: 'empleados',
    initialState,
    reducers:{
        nuevoEmpleado: (state,action) => {
            state.empleados.push(action.payload);
        },
        reemplazarEmpleado: (state,action) => {
            state.empleados[action.payload.id-1] = action.payload;
        }
    }
});

export const {nuevoEmpleado,reemplazarEmpleado} = empleadosSlice.actions; 

export default empleadosSlice.reducer; 