import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getPosts, getPostsPage } from "../../WebAPI";
import Banner from "../../components/Banner/Banner";
import { LoadingContext } from "../../contexts";
import { useContext } from "react/cjs/react.development";
import Loading from "../../components/Loading/Loading";

const HomePageContainer = styled.div`
  background: #c1d4d9;
`;

const HomePageWrap = styled.div`
  margin: 0 auto;
  width: 90%;
`;

const HomePageSection = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PostsContainer = styled(Link)`
  width: 300px;
  height: 400px;
  position: relative;
  background-color: #f2cbc2;
  padding: 5px;
  border-radius: 8px;
  margin: 30px;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 5px 5px 15px 0px black;
  }
`;

const PostsImage = styled.div`
  height: 70%;
  width: 100%;
  background-size: cover;
  border-radius: 8px;
`;

const PostsTitle = styled.div`
  font-size: 24px;
  width: 100%;
  color: white;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  margin-top: 10px;
`;

const PostsDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
  position: absolute;
  padding: 10px;
  bottom: 0;
  right: 0;
`;

const HomePagePage = styled.div`
  position: relative;
  height: 200px;
`;

const PageContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  color: white;
`;
const PagePrev = styled.button``;
const PageNext = styled.button``;
const PageStatus = styled.div``;

const HomePageBottom = styled.div`
  background: url("https://i.imgur.com/t6SsRwM.jpg") no-repeat center / cover;
  height: 400px;
  color: white;
  padding-top: 10px;
  position: relative;

  div {
    text-align: center;
  }
`;

function HomePagePosts({ post }) {
  return (
    <PostsContainer to={`/posts/${post.id}`}>
      <PostsImage style={{ backgroundImage: `url(${post.image})` }} />
      <PostsTitle>{post.title}</PostsTitle>
      <PostsDate>{new Date(post.createdAt).toLocaleString()}</PostsDate>
    </PostsContainer>
  );
}

function PageTion({ allPage, page, setPage }) {
  const handleButtonClick = (e) => {
    if (e === "next" && page < allPage) {
      return setPage(page + 1);
    }
    if (e === "prev" && page >= 2) {
      return setPage(page - 1);
    }
    return;
  };
  return (
    <PageContainer>
      <PagePrev onClick={() => handleButtonClick("prev")}>上一頁</PagePrev>
      <PageNext onClick={() => handleButtonClick("next")}>下一頁</PageNext>
      <PageStatus>
        第{page}頁/共{allPage}頁
      </PageStatus>
    </PageContainer>
  );
}

HomePagePosts.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const [isGetingPostPage, setIsGetingPostPage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [allPage, setAllPage] = useState();
  const [page, setPage] = useState(1);
  const limit = 5;
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(true);
    getPosts()
      .then((posts) => {
        setAllPage(Math.ceil(posts.length / limit));
      })
      .then((e) => {
        setIsLoading(false);
      });
  }, [setIsLoading]);
  useEffect(() => {
    setIsLoading(true);
    getPostsPage(page, limit)
      .then((res) => {
        setPosts(res);
        setIsGetingPostPage(true);
      })
      .then((e) => {
        setIsLoading(false);
      });
  }, [page, setIsLoading]);
  return (
    <HomePageContainer>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Banner />
          <HomePageWrap>
            <HomePageSection>
              {posts.map((post) => (
                <HomePagePosts key={post.id} post={post} />
              ))}
            </HomePageSection>
          </HomePageWrap>
          <HomePagePage>
            {isGetingPostPage && (
              <PageTion allPage={allPage} page={page} setPage={setPage} />
            )}
          </HomePagePage>
          <HomePageBottom>
            <div>
              <h1>關於 Cake Garden</h1>
              <h3>一個能分享蛋糕的美好小天地</h3>
            </div>
          </HomePageBottom>
        </>
      )}
    </HomePageContainer>
  );
}
