import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import PostPage from "../../pages/PostPage";
import RegisteredPage from "../../pages/RegisteredPage";
import NewPostPage from "../../pages/NewPostPage";
import Header from "../Header";
import Footer from "../Footer";
import EditPage from "../../pages/EditPage";
import { AuthContext, LoadingContext } from "../../contexts";
import { getMe } from "../../WebAPI";
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { getAuthToken } from "../../utils";

const Reat = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

export default function App() {
  const [isGetingUser, setIsGetingUser] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (getAuthToken()) {
      return getMe().then((res) => {
        if (res.ok) {
          setUser(res.data);
        }
      });
    }
    setIsGetingUser(true);
  }, []);

  useEffect(() => {}, [user]);

  function Top() {
    const { path } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [path]);

    return null;
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, isGetingUser, setIsGetingUser }}
    >
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <Router>
          <Top />
          <Header />
          <Reat>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/newpost">
                <NewPostPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/posts/:id">
                <PostPage />
              </Route>
              <Route path="/edit/:id">
                <EditPage />
              </Route>
              <Route path="/registered">
                <RegisteredPage />
              </Route>
            </Switch>
            <Footer />
          </Reat>
        </Router>
      </LoadingContext.Provider>
    </AuthContext.Provider>
  );
}
