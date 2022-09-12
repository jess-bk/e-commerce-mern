import React from "react";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding: 10px 20px;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "12px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Button = styled.button`
  width: 12%;
  text-align: center;
  padding: 5px;
  background-color: lightgray;
  &:hover {
    background-color: black;
    color: gray;
  }
  color: black;
  font-weight: 600;
  cursor: pointer;
`;

const Username = styled.p`
  width: 10%;
  text-align: center;
  justify-content: space-between;
  margin: 5px;
  color: black;
  font-style: italic;
  font-weight: bold;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const { auth } = useAuth();

  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Auto Parts Halifax</Logo>
        </Center>
        <Right>
          {!auth.username ? (
            <>
              <Link style={{ textDecoration: "none" }} to="/register">
                <MenuItem>Register</MenuItem>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/login">
                <MenuItem>Sign In</MenuItem>
              </Link>
            </>
          ) : (
            <Button onClick={signOut}>Logout</Button>
          )}
          <Username>{auth.username}</Username>
          <Link to={`/cart`}>
            <MenuItem>
              <Badge
                badgeContent={quantity}
                color="primary"
                overlap="rectangular"
              >
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
