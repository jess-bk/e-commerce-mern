import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Unauthorized from "./components/Unauthorized";
import Layout from "./components/Layout";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ScrollToTop from "./hooks/useScrollTop";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            <Route element={<PersistLogin />}>
              <Route exact path="/" element={<Home />} />

              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="products/:category" element={<ProductList />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="product/:id" element={<Product />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="cart" element={<Cart />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;
