import React, { useState } from "react";
import UseCardLe from "./UseCardLe";

export default function SearchCard({ coupon, isOD, setListCoupon }) {
  const [showUse, setShowUse] = useState(false);

  return (
    <div className="card">
      <div>
        <label>ticket ID: </label>
        <input value={coupon.id} disabled />
        <label>HSD: </label>
        <input type="date" value={coupon.expDate.slice(0, 10)} disabled />
      </div>
      {isOD && (
        <div>
          <label>Ngày dùng: </label>
          <input type="date" value={coupon.usedDate.slice(0, 10)} disabled />
        </div>
      )}

      <div className="action-btns">
        {!isOD && (
          <button
            onClick={() => {
              setShowUse(true);
            }}
          >
            Sử dụng phiếu
          </button>
        )}
      </div>
      {showUse && (
        <UseCardLe
          setIsDisplay={setShowUse}
          coupon={coupon}
          setListCoupon={setListCoupon}
        />
      )}
    </div>
  );
}
