import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'

export const App = ()=>{
  return (
      <Routes>
        <Route exact path='/' element={<Home/>}/>
      </Routes>
  )
}
