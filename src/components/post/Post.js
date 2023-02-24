import React from "react";
import useSWR from "swr";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5050";

const Post = () => {
  const { data: posts, error } = useSWR("/posts", async (url) => {
    const res = await axios.get(url);
    return res.data;
  });
  if (error) return <div>failed to load</div>;
  if (!posts) return <div>loading...</div>;
  return (
    <div className="container text-center ">
      <div className="row">
        {posts.map((post, index) => {
          return (
            <>
              <div className="col">
                <div
                  className="card"
                  style={{ width: "15rem", margin: " 10px 0" }}
                >
                  <img
                    src={`http://localhost:5050/${post.selectedFile.img}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{post.creator}</h5>
                    <p className="card-text">{post.title}</p>
                    <p className="card-text">{post.message}</p>
                    <p className="card-text">{post.tages}</p>
                    <div
                      className="btn btn-primary"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100px",
                      }}
                    >
                      <div>{post.likeCount}</div>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Post;
