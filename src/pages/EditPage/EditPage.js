import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { getPost, editPost } from "../../WebAPI";

const EditPageContainer = styled.div`
  padding: 100px 20px 500px 20px;
`;

const EditPageForm = styled.form`
  max-width: 700px;
  margin: 0 auto;
  box-shadow: 0px 5px 8px black;
  border-top: solid 2px black;
  padding: 40px 60px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
`;

const EditBlockTitle = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 6px;
  margin-top: 40px;
  box-sizing: border-box;
`;
const EditBlockContent = styled.textarea`
  display: block;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  margin-top: 20px;
`;

const EditButton = styled.button`
  display: flex;
  align-self: flex-end;
  float: right;
  margin-top: 10px;
`;

const EditError = styled.div`
  color: red;
`;

export default function EditPage() {
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editError, setEditError] = useState("");
  const { id } = useParams();
  const history = useHistory();

  const handleEditSubmit = (e) => {
    if (editTitle === "" && editContent === "") {
      e.preventDefault();
      setEditError("標題或內容不得為空");
      return;
    }
    e.preventDefault();
    editPost(editTitle, editContent, id).then((res) => {
      history.push(`/posts/${id}`);
    });
  };

  useEffect(() => {
    getPost(id).then((post) => {
      setEditTitle(post[0].title);
      setEditContent(post[0].body);
    });
  }, [id]);

  return (
    <EditPageContainer>
      <EditPageForm onSubmit={handleEditSubmit}>
        <EditBlockTitle
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <EditBlockContent
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows={14}
        />
        <EditError>{editError && editError}</EditError>
        <EditButton>編輯文章</EditButton>
      </EditPageForm>
    </EditPageContainer>
  );
}
