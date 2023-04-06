import React, { useState } from "react";
import Remind from "./Remind";

export default function RemindCard({ coupon, setListCoupon }) {
  const [showRemind, setShowRemind] = useState(false);
  return (
    <div className="card">
      <div>
        <label>ticket ID: </label>
        <input value={coupon.id} disabled />
        <label>HSD: </label>
        <input type="date" value={coupon.expDate.slice(0, 10)} disabled />
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
        <button onClick={() => setShowRemind(true)}>Tạo phiếu nhắc</button>
      </div>

      <table>
        <thead>
          <th>Ngày nhắc</th>
          <th>Người nhắc</th>
          <th>KH phản hồi</th>
        </thead>
        <tbody>
          {coupon.remind.map((remind, index) => (
            <tr key={index}>
              <td>{remind.remindDate.slice(0, 10)}</td>
              <td>{remind.user} </td>
              <td>{remind.note} </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showRemind && (
        <Remind
          setIsDisplay={setShowRemind}
          coupon={coupon}
          setListCoupon={setListCoupon}
        />
      )}
    </div>
  );
}
