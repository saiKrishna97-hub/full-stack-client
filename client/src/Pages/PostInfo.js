import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Helpers/AuthContext";

function PostInfo() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:8080/posts/byId/${id}`).then((response) => {
      return setPostObject(response.data);
    });

    axios.get(`http://localhost:8080/comments/${id}`).then((response) => {
      return setComments(response.data);
    });
  });
  const addNewComment = () => {
    axios
      .post(
        "http://localhost:8080/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };
  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:8080/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };
  const deletePost = (id) => {
    axios
      .delete(`http://localhost:8080/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/");
      });
  };
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">
            {postObject.userName}
            {authState.username === postObject.userName && (
              <button
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addNewComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div className="comment" key={key}>
                {comment.commentBody}
                <div>Username: {comment.username}</div>
                <button
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PostInfo;
