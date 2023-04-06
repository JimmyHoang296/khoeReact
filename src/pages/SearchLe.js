import React, { useEffect, useState } from "react";
import SearchCardLe from "../components/SearchCardLe";

export default function SearchLe() {
  const [search, setSearch] = useState({ id: "" });
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
    setMessage("");
    // check search is input
    startSearch();
  };

  const startSearch = () => {
    var searchResult = [];
    if (!search.id) {
      setMessage("điền thông tin trước khi tìm");
      return;
    }
    if (isOD) {
      searchResult = listCoupon.ticketL.filter(
        (coupon) => coupon.usedDate !== ""
      );
    } else {
      searchResult = listCoupon.ticketL.filter(
        (coupon) => coupon.usedDate === ""
      );
    }

    if (search.id) {
      searchResult = searchResult.filter(
        (coupon) => coupon.id.toString() === search.id.toString()
      );
    }
    if (searchResult.length === 0) {
      setSearchCoupon([]);
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
    <div className="search-ticket section ">
      <h2>Tìm kiếm phiếu lẻ</h2>
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
            <SearchCardLe
              key={coupon.id}
              isOD={isOD}
              coupon={coupon}
              setListCoupon={setListCoupon}
            />
          ))}
      </div>
    </div>
  );
}
