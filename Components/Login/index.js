import React, { useState } from "react";
import styles from "./login.module.scss";
import { Button, Input } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initFirebase } from "../../firebase.config";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // Initialize Firebase on the page
  const app = initFirebase();
  const auth = getAuth();

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("logged in,", user);
        router.push("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="container">
      <div className={`${styles.login_container} row`}>
        <div className={`${styles.form_box} border`}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div class="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div> */}
          <div className={styles.button_div}>
            <Button className={styles.button_login} onClick={loginUser}>
              Log In
            </Button>
          </div>
        </div>
        {/* <div className={`${styles.social_logins} mt-3`}>
          <div>Continue with</div>
          <div className={`${styles.icons} mt-2`}>
            <div className={styles.google}>
              <GoogleOutlined />
            </div>
            <div className={styles.facebook}>
              <FacebookOutlined />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
