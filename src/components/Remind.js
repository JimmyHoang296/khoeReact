import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";
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

export default function Remind({ setListCoupon, coupon, setIsDisplay }) {
  const couponId = coupon.id;
  const [showModal, setShowModal] = useState(false);

  const [remind, setRemind] = useState({
    remindDate: getToday(),
    id: couponId,
    note: ""
  });
  const [caution, setCaution] = useState({
    state: false,
    message: "Số nhập phải nhỏ hơn số còn lại"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (remind.note === "") {
      setCaution({ state: true, message: "nhập dủ thông tin" });
      return;
    }
    setShowModal(true);
    const submitData = {
      type: "remind",
      data: {
        user: JSON.parse(localStorage.getItem("khoeData")).user,
        lastUpdate: JSON.parse(localStorage.getItem("khoeData")).lastUpdate,
        coupon: {
          id: remind.id,
          remindDate: remind.remindDate,
          note: remind.note,
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
        localStorage.setItem("khoeData", JSON.stringify(data));
        setListCoupon(data.data);
        setShowModal(false);
        setIsDisplay(false);
        alert("Thêm bản ghi thành công");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Thêm bản ghi không thành công");
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
          <p> Ngày nhắc khách</p>
          <input
            type="date"
            value={remind.remindDate}
            onChange={(e) => {
              setRemind({ ...remind, remindDate: e.target.value });
            }}
          />
        </div>

        <div>
          <input
            type="text"
            value={remind.note}
            onChange={(e) => {
              setRemind({ ...remind, note: e.target.value });
            }}
            placeholder="Phản hồi của khách"
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
