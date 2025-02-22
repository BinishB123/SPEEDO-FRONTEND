
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/login'
import HomePage from './pages/home'
import Home from './components/home'
import ViewDetail from './components/viewDetail'
function App() {

  return (
   <>
 <BrowserRouter>
   <Routes>
    <Route path='/login' element={<Login></Login>}></Route>
    <Route path='/' element={<HomePage></HomePage>}>
    <Route index element={<Home></Home>}/>
    <Route path='view/:id' element={<ViewDetail></ViewDetail>}/> 
    </Route>
   </Routes>
   </BrowserRouter>
 
   </>
  )
}

export default App
