import React, { useState } from "react";
import UseCardLe from "./UseCardLe";
import convertToLocalDate from "./ass";

export default function SearchCard({ coupon, isOD, setListCoupon }) {
  const [showUse, setShowUse] = useState(false);

  return (
    <div className="card">
      <div>
        <label>ticket ID: </label>
        <input value={coupon.id} disabled />
        <label>HSD: </label>
        <input type="date" value={convertToLocalDate(coupon.expDate)} disabled />
      </div>
      {isOD && (
        <div>
          <label>Ngày dùng: </label>
          <input type="date" value={convertToLocalDate(coupon.expDate)} disabled />
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
