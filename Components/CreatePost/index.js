import { Button } from "antd";
import React, { useState, useEffect } from "react";
import styles from "./createposts.module.scss";
import { getFirestore } from "firebase/firestore";
import { db } from "../../firebase.config";
// import { async } from "@firebase/util";
import { collection, addDoc, setDoc, doc, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  const router = useRouter();
  const auth = getAuth();

  console.log("if", doc.id);

  const addPost = async () => {
    console.log(title);
    console.log(description);
    try {
      const docRef = await addDoc(collection(db, "users"), {
        title: title,
        description: description,
      });

      // const dbRef = doc(db, "users");
      // const data = await setDoc(dbRef, {
      //   title: title,
      //   description: description,
      // });
      // console.log("Document written with ID: ", data);
      alert("Post created successfully!!");
      setTitle("");
      setDescription("");
      router.push("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className={`${styles.main_container} container border`}>
      <div className="mt-4">
        <h3>Create A New Post</h3>
        <div className="mb-3 mt-3">
          <label for="exampleInputEmail1" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            placeholder="Add Post title"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Post Description
          </label>
          <textarea
            className={`${styles.text_area} form-control`}
            placeholder="Add Post description"
            id="floatingTextarea2"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="text-end">
          <Button className={`${styles.button}`} onClick={addPost}>
            Add Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
