import { NavLink } from "react-router-dom";
import Users from "./profile/Users";
import { Search } from "@mui/icons-material";

const Menu = () => {
    
    return <div className="bg-92AD95 py-3">
        <div className="container d-flex align-items-center justify-content-between position-relative">
            <ul className="list-unstyled d-flex">
                <li className="me-4">
                    <NavLink className="text-white" to="/">Trang chủ</NavLink>
                </li>
                <li className="me-4">
                    <NavLink className="text-white" to="/cong-thuc">Công thức</NavLink>
                </li>
                <li className="me-4">
                    <NavLink className="text-white" to="/lien-he">Liên hệ</NavLink>
                </li>
                <li className="me-4">
                    <NavLink className="text-white" to="/gioi-thieu">Giới thiệu</NavLink>
                </li>
            </ul>
            <div className="position-absolute top-50 start-50 translate-middle">
                <h1 className="text-white">LOGO</h1>
            </div>
            <div>
                <input type="text" placeholder="Tìm kiếm..."  className="rounded border py-1 px-2"/>
                <Search />
            </div>
            <Users />
        </div>
    </div>
}

export default Menu;