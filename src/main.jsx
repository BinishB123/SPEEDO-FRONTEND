import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HomeContext } from './context/homeContext.jsx'

createRoot(document.getElementById('root')).render(
 
   <HomeContext>
     <App />
   </HomeContext>

)
