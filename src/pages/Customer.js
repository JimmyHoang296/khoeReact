import React, { useEffect, useState } from "react";
import RemindCard from "../components/RemindCard";

export default function Customer() {
  const [listCoupon, setListCoupon] = useState(
    JSON.parse(localStorage.getItem("khoeData")).data
  );
  const [searchCoupon, setSearchCoupon] = useState([]);
  const [cusNumber, setCusNumber] = useState(0);
  useEffect(() => {
    startSearch();
  }, [listCoupon]);

  const handleSearch = (e) => {
    e.preventDefault();
    startSearch();
  };

  const startSearch = () => {
    // check search is input
    var searchResult = [];

    // loc theo con han va het han
    searchResult = listCoupon.ticketG.filter((coupon) => {
      const expDate = new Date(coupon.expDate);
      const today = new Date();
      const oneDay = 24 * 60 * 60 * 1000;
      const difDay = Math.round(Math.abs((expDate - today) / oneDay));
      return coupon.remain * 1 > 0 && expDate > today && difDay < 30;
    });
    setCusNumber(searchResult.length);

    // tim kiem theo yeu cau

    setSearchCoupon(searchResult);
  };

  return (
    <div className="search-ticket section">
      <h2>Nhắc khách</h2>

      <form className="search-form" onSubmit={handleSearch}>
        <button type="submit">{cusNumber} Khách còn 1 tháng</button>
      </form>

      <div className="search-result">
        {searchCoupon.length > 0 &&
          searchCoupon.map((coupon) => (
            <RemindCard
              key={coupon.id}
              coupon={coupon}
              setListCoupon={setListCoupon}
            />
          ))}
      </div>
    </div>
  );
}
