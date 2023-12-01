import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './paginas/auth/login';
import CrearCuenta from './paginas/auth/CrearCuenta';
import VerTikets from './paginas/tikets/VerTikets';
import Home from './paginas/Home';
import CrearTikets from './paginas/tikets/CrearTikets';
import InfoTiket from './paginas/tikets/InfoTiket';
import Respuestas from './paginas/tikets/Respuestas';
import InfoRespuestas from './paginas/tikets/InfoRespuestas';





function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login/>}/> 
          <Route path="/CrearCuenta" exact element={<CrearCuenta/>}/>
          <Route path="/Home" exact element={<Home/>}/>
          <Route path="/Tikets" exact element={<VerTikets/>}/>
          <Route path="/CrearTikets" exact element={<CrearTikets/>}/>
          <Route path="/InfoTiket/:id" exact element={<InfoTiket/>}/> 
          <Route path="/Respuestas" exact element={<Respuestas/>}/>
          <Route path="/InfoRespuesta/:id" exact element={<InfoRespuestas/>}/>




        </Routes>
      </Router>
    </Fragment>
    
  );
}

export default App;