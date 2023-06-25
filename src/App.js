import './App.css';
import { BrowserRouter as Router, Route, Routes }  from "react-router-dom"
import Home from './Pages/Home';
import About from './Pages/About';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './Routers/PrivateRoutes';
import { useEffect } from 'react';
import { connectionWithWebSocket } from './utils/wssconnection/wssconnection';
import DoctorList from './Pages/DoctorList';
import Consultation from './Pages/Consultation'

function App() {
  useEffect(()=>{
      connectionWithWebSocket()
  },[])
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Protected Routes */}
          <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/find' element={<DoctorList/>}/>
            <Route path='/consultation' element={<Consultation/>}/>
          </Route>

          <Route path='/about' element={<About/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
