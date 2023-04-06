import React, { useEffect, useState } from "react";
import URL from "./variable";

export default function MoveCard({ setListCoupon, coupon, setIsDisplay }) {
  const couponId = coupon.id;
  const [showModal, setShowModal] = useState(false);
  const couponRemain =
    coupon.total - coupon.history.reduce((acc, cur) => acc + cur.qty, 0);
  const [moveCoupon, setMoveCoupon] = useState({
    expDate: coupon.expDate.slice(0, 10),
    newId: "",
    oldId: couponId
  });
  const [caution, setCaution] = useState({
    state: false,
    message: "Số nhập phải nhỏ hơn số còn lại"
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // check all input:

    if (Object.values(moveCoupon).includes("")) {
      setCaution({ state: true, message: "Thông tin chưa nhập đủ" });
      return;
    }

    if (
      JSON.parse(localStorage.getItem("khoeData"))
        .data.ticketG.map((coupon) => coupon.id.toString())
        .includes(moveCoupon.newId.toString())
    ) {
      setCaution({ state: true, message: "Mã coupon đã tồn tại" });
      return;
    }
    setShowModal(true);
    const submitData = {
      type: "move",
      data: {
        user: JSON.parse(localStorage.getItem("khoeData")).user,
        lastUpdate: JSON.parse(localStorage.getItem("khoeData")).lastUpdate,
        coupon: {
          name: coupon.name,
          phone: coupon.phone,
          oldId: moveCoupon.oldId,
          newId: moveCoupon.newId,
          expDate: moveCoupon.expDate,
          total: couponRemain,
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
        alert("Chuyển phiếu thành công");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Chuyến phiếu không thành công");
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
          <p> Hạn SD:</p>
          <input
            type="date"
            value={moveCoupon.expDate}
            onChange={(e) => {
              setMoveCoupon({ ...moveCoupon, expDate: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="couponId">Mã ticket: </label>
          <input
            id="couponId"
            value={moveCoupon.newId}
            onChange={(e) =>
              setMoveCoupon({ ...moveCoupon, newId: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="couponId">Số phiếu chuyển: </label>
          <input id="couponId" value={couponRemain} disabled />
        </div>

        <div>
          <button type="submit">Tạo phiếu</button>
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
