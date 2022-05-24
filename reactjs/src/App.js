import './App.css';
import {Login, Home, ChangePassword, ForgotPassword, SignUp} from './Pages'
import {PrivateRoute} from "./Component";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }/>
        <Route path='/changepassword' element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        }/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/forgotpassword' element={<ForgotPassword />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
