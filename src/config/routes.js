import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Container} from '@mui/material'

import Lista from '../components/lista/';
import Formulario from '../components/formulario/'
import { Header } from '../components/common/Header';

const MainRouter = () => {
    return (
    <BrowserRouter>
        <Container>
            <Header/>
            <Routes>
                <Route path='/' element={<Lista/>}/>
                <Route path='/new' element={<Formulario/>}/>
                <Route path='/edit/:id' element={<Formulario/>}/>
                <Route path='/show/:id' element={<Formulario/>}/>
            </Routes>
        </Container>
    </BrowserRouter>
    )
};

export default MainRouter;