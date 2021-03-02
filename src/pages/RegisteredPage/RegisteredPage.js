import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { login, getMe, register } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext, LoadingContext } from "../../contexts";
const ErrorRegisterMessage = styled.div`
  color: red;
`;

const RegisteredPageContainer = styled.div`
  padding: 200px 20px 500px 20px;
`;

const RegisteredPageFrom = styled.div`
  max-width: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 50px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;

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

const RegisteredTitle = styled.div`
  text-align: center;
  font-size: 30px;
  margin-bottom: 15px;
`;

const SubmitLoading = styled.div``;

export default function RegisteredPage() {
  const { setUser } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [registerNickname, setRegisterNickname] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [registerError, setRegisterError] = useState("");
  const history = useHistory();
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      registerNickname === "" &&
      registerUsername === "" &&
      registerPassword === ""
    ) {
      setIsLoading(false);
      setRegisterError("暱稱或帳號或密碼 未輸入");
      return;
    }
    setRegisterError(null);
    register(registerNickname, registerUsername, registerPassword).then(
      (data) => {
        if (data.ok === 0) {
          setIsLoading(false);
          return setRegisterError(data.message);
        }
        // 因為後台會將註冊密碼改成 "Lidemy"
        login(registerUsername, "Lidemy").then((data) => {
          if (data.ok === 0) {
            setIsLoading(false);
            return setRegisterError(data.message);
          }
          setAuthToken(data.token);
          getMe().then((res) => {
            if (res.ok !== 1) {
              setIsLoading(false);
              setAuthToken(null);
              return setRegisterError(res.toString());
            }
            setIsLoading(false);
            setUser(res.data);
            history.push("/");
          });
        });
      }
    );
  };
  return (
    <RegisteredPageContainer>
      <RegisteredPageFrom>
        <form onSubmit={handleRegisterSubmit}>
          <RegisteredTitle>註冊</RegisteredTitle>
          <div>
            nickname:
            <input
              value={registerNickname}
              onChange={(e) => setRegisterNickname(e.target.value)}
            />
          </div>
          <div>
            username:
            <input
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </div>
          {isLoading ? (
            <SubmitLoading>資料驗證中...</SubmitLoading>
          ) : (
            <button>註冊</button>
          )}
          <ErrorRegisterMessage>
            {registerError && registerError}
          </ErrorRegisterMessage>
        </form>
      </RegisteredPageFrom>
    </RegisteredPageContainer>
  );
}
