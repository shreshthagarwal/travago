import { useState } from "react"

import {BrowserRouter, Routes, Route, Outlet, Navigate} from "react-router-dom"
import { Login } from './components/account/Login';
import Home from './components/home/Home';
import DataProvider from './context/DataProvider';
import Header from "./components/header/Header";
import CreatePost from "./components/home/CreatePost";

const PrivateRoute = ({isAuthenticated, ...props}) => {
  return isAuthenticated ? 
  <>
  <Header />
  <Outlet />
  </>
  : <Navigate replace to="/login" />
}

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (

    
    
      <DataProvider>
        <BrowserRouter>
        <div>
          
          <Routes>
          <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />}></Route>

            <Route path="/home" element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/home' element={<Home />} />
            </Route>

            <Route path="/home/create" element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/home/create' element={<CreatePost />} />
            </Route>

        </Routes>
        </div>
        </BrowserRouter>
      </DataProvider>
    
  );
}

export default App;
