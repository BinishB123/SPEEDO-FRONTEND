
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './components/login'
import HomePage from './pages/home'
import Home from './components/home'
import ViewDetail from './components/viewDetail'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo?.id) {
      navigate("/login", { replace: true });
    }
  }, [userInfo, navigate]); 

  return  children 
};






function App() {

  return (
   <>
 <BrowserRouter>
   <Routes>
    <Route path='/login' element={<Login></Login>}></Route>
    <Route path='/' element={<ProtectedRoute><HomePage></HomePage></ProtectedRoute>}>
    <Route index element={<ProtectedRoute><Home></Home></ProtectedRoute>}/>
    <Route path='view/:id' element={<ProtectedRoute><ViewDetail></ViewDetail></ProtectedRoute>}/> 
    </Route>
   </Routes>
   </BrowserRouter>
 
   </>
  )
}

export default App
