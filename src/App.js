import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Cart from "./pages/cart/Cart";
import CheckOut from "./pages/checkout/CheckOut";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import NotFound404 from "./pages/notfound/NotFound404";
import Order from "./pages/order/Order";
import OrderDetail from "./pages/orderdetail/OrderDetail";
import ProductDetail from "./pages/productdetail/ProductDetail";
import ProductList from "./pages/productlist/ProductList";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUserFromLocalStorage } from "./utils/userHandle";

function App() {
  let currentUser= getUserFromLocalStorage()
  console.log(currentUser)
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>

          <Route path="/" exact element={<Homepage></Homepage>}></Route>

          <Route path="/product-list/:id" element={<ProductList></ProductList>}></Route>

          <Route path="/search" element={<ProductList></ProductList>}></Route>

          <Route path="/login" exact element={<Login></Login>}></Route>

          <Route path="/register" exact element={<Register></Register>}></Route>

          <Route path="/order" exact element={currentUser === undefined ?  <NotFound404></NotFound404> : <Order></Order>}></Route>

          <Route path="/cart"  exact element={currentUser === undefined ?  <NotFound404></NotFound404> : <Cart></Cart>}></Route>

          <Route path="/check-out" exact element={<CheckOut></CheckOut>}></Route>

          <Route path="/product-detail/:id" element={<ProductDetail></ProductDetail>}></Route>

          <Route path="/forgot-password" exact element={<ForgotPassword></ForgotPassword>}></Route>

          <Route path="/profile/:id" element={currentUser === undefined ?  <NotFound404></NotFound404> : <Profile></Profile>}></Route>

          <Route path="/order-detail/:id" element={currentUser === undefined ?  <NotFound404></NotFound404> : <OrderDetail></OrderDetail>}></Route>

          <Route path="*" element={<NotFound404></NotFound404>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;
