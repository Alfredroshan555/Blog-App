import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initFirebase } from "../../firebase.config";
import styles from "./home.module.scss";
import { Button, Skeleton } from "antd";
import { db } from "../../firebase.config";
import { collection, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import axios from "axios";

const HomePage = () => {
  const [user, setUser] = useState(false);
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const auth = getAuth();
  const app = initFirebase();

  const colRef = collection(db, "users");

  // Check if User is authenticated
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // console.log("user", user);
        setUser(true);

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  // Real time data update
  const getFirestoreData = () => {
    // const snapshot = await getDocs(colRef);
    // console.log("snapshot", snapshot);
    // let users = [];
    // snapshot.forEach((doc) => {
    //   users.push({ ...doc.data(), id: doc.id });
    // });
    // console.log("users", users);
    // setData(users);

    onSnapshot(colRef, (snapshot) => {
      let users = [];
      snapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      // console.log("users", users);
      setData(users);
    });
  };

  // Delete Post
  const deletePostData = (id) => {
    // console.log("id", id);
    const data = doc(db, "users", id);
    deleteDoc(data);
  };

  // Update Post
  const updatePost = (id, title, desc) => {
    console.log("update id", id, title, desc);
    router.push({
      pathname: "edit-post",
      query: {
        id: id,
        title: title,
        desc: desc,
      },
    });
    // const doc = doc(db,"users",id)
  };

  useEffect(() => {
    getFirestoreData();
    fetchRandomPosts();
  }, []);

  const fetchRandomPosts = () => {
    let api = "https://jsonplaceholder.typicode.com/posts/";
    setLoading(true);
    axios.get(api).then((res) => {
      // console.log("from api",res.data)
      setPosts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className={`${styles.home_container} container border`}>
        <div className="text-center m-3">
          <h2>Your Posts</h2>
        </div>
        <div>
          {data.map(({ title, description, id }) => {
            return (
              <div className={`${styles.blog} mt-2 border`}>
                <h3 className={`${styles.blog_title} mb-2`}>{title}</h3>
                <p className={`${styles.blog_description} mb-2`}>
                  {description}
                </p>
                <div className={`${styles.blog_options}`}>
                  <div className={`${styles.blog_option_item} mb-2`}>
                    {user && (
                      <>
                        <Button
                          onClick={() => updatePost(id, title, description)}
                          className={styles.button}
                        >
                          Edit Post
                        </Button>
                        <Button
                          onClick={() => deletePostData(id)}
                          className={styles.button}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div>
            <div className="text-center m-3">
              <h2>Latest Posts</h2>
            </div>
            {loading && (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            )}

            {posts.map((i) => {
              return (
                <div className={`${styles.blog} mt-2 border`} key={i.id}>
                  <h3 className={`${styles.blog_title} mb-2`}>{i.title}</h3>
                  <p className={`${styles.blog_description} mb-2`}>{i.body}</p>
                  <div className={`${styles.blog_options}`}>
                    <div className={`${styles.blog_option_item} mb-2`}>
                      {user && (
                        <>
                          {/* <Button
                            onClick={() => updatePost(id, title, description)}
                            className={styles.button}
                          >
                            Edit Post
                          </Button> */}
                          {/* <Button onClick={() => deletePostData(id)}>
                          Delete
                        </Button> */}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
