import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { Login } from './components/Login'

export const App = ()=>{
  console.log(import.meta.env.VITE_NAME)
  console.log(import.meta.env.VITE_HELLO)

  return (
      <Routes>
        <Route exact path='/' element={<Home/>}/>
      </Routes>
  )
}
