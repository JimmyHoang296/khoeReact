import React, { useState } from "react";
import URL from "../components/variable";
export default function Login({ isLogin, setIsLogin }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [site, setSite] = useState("K7");

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);

    const submitData = {
      type: "login",
      data: { user: { name: user, password: password, site: site } }
    };
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(submitData) // body data type must match "Content-Type" header
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("khoeData", JSON.stringify(data));
        setIsLogin(true);
        setShowModal(false);
        alert("Đăng nhập thành công");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Cập nhật không thành công, hãy thử lại");
        setShowModal(false);
      });
  };

  return (
    <>
      <div className="login-page  ">
        <form className="login-form " onSubmit={handleSubmit}>
          <h3>Đăng nhập </h3>
          <input
            type="text"
            placeholder="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="custom-select">
            <select
              id="user-site"
              value={site}
              onChange={(e) => setSite(e.target.value)}
            >
              <option value="K1">K1</option>
              <option value="K2">K2</option>
              <option value="K3">K3</option>
              <option value="K4">K4</option>
              <option value="K5">K5</option>
              <option value="K6">K6</option>
              <option value="K7">K7</option>
            </select>
          </div>
          <button id="login" type="submit">
            login
          </button>
          <p className="danger hidden"></p>
        </form>
      </div>
      {showModal && (
        <div className="modal">
          <p> đang cập nhật </p>
        </div>
      )}
    </>
  );
}
