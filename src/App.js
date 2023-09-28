import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Cart from "./pages/cart/Cart";
import CheckOut from "./pages/checkout/CheckOut";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Order from "./pages/order/Order";
import ProductList from "./pages/productlist/ProductList";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>


      <BrowserRouter>
        <Header />
        <Routes>

          <Route path="/" exact element={<Homepage></Homepage>}></Route>

          <Route path="/product-list" exact element={<ProductList></ProductList>}></Route>

          <Route path="/login" exact element={<Login></Login>}></Route>

          <Route path="/register" exact element={<Register></Register>}></Route>

          <Route path="/order" exact element={<Order></Order>}></Route>

          <Route path="/cart" exact element={<Cart></Cart>}></Route>

          <Route path="/check-out" exact element={<CheckOut></CheckOut>}></Route>

        </Routes>
        <Footer />
      </BrowserRouter>


      {/* <ProductList/> */}
      {/* <Homepage/> */}
      {/* <Login/> */}
      {/* <Register/> */}
      {/* <Order/> */}
      {/* <Cart/> */}
      {/* <CheckOut/> */}

    </>
  );
}

export default App;
