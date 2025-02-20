import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HomeContext } from './context/homeContext.jsx'
import { Toaster } from 'sonner'
import {Provider} from 'react-redux'
import store from './redux/store/store.jsx'



createRoot(document.getElementById('root')).render(
 
   <Provider store={store} >
    <HomeContext>
    <Toaster  position='top-center' richColors/>
     <App />
   </HomeContext>
   </Provider>

)
