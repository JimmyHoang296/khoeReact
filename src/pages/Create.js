import React, { useState } from "react";
import URL from "../components/variable";
export default function Create() {
  const [isLe, setIsLe] = useState(false);
  const [caution, setCaution] = useState({ state: false });
  const [showModal, setShowModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    couponStart: "",
    couponEnd: "",
    couponId: "",
    name: "",
    phone: "",
    total: "",
    expDate: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    var submitData;
    if (isLe) {
      submitData = {
        type: "new",
        data: {
          user: JSON.parse(localStorage.getItem("khoeData")).user,
          lastUpdate: JSON.parse(localStorage.getItem("khoeData")).lastUpdate,
          coupon: {
            type: "le",
            couponStart: newCoupon.couponStart,
            couponEnd: newCoupon.couponEnd,
            expDate: newCoupon.expDate
          }
        }
      };

      // send post and bao thanh cong
    } else {
      submitData = {
        type: "new",
        data: {
          user: JSON.parse(localStorage.getItem("khoeData")).user,
          lastUpdate: JSON.parse(localStorage.getItem("khoeData")).lastUpdate,
          coupon: {
            type: "gui",
            id: newCoupon.couponId,
            name: newCoupon.name,
            phone: newCoupon.phone,
            total: newCoupon.total,
            expDate: newCoupon.expDate
          }
        }
      };
    }

    // kiem tra thong tin da duoc nhap du chua
    if (Object.values(submitData.data.coupon).includes("")) {
      setCaution({ state: true, message: "Nhập đủ thông tin" });
      return;
    }
    const couponList = JSON.parse(localStorage.getItem("khoeData")).data;

    // kiem tra ma coupon co hop le không
    if (isLe) {
      if (
        couponList.ticketL
          .map((coupon) => coupon.id)
          .find(
            (id) =>
              id <= newCoupon.couponEnd * 1 && id >= newCoupon.couponStart * 1
          )
      ) {
        setCaution({ state: true, message: "Mã coupon đã tồn tại" });
        return;
      }
    } else {
      if (
        couponList.ticketG
          .map((coupon) => coupon.id.toString())
          .includes(newCoupon.couponId.toString())
      ) {
        setCaution({ state: true, message: "Mã coupon đã tồn tại" });
        return;
      }
    }

    setShowModal(true);
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
        setNewCoupon({
          couponStart: "",
          couponEnd: "",
          couponId: "",
          name: "",
          phone: "",
          total: "",
          expDate: ""
        });
        setShowModal(false);
        alert("Tạo phiếu thành công");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("tạo phiếu không thành công");
        setShowModal(false);
      });
  };

  const handleChange = (e) => {
    setCaution({ state: false });
    setNewCoupon({ ...newCoupon, [e.target.id]: e.target.value });
  };

  return (
    <div className="create-section">
      <form onSubmit={handleSubmit} className="ticket-infor-form">
        <h2>Tạo phiếu mới</h2>
        <div className="option">
          <input
            type="checkbox"
            value={isLe}
            id="isLe"
            onChange={() => setIsLe(!isLe)}
          />
          <label htmlFor="isLe">Tạo ticket lẻ</label>
        </div>
        {isLe && (
          <div>
            <div>
              <label htmlFor="couponStart">Số ticket bắt đầu: </label>
              <input
                id="couponStart"
                value={newCoupon.couponStart}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="couponEnd">Số ticket kết thúc: </label>
              <input
                id="couponEnd"
                value={newCoupon.couponEnd}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {!isLe && (
          <div>
            <div>
              <label htmlFor="couponId">Mã ticket: </label>
              <input
                id="couponId"
                value={newCoupon.couponId}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="name">Tên KH: </label>
              <input id="name" value={newCoupon.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="phone">Số điện thoại: </label>
              <input
                id="phone"
                value={newCoupon.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="total">Số phiếu: </label>
              <input
                id="total"
                value={newCoupon.total}
                onChange={(e) => {
                  setCaution({ state: false });
                  const regex = /^-?\d+$/;
                  if (e.target.value === "" || regex.test(e.target.value)) {
                    setNewCoupon({ ...newCoupon, total: e.target.value });
                  }
                }}
              />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="expDate">Ngày hết hạn: </label>
          <input
            type="date"
            id="expDate"
            value={newCoupon.expDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Tạo ticket</button>
        {caution.state && <p className="danger">{caution.message}</p>}
      </form>
      {showModal && (
        <div className="modal">
          <p> đang cập nhật </p>
        </div>
      )}
    </div>
  );
}
