import { Button } from "antd";
import React, { useState, useEffect } from "react";
import styles from "./editposts.module.scss";
import { useRouter } from "next/router";
import { db } from "../../firebase.config";
import { doc, updateDoc } from "firebase/firestore";

const EditPost = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const router = useRouter();
  const id = router.query.id;
  const prevTitle = router.query.title;
  const prevDescription = router.query.desc;
  console.log(router);

  const updatePost = () => {
    console.log(id);
    const document = doc(db, "users", id);
    updateDoc(document, {
      title: newTitle,
      description: newDescription,
    }).then((res) => {
      alert("Post updated successfully !!");
      router.push("/");
    });
  };

  return (
    <div className={`${styles.main_container} container border`}>
      <div className="mt-4">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            // value={prevTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Post Description
          </label>
          <textarea
            className={`${styles.text_area} form-control`}
            id="floatingTextarea2"
            // value={prevDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="text-end">
          <Button className={`${styles.button}`} onClick={updatePost}>
            Edit Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
