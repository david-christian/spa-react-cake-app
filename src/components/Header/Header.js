import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";
import { MEDIA_QUERY } from "../../constants/constants";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 32px;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.8);
  background-color: rgba(153, 177, 191, 0.6);
  z-index: 2;
  position: relative;

  ${MEDIA_QUERY} {
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const Brand = styled(Link)`
  font-size: 32px;
  font-weight: bold;
  color: white;
`;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`;

const HeaderLeftBlock = styled.div`
  display: flex;
  align-items: center;

  ${NavbarList} {
    margin-left: 64px;
  }
`;

const HeaderRightBlock = styled.div`
  display: flex;
  align-items: center;
`;

const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  width: 100px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  color: white;
  ${(props) => props.$active && `background: #696969;`}
`;

const NavbarGetingBlock = styled.div`
  display: flex;
  height: 100%;
`;

function NavbarGeting({ user, pathname }) {
  return (
    <NavbarGetingBlock>
      {!user && (
        <Nav to="/login" $active={pathname === "/login"}>
          登入
        </Nav>
      )}
      {!user && (
        <Nav to="/registered" $active={pathname === "/registered"}>
          註冊
        </Nav>
      )}
    </NavbarGetingBlock>
  );
}

export default function Header() {
  const location = useLocation();
  const { user, setUser, isGetingUser, setIsGetingUser } = useContext(
    AuthContext
  );
  const history = useHistory();
  const handleLogout = () => {
    setAuthToken("");
    setIsGetingUser(true);

    setUser(null);
    if (location.pathname !== "/") {
      history.push("/");
    }
  };
  const pathname = location.pathname;
  return (
    <HeaderContainer>
      <HeaderLeftBlock>
        <Brand to="/">Cake Garden</Brand>
      </HeaderLeftBlock>
      <HeaderRightBlock>
        <NavbarList>
          <Nav to="/" $active={location.pathname === "/"}>
            首頁
          </Nav>
          {user && (
            <Nav to="/newpost" $active={pathname === "/newpost"}>
              發佈文章
            </Nav>
          )}
        </NavbarList>
        <NavbarList>
          {user && (
            <Nav to="/" onClick={handleLogout}>
              登出
            </Nav>
          )}
          {isGetingUser && <NavbarGeting user={user} pathname={pathname} />}
        </NavbarList>
      </HeaderRightBlock>
    </HeaderContainer>
  );
}
