import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./navbar.module.scss";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initFirebase } from "../../firebase.config";
import { useRouter } from "next/router";
import { LeftSquareTwoTone } from "@ant-design/icons";
import { notification } from "antd";

export default function Navbar() {
  const [user, userPresent] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const router = useRouter();

  const auth = getAuth();
  const app = initFirebase();

  // Logout the user
  const logOut = () => {
    signOut(auth)
      .then((user) => {
        // Sign-out successful.
        console.log("signed out", user);
        router.push("/signup");
        openNotification()
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  // Check if User is authenticated
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // console.log("user", user);
        userPresent(true);
      } else {
        userPresent(false);
      }
    });
  }, []);

    // Notifications alert
    const openNotification = () => {
      api.open({
        message: 'Blog Posts',
        description:"You have logged out" 
      
      });
    };

  return (
    <div className={`${styles.navbar}  container`}>
      {contextHolder}
      <ul className={`${styles.navbar_ul} `}>
        {!user && (
          <>
            <li>
              <Link className="active" href="/login">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li onClick={() => router.push("/create-post")}>
              <a>Create Post</a>
            </li>
            <li onClick={() => logOut()}>
              <a>Sign Out </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
