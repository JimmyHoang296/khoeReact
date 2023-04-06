import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  const user = JSON.parse(localStorage.getItem("khoeData")).user;

  return (
    <>
      <nav>
        <img
          alt="logo"
          src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_350,h_132/https://khoemassage.com/wp-content/uploads/2021/07/logo.jpg"
        />
        <p>
          Tài khoản {user.name} Cơ sở {user.site}
        </p>
        <ul>
          <li>
            <Link activeClassName="is-active" to="/">
              Tìm coupon gửi
            </Link>
          </li>
          <li>
            <Link activeClassName="is-active" to="/searchLe">
              Tìm coupon lẻ
            </Link>
          </li>
          <li>
            <Link activeClassName="is-active" to="/create">
              Tạo phiếu
            </Link>
          </li>
          <li>
            <Link activeClassName="is-active" to="/customer">
              Khách hàng
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
