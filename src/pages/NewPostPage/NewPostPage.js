import React, { useState } from "react";
import styled from "styled-components";
import { sendPost } from "../../WebAPI";
import { useHistory } from "react-router-dom";

const NewPostContainer = styled.div`
  padding: 100px 20px 500px 20px;
`;

const NewPostForm = styled.form`
  max-width: 700px;
  margin: 0 auto;
  box-shadow: 0px 5px 8px black;
  border-top: solid 2px black;
  padding: 40px 60px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
`;
const NewPostTitle = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 6px;
  margin-top: 40px;
  box-sizing: border-box;
`;
const NewPostBody = styled.textarea`
  display: block;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  margin-top: 20px;
`;

const NewPostBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const NewPostImage = styled.input`
  padding: 5px;
`;
const SubmitButton = styled.div`
  display: flex;
  align-self: flex-end;
  float: right;

  button {
    padding: 6px 20px;
    border-radius: 8px;
  }
`;

const NewPostError = styled.div`
  color: red;
`;

const NewPostPrivew = styled.div`
  img {
    height: 200px;
    width: 300px;
  }
`;

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newPostError, setNewPostError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const history = useHistory();
  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    if (title === "" && content === "") {
      e.preventDefault();
      setNewPostError("標題或內容不得為空");
      return;
    }
    if (!imageUrl) {
      setImageUrl("https://i.imgur.com/NOb569b.jpg");
    }
    sendPost(title, content, imageUrl)
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        setNewPostError(err.message);
      });
  };
  return (
    <NewPostContainer>
      <NewPostForm onSubmit={handleNewPostSubmit}>
        <NewPostTitle
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <NewPostBody
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={14}
        />
        <NewPostBottom>
          <NewPostImage
            value={imageUrl}
            placeholder="請輸入圖片URL"
            type="text"
            onChange={(e) => setImageUrl(e.target.value)}
          ></NewPostImage>
          <NewPostError>{newPostError && newPostError}</NewPostError>
        </NewPostBottom>
        <NewPostPrivew>
          <img src={imageUrl} alt="預覽封面"></img>
        </NewPostPrivew>
        <SubmitButton>
          <button>送出文章</button>
        </SubmitButton>
      </NewPostForm>
    </NewPostContainer>
  );
}
