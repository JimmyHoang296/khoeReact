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

export default function UseCard({ setListCoupon, coupon, setIsDisplay }) {
  const couponId = coupon.id;
  const [showModal, setShowModal] = useState(false);
  const couponRemain =
    coupon.total - coupon.history.reduce((acc, cur) => acc + cur.qty*1, 0);
  const [useCoupon, setUseCoupon] = useState({
    useDate: getToday(),
    id: couponId,
    qty: "",
    note: ""
  });
  const [caution, setCaution] = useState({
    state: false,
    message: "Số nhập phải nhỏ hơn số còn lại"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (useCoupon.qty === 0) {
      setCaution({ state: true, message: "Nhập số phiếu để sử dụng" });
      return;
    }
    if (useCoupon.qty > couponRemain*1) {
      setCaution({
        state: true,
        message: "Số phiếu dùng phải nhỏ hơn số còn lại"
      });
      return;
    }

    setShowModal(true);
    const submitData = {
      type: "use",
      data: {
        user: JSON.parse(localStorage.getItem("khoeData")).user,
        lastUpdate: JSON.parse(localStorage.getItem("khoeData")).lastUpdate,
        coupon: {
          type: "gui",
          id: useCoupon.id,
          useDate: useCoupon.useDate,
          qty: useCoupon.qty,
          note: useCoupon.note,
          inputDate: new Date()
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
        console.log(data);
        localStorage.setItem("khoeData", JSON.stringify(data));
        setListCoupon(data.data);
        setShowModal(false);
        setIsDisplay(false);
        alert("Sử dụng phiếu thành công");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Sử dụng phiếu không thành công");
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
        <div>
          <p> Ngày sử dụng</p>
          <input
            type="date"
            value={useCoupon.useDate}
            onChange={(e) => {
              setUseCoupon({ ...useCoupon, useDate: e.target.value });
            }}
          />
        </div>

        <div>
          <input
            type="text"
            value={useCoupon.qty}
            onChange={(e) => {
              if (e.target.value === "-") {
                setUseCoupon({ ...useCoupon, qty: "-" });
              }
              const regex = /^-?\d+$/;
              if (e.target.value === "" || regex.test(e.target.value)) {
                setUseCoupon({ ...useCoupon, qty: e.target.value });
              }
            }}
            placeholder="Giá trị sử dụng"
          />{" "}
        </div>
        <div>
          <input
            type="text"
            value={useCoupon.note}
            onChange={(e) => {
              setUseCoupon({ ...useCoupon, note: e.target.value });
            }}
            placeholder="Ghi chú nếu có"
          />
        </div>
        <div>
          <button type="submit">Sử dụng</button>
          <button
            onClick={() => {
              setIsDisplay(false);
            }}
          >
            Bỏ qua
          </button>
        </div>
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
