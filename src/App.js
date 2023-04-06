import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Create from "./pages/Create";
import Customer from "./pages/Customer";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import SearchLe from "./pages/SearchLe";
import "./styles.css";
import { useState } from "react";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !isLogin ? (
              <Login isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <Layout />
            )
          }
        >
          <Route index element={<Search />} />
          {/* <Route index element={<Create />} /> */}
          {/* <Route path="search" element={<Search />} /> */}
          <Route path="searchLe" element={<SearchLe />} />
          <Route path="create" element={<Create />} />
          <Route path="customer" element={<Customer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
