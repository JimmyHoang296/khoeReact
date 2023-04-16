import React, { useState } from "react";
import ModCard from "./ModCard";
import MoveCard from "./MoveCard";
import UseCard from "./UseCard";
import convertToLocalDate from "./ass";

export default function SearchCard({ isOD, coupon, setListCoupon }) {
  const [showHis, setShowHis] = useState(false);
  const [showUse, setShowUse] = useState(false);
  const [showMod, setShowMod] = useState(false);
  const [showMove, setShowMove] = useState(false);
  return (
    <div className="card">
      <div>
        <label>ticket ID: </label>
        <input value={coupon.id} disabled />
        <label>HSD: </label>
        <input
          type="text"
          value={convertToLocalDate(coupon.expDate)}
          disabled
        />
      </div>
      <div>
        <label>Tên KH: </label>
        <input value={coupon.name} disabled />
        <label>SDT: </label>
        <input value={coupon.phone} disabled />
      </div>

      <div>
        <label>Số phiếu:</label>
        <input value={coupon.total} disabled />
        <label>Còn lại:</label>
        <input
          value={
            coupon.total -
            coupon.history.reduce((acc, cur) => acc + cur.qty * 1, 0)
          }
          disabled
        />
      </div>
      <div className="action-btns">
        <button
          onClick={() => {
            setShowHis(!showHis);
          }}
        >
          {showHis ? "Ẩn chi tiết" : "Xem chi tiết"}
        </button>
        <button onClick={() => setShowMod(true)}>Sửa thông tin</button>
        {!isOD && (
          <button
            onClick={() => {
              setShowUse(true);
            }}
          >
            Sử dụng phiếu
          </button>
        )}
        {!isOD && (
          <button onClick={() => setShowMove(true)}>Tạo phiếu mới</button>
        )}
      </div>
      {showHis && (
        <table>
          <thead>
            <th>Ngày dùng</th>
            <th>Số lượng</th>
            <th>Ghi chú</th>
          </thead>
          <tbody>
            {coupon.history.map((use, index) => (
              <tr key={index}>
                <td>{convertToLocalDate(use.useDate)}</td>
                <td>{use.qty} </td>
                <td>{use.note} </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showUse && (
        <UseCard
          setIsDisplay={setShowUse}
          coupon={coupon}
          setListCoupon={setListCoupon}
        />
      )}

      {showMod && (
        <ModCard
          setIsDisplay={setShowMod}
          coupon={coupon}
          setListCoupon={setListCoupon}
        />
      )}
      {showMove && (
        <MoveCard
          setIsDisplay={setShowMove}
          coupon={coupon}
          setListCoupon={setListCoupon}
        />
      )}
    </div>
  );
}
