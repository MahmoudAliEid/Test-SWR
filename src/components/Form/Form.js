import React from "react";
import useSWR, { mutate } from "swr";

import { useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5050";

const Form = () => {
  const { data } = useSWR("/posts", async (url) => {
    const res = await axios.get(url);
    return res.data;
  });

  const [post, setPost] = useState({
    creator: "",
    title: "",
    message: "",
    tages: "",
    selectedFile: { img: [], preview: "" },
  });

  return (
    <div className="container containerForm">
      <form>
        <div className="mb-3">
          <h4 style={{ padding: "10px", color: "#b6b8ba" }}>Create Post</h4>
          <label htmlFor="exampleInputcreator" className="form-label">
            Creator
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputcreator"
            name="creator"
            onChange={(event) =>
              setPost({
                ...post,
                creator: event.target.value,
              })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputTitle" className="form-label">
            Title
          </label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleInputTitle"
            onChange={(event) =>
              setPost({
                ...post,
                title: event.target.value,
              })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputMessage" className="form-label">
            Message
          </label>
          <input
            name="message"
            type="text"
            className="form-control"
            id="exampleInputMessage"
            onChange={(event) =>
              setPost({
                ...post,
                message: event.target.value,
              })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputTages" className="form-label">
            Tages
          </label>
          <input
            name="tages"
            type="text"
            className="form-control"
            id="exampleInputTages"
            onChange={(event) =>
              setPost({
                ...post,
                tages: event.target.value,
              })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Image
          </label>
          <input
            name="img"
            type="file"
            className="form-control"
            id="formFile"
            onChange={(event) => {
              const theImage = {
                img: event.target.files[0],
              };
              setPost({
                ...post,
                selectedFile: theImage,
              });
            }}
          />
        </div>
        <button
          type="submit"
          onClick={async (event) => {
            event.preventDefault();
            const formData = new FormData();
            formData.append("title", post.title);
            formData.append("creator", post.creator);
            formData.append("message", post.message);
            formData.append("tages", post.tages);
            formData.append("img", post.selectedFile.img);
            //here make function of post data to serve
            mutate("posts/create", [...data, formData], false);
            await axios.post("posts/create", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          }}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
