import { Route, Routes } from 'react-router-dom'
import './App.css'
import Address from './component/Address'
import Cancel from './component/Cancel'
import MainDashboard from './component/MainDashboard'
import ProductDetails from './component/ProductDetails'
import ShowCart from './component/ShowCart'
import Success from './component/Success'

function App() {


  return (

    <>
      <Routes>
        <Route path='/' element={<MainDashboard />} />
      
        <Route path='/product/:category/:id' element={<ProductDetails />} />
        <Route path='/showcart' element={<ShowCart />} />
        <Route path='/address' element={<Address />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
      </Routes>


    </>
  )
}

export default App
