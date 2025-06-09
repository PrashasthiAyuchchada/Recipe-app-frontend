import { useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/loginPage'
import RegisterPage from '../pages/registerPage'
import HomePage from '../pages/homePage'
import FavouritePage from '../pages/favouritePage'

function App() {
  const [count, setCount] = useState(0)

  return (
       <BrowserRouter>
    <Toaster position='top-right'/>
     <Routes path="/*">
       
       <Route path="/login" element={<LoginPage/>}/>
       <Route path= "/register" element={<RegisterPage/>}/>
        <Route path= "/home" element={<HomePage/>}/>
        <Route path="/favourite" element={<FavouritePage />} />

      
      

     </Routes> 
    </BrowserRouter>
  )
}

export default App
