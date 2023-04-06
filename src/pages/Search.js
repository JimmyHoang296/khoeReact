import React, { useEffect, useState } from "react";
import SearchCard from "../components/SearchCard";

export default function Search() {
  const [search, setSearch] = useState({ phone: "", name: "", id: "" });
  const [isOD, setIsOD] = useState(false); //tim kiem coupon het han
  const [message, setMessage] = useState("");
  const [listCoupon, setListCoupon] = useState(
    JSON.parse(localStorage.getItem("khoeData")).data
  );
  const [searchCoupon, setSearchCoupon] = useState([]);
  useEffect(() => {
    startSearch();
  }, [listCoupon]);

  const handleSearch = (e) => {
    e.preventDefault();
    startSearch();
  };

  const startSearch = () => {
    // check search is input
    setMessage("");
    var searchResult = [];

    if (Object.values(search).filter((i) => i !== "").length === 0) {
      setMessage("điền thông tin trước khi tìm");
      return;
    } //trống hết thì té
    // loc theo con han va het han
    if (isOD) {
      searchResult = listCoupon.ticketG.filter((coupon) => {
        const expDate = new Date(coupon.expDate);
        const today = new Date();
        return coupon.remain * 1 === 0 || expDate < today;
      });
    } else {
      searchResult = listCoupon.ticketG.filter((coupon) => {
        const expDate = new Date(coupon.expDate);
        const today = new Date();

        return coupon.remain * 1 > 0 && expDate > today;
      });
    }
    // tim kiem theo yeu cau
    if (search.name) {
      searchResult = searchResult.filter((coupon) =>
        coupon.name.toString().includes(search.name.toString())
      );
    }

    if (search.phone) {
      searchResult = searchResult.filter((coupon) =>
        coupon.phone.toString().includes(search.phone.toString())
      );
    }

    if (search.id) {
      searchResult = searchResult.filter((coupon) =>
        coupon.id.toString().includes(search.id.toString())
      );
    }

    if (searchResult.length === 0) {
      setMessage("Không tìm thấy thông tin phiếu");
      return;
    }
    setSearchCoupon(searchResult);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const newSearch = { ...search, [name]: value };
    setMessage("");
    setSearch(newSearch);
  };
  return (
    <div className="search-ticket section">
      <h2>Tìm kiếm phiếu khách gửi</h2>

      <form className="search-form" onSubmit={handleSearch}>
        <div className="option">
          <input
            type="checkbox"
            id="isOD"
            value={isOD}
            onChange={(e) => {
              setSearchCoupon([]);
              setIsOD(!isOD);
            }}
          />
          <label htmlFor="isOD">Tìm ticket đã hết hạn</label>
        </div>
        <div>
          <input
            type="text"
            name="phone"
            value={search.phone}
            onChange={handleChange}
            placeholder="Nhập số ĐT KH"
          />
          <input
            type="text"
            name="name"
            value={search.name}
            onChange={handleChange}
            placeholder="Nhập tên KH"
          />
          <input
            type="text"
            name="id"
            value={search.id}
            onChange={handleChange}
            placeholder="Nhập mã ticket"
          />
        </div>
        <p>{message} </p>

        <button type="submit">Tìm kiếm</button>
      </form>

      <div className="search-result">
        {searchCoupon.length > 0 &&
          searchCoupon.map((coupon) => (
            <SearchCard
              key={coupon.id}
              coupon={coupon}
              isOD={isOD}
              setListCoupon={setListCoupon}
            />
          ))}
      </div>
    </div>
  );
}
