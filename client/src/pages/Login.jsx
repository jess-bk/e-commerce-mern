import styled from "styled-components";
import { mobile } from "../responsive";

import useAuth from "../hooks/useAuth";
import { Link as link, useNavigate, useLocation } from "react-router-dom";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";
import axios from "../Api/axios";
import { useState, useEffect, useRef } from "react";

const LOGIN_URL = "/api/auth/login";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url("https://wallpaperaccess.com/full/2947979.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 35%;
  padding: 20px;
  background-color: white;
  border: 1px solid lightgrey;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  color: white;
  background-color: grey;
  &:hover {
    background-color: black;
  }
  cursor: pointer;

  margin-bottom: 10px;
  ${mobile({ width: "100%" })};
  & :disabled {
    color: green;
    cursor: none;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const P = styled.p`
  text-align: center;
  font-size: 12px;
  text-decoration: none;
  flex: 1;
`;

const PersistCheckLabel = styled.h1`
  display: flex;
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const InputCheckBox = styled.input`
  width: 10%;
  display: flex;
`;

const Login = () => {
  const [password, setPassword] = useState("");

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [username, resetUser, userAttributes] = useInput("user", "");
  const [user, setUser] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const isAdmin = response?.data?.isAdmin;
      setAuth({ username, password, isAdmin, accessToken, user });
      setUser("");
      resetUser();
      setPassword("");
      // setSuccess(true);
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <Container>
      <Wrapper>
        <P
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </P>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="username"
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            {...userAttributes}
            // onChange={(e) => setUsername(e.target.value)}
            // value={user}
            required
          />
          <Input
            placeholder="password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <PersistCheckLabel>
            Trust this device
            <InputCheckBox
              type="checkbox"
              id="persist"
              onChange={toggleCheck}
              checked={check}
            />
          </PersistCheckLabel>

          <Button>LOGIN</Button>
          <Link>
            <>DO NOT YOU REMEMBER THE PASSWORD?</>
          </Link>
          <Link>
            <>CREATE A NEW ACCOUNT</>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
