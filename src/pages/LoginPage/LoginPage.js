import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { login, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";
const ErrorMessage = styled.div`
  color: red;
`;

const LoginPageContainer = styled.div`
  padding: 200px 20px 500px 20px;
`;

const LoginPageFrom = styled.div`
  max-width: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 50px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;

  p {
    margin-bottom: 20px;
  }

  input {
    width: 100%;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  button {
    border-radius: 20px;
    padding: 6px 20px;
    font-size: 15px;
  }
`;

const LoginTitle = styled.div`
  text-align: center;
  font-size: 30px;
  margin-bottom: 15px;
`;

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    if (username === "" && password === "") {
      e.preventDefault();
      setError("帳號或密碼未輸入");
      return;
    }
    e.preventDefault();
    setError(null);
    login(username, password).then((data) => {
      if (data.ok === 0) {
        return setError(data.message);
      }
      setAuthToken(data.token);
      getMe().then((res) => {
        if (res.ok !== 1) {
          setAuthToken(null);
          return setError(res.toString());
        }
        setUser(res.data);
        history.push("/");
      });
    });
  };
  return (
    <LoginPageContainer>
      <LoginPageFrom>
        <form onSubmit={handleSubmit}>
          <LoginTitle>登入</LoginTitle>
          <p>※ 此論壇僅供測試用，密碼均設為 Lidemy</p>
          <div>
            username:
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>登入</button>
          <ErrorMessage>{error && error}</ErrorMessage>
        </form>
      </LoginPageFrom>
    </LoginPageContainer>
  );
}
