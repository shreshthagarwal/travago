import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Login } from './components/account/Login';
import Home from './components/home/Home';


import DataProvider from './context/DataProvider';

function App() {
  return (
    
      <DataProvider>
        <BrowserRouter>
        <div>
          <Routes>
          <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />}></Route>
            <Route path='/home' element={<Home />}></Route>
        </Routes>
        </div>
        </BrowserRouter>
      </DataProvider>
    
  );
}

export default App;
