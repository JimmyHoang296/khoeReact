import React, { useEffect, useState } from "react";
import URL from "./variable";

const getToday = () => {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  var dateString =
    year +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    (day < 10 ? "0" : "") +
    day;
  return dateString;
};

export default function ModCard({ coupon, setListCoupon, setIsDisplay }) {
  const [showModal, setShowModal] = useState(false);
  const [modCoupon, setModCoupon] = useState({
    id: coupon.id,
    name: coupon.name,
    phone: coupon.phone,
    total: coupon.total,
    expDate: coupon.expDate,
    note: ""
  });
  const [caution, setCaution] = useState({
    state: false,
    message: "Số nhập phải nhỏ hơn số còn lại"
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modCoupon.total < coupon.history.reduce((a, c) => a + c.qty * 1, 0)) {
      setCaution({
        state: true,
        message: "giá trị sửa đang nhỏ hơn số phiếu đã dùng"
      });
      return;
    }
    if (Object.values(modCoupon).includes("")) {
      setCaution({
        state: true,
        message: "Phải nhập tất cả các trường thông tin"
      });
      return;
    }

    setShowModal(true);
    const submitData = {
      type: "mod",
      data: {
        user: JSON.parse(localStorage.getItem("khoeData")).user,
        lastUpdate: JSON.parse(localStorage.getItem("khoeData")).lastUpdate,
        coupon: {
          id: coupon.id,
          oldName: coupon.name,
          oldPhone: coupon.phone,
          oldTotal: coupon.total,
          oldExpDate: coupon.expDate,
          newName: modCoupon.name,
          newPhone: modCoupon.phone,
          newTotal: modCoupon.total,
          newExpDate: modCoupon.expDate,
          note: modCoupon.note,
          modTime: new Date()
        }
      }
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
        setListCoupon(data.data);
        setShowModal(false);
        setIsDisplay(false);
        alert("Sửa phiếu thành công");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Sửa phiếu không thành công");
        setShowModal(false);
      });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "scroll");
  });

  return (
    <div className="modal">
      <form className="action-card" onSubmit={handleSubmit}>
        <h2>Thay đổi thông tin phiếu</h2>
        <div className="card-item">
          <label> Tên KH</label>
          <input
            type="text"
            value={modCoupon.name}
            onChange={(e) => {
              setCaution({ state: false });

              setModCoupon({ ...modCoupon, name: e.target.value });
            }}
          />
        </div>
        <div className="card-item">
          <label> Số điện thoại</label>
          <input
            type="text"
            value={modCoupon.phone}
            onChange={(e) => {
              setCaution({ state: false });
              setModCoupon({ ...modCoupon, phone: e.target.value });
            }}
          />
        </div>
        <div className="card-item">
          <label>Giá trị phiếu</label>
          <input
            type="text"
            value={modCoupon.total}
            onChange={(e) => {
              setCaution({ state: false });
              const regex = /^-?\d+$/;
              if (e.target.value === "" || regex.test(e.target.value)) {
                setModCoupon({ ...modCoupon, total: e.target.value });
              }
            }}
          />
        </div>
        <div className="card-item">
          <label>Hạn sử dụng</label>
          <input
            type="date"
            value={modCoupon.expDate.slice(0, 10)}
            onChange={(e) => {
              setCaution({ state: false });
              setModCoupon({ ...modCoupon, expDate: e.target.value });
            }}
          />
        </div>
        <div className="card-item">
          <label> Nguyên nhân</label>
          <input
            type="text"
            value={modCoupon.note}
            onChange={(e) => {
              setCaution({ state: false });
              setModCoupon({ ...modCoupon, note: e.target.value });
            }}
          />
        </div>
        {caution.state && <p className="danger">{caution.message}</p>}
        <div className="card-item">
          <button type="submit">Lưu thay đổi</button>
          <button
            onClick={() => {
              setIsDisplay(false);
            }}
          >
            Bỏ qua
          </button>
        </div>
      </form>
      {showModal && (
        <div className="modal">
          <p> đang cập nhật </p>
        </div>
      )}
    </div>
  );
}
