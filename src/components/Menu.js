import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Users from "../components/profile/Users";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";

const Menu = ({userInfo}) => {
  let navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = (type) => {
    setInputValue("");
    type && document.getElementById("test").click();
    navigate(`/tim-kiem?p=${inputValue.replace(" ", "-")}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setInputValue("");
      navigate(`/tim-kiem?p=${inputValue.replace(" ", "-")}`);
    }
  };

  const handleKeyPressMobile = (event) => {
    if (event.key === "Enter") {
      document.getElementById("test").click();
      setInputValue("");
      navigate(`/tim-kiem?p=${inputValue.replace(" ", "-")}`);
    }
  }
  
  const handleToggle = () => {
    document.getElementById("test").click();
  };

  return (
    <div className="bg-06a682 py-2 py-md-1">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <button
            id="test"
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink 
            className="navbar-brand d-lg-none d-block logo p-2 rounded me-0"
            to="/"
          >
            <h6 className="text-white mb-0">COOKING HOLICS</h6>
          </NavLink>
          <div
            className="collapse navbar-collapse mt-3 mt-lg-0"
            id="navbarTogglerDemo03"
          >
            <div className="border-top border-light d-md-none mb-4"></div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-4 d-none d-lg-block">
                <NavLink
                  className="text-white fs-5 d-inline-block align-middle"
                  to="/"
                >
                  Trang chủ
                </NavLink>
              </li>
              <li className="nav-item mt-3 mt-sm-0 d-none d-lg-block">
                <NavLink
                  className="text-white fs-5 d-inline-block align-middle"
                  to="/cong-thuc"
                >
                  Công thức
                </NavLink>
              </li>
              <li className="nav-item me-4 d-lg-none" onClick={handleToggle}>
                <HomeIcon
                  className="me-2 d-inline-block align-middle"
                  style={{ color: "white" }}
                />
                <NavLink
                  className="text-white fs-5 d-inline-block align-middle"
                  to="/"
                >
                  Trang chủ
                </NavLink>
              </li>
              <li className="nav-item mt-3 mt-sm-0 d-lg-none" onClick={handleToggle}>
                <ListAltIcon
                  className="me-2 d-inline-block align-middle"
                  style={{ color: "white" }}
                />
                <NavLink
                  className="text-white fs-5 d-inline-block align-middle"
                  to="/cong-thuc"
                >
                  Công thức
                </NavLink>
              </li>
            </ul>
            <div className="logo position-absolute top-50 d-none d-lg-block start-50 translate-middle p-2 rounded">
              <NavLink to="/">
                <h5 className="text-white mb-0">COOKING HOLICS</h5>
              </NavLink>
            </div>
            <div className="d-block d-lg-none">
              <Users userInfo={{}} onClick={handleToggle} />
            </div>
            <div className="d-flex align-items-center mt-4 mt-lg-0">
              <div className="position-relative me-3 w-100">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={inputValue}
                  className="rounded-pill border py-1 px-2 w-100 d-block d-lg-none"
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPressMobile}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={inputValue}
                  className="rounded-pill border py-1 px-2 w-100 d-none d-lg-block"
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
                <SearchIcon
                  className="position-absolute top-50 end-0 d-block d-md-none translate-middle-y me-2"
                  style={{ color: "#939393" }}
                  onClick={()=>handleSearch(true)}
                />
                <SearchIcon
                  className="position-absolute top-50 end-0 d-none d-md-block translate-middle-y me-2"
                  style={{ color: "#939393" }}
                  onClick={()=>handleSearch(false)}
                />
              </div>
            </div>
            <div className="d-none d-lg-block">
              <Users userInfo={userInfo}/>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
