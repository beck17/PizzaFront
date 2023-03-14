import {Route, Routes} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

import {Login,Register, Home, Order, Product, Cart} from "./pages";
import {Navbar} from "./components";
import {getMe} from "./redux/slices/authSlice";
import {getAllProducts} from "./redux/slices/productSlice";

function App() {
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getMe())
        dispatch(getAllProducts())
    },[dispatch])

  return (
      <>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>

            <Route path='/product/:id' element={<Product/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/order/:id' element={<Order/>}/>

            <Route path='/auth/login' element={<Login/>}/>
            <Route path='/auth/register' element={<Register/>}/>

            <Route path='*' element={<h1>404 Ошибка. Страница не найдена :(</h1>}/>
        </Routes>
      </>
  );
}

export default App;
