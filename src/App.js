import Principal from './Components/MainComponents/Principal/Principal';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inventario from './Components/StockComponents/Inventario/Inventario';
import Create from './Components/StockComponents/Create/Create';
import Edit from './Components/StockComponents/Edit/Edit';
import InOut from './Components/IOComponents/MainIO/InOut';
import Agregar from './Components/IOComponents/ContentIO/Movimientos/Agregar';
import Editar from './Components/IOComponents/ContentIO/Movimientos/Editar';
import Salida from './Components/IOComponents/ContentIO/Movimientos/Salida';
const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/edit/:id' element={<Edit/>}/>
          <Route path='/Create' element={<Create/>}/>
          <Route path='/' element={<Principal/>}/>
          <Route path='/Inventarios' element={<Inventario/>}/>
          <Route path='/EntradaSalida' element={<InOut/>}/>
          <Route path='/EntradaSalida/Agregar' element={<Agregar/>}/>
          <Route path='/EntradaSalida/Editar/:id' element={<Editar/>}/>
          <Route path='/EntradaSalida/Salida/:id' element={<Salida/>}/>

        </Routes>
      </BrowserRouter>
  );
}

export default App;