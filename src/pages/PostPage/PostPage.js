import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { getPost } from "../../WebAPI";
import { AuthContext, LoadingContext } from "../../contexts";
import Loading from "../../components/Loading/Loading";
import { deletePost } from "../../WebAPI";

const PostPageContainer = styled.div`
  padding: 100px 20px 500px 20px;
`;

const PostPageBlock = styled.div`
  max-width: 700px;
  margin: 0 auto;
  box-shadow: 0px 5px 8px black;
  border-top: solid 2px black;
  padding: 40px 60px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
`;

const PostPageTitle = styled.div`
  font-size: 60px;
  word-break: break-all;
`;

const PostPageDate = styled.div`
  color: black;
  margin-left: 10px;
  margin-top: 10px;
`;

const PostPageImage = styled.div`
  max-width: 100%;
  height: 300px;
  background-size: cover;
  border-radius: 8px;
  margin-top: 30px;
`;

const PostPageBody = styled.div`
  font-size: 24px;
  margin-left: 10px;
  margin-top: 20px;
  white-space: pre-wrap;
  word-break: break-all;
`;

const PostPageButtonBlock = styled.div``;
const PostPageEditButton = styled.button`
  margin-top: 20px;
  border: 1px solid transparent;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: green;
  color: white;
  margin-right: 20px;
`;

const PostPageDeleteButton = styled.button`
  margin-top: 20px;
  border: 1px solid transparent;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: green;
  color: white;
`;

function PostPageButton({ user, post, handleEditButton, handleDeleteButton }) {
  return (
    <PostPageButtonBlock>
      {user && post && user.id === post.userId && (
        <PostPageEditButton onClick={() => handleEditButton(post.id)}>
          編輯
        </PostPageEditButton>
      )}
      {user &&
        post &&
        (user.id === post.userId || user.username === "admin") && (
          <PostPageDeleteButton onClick={() => handleDeleteButton(post.id)}>
            刪除
          </PostPageDeleteButton>
        )}
    </PostPageButtonBlock>
  );
}

export default function PostPage() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const history = useHistory();

  useEffect(() => {
    getPost(id)
      .then((post) => {
        setIsLoading(true);
        setPost(post[0]);
      })
      .then((e) => {
        setIsLoading(false);
      });
  }, [id, setIsLoading]);

  const handleEditButton = (postId) => {
    history.push(`/edit/${postId}`);
  };

  const handleDeleteButton = (postId) => {
    deletePost(postId).then((res) => {
      history.push("/");
    });
  };
  return (
    <PostPageContainer>
      {isLoading ? (
        <Loading />
      ) : (
        <PostPageBlock>
          <PostPageTitle>
            {post && post.title}
            <hr />
          </PostPageTitle>
          <PostPageDate>
            時間：{post && new Date(post.createdAt).toLocaleString()}
          </PostPageDate>
          <PostPageImage
            style={{ backgroundImage: `url(${post && post.image})` }}
          ></PostPageImage>
          <PostPageBody>{post && post.body}</PostPageBody>
          <PostPageButton
            user={user}
            post={post}
            handleEditButton={handleEditButton}
            handleDeleteButton={handleDeleteButton}
          />
        </PostPageBlock>
      )}
    </PostPageContainer>
  );
}
