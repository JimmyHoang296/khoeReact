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

export default function UseCardLe({ coupon, setListCoupon, setIsDisplay }) {
  const [showModal, setShowModal] = useState(false);
  const [useCoupon, setUseCoupon] = useState({
    useDate: getToday(),
    id: coupon.id,
    note: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowModal(true);
    const submitData = {
      type: "use",
      data: {
        user: JSON.parse(localStorage.getItem("khoeData")).user,
        lastUpdate: JSON.parse(localStorage.getItem("khoeData")).lastUpdate,
        coupon: {
          type: "le",
          id: useCoupon.id,
          useDate: useCoupon.useDate,
          inputDate: new Date(),
          note: useCoupon.note
        }
      }
    };
    console.log(JSON.stringify(submitData));
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
              console.log("click");
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
