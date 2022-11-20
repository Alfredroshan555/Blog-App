import React, { useState, useEffect } from "react";
import styles from "./signup.module.scss";
import { Button, Input,notification } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { initFirebase } from "../../firebase.config";
import { useRouter } from "next/router";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const router = useRouter();

  // Initialize Firebase on the page
  // const app = initFirebase();
  // Initialize Auth
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();

  const createUser = (e) => {
    // e.preventDefault();
    let userData = {
      email: email,
      username: username,
      password: password,
    };

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log("userdata", user);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    if (password !== confirmPassword) {
      openNotification('password')
    }
    if (
      email === "" ||
      password === "" ||
      username === "" ||
      confirmPassword === ""
    ) {
      // alert("enter the fields");
      openNotification()
    }
  };

  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const signUpWithFacebook = () => {
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // console.log(user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  const openNotification = (val) => {
   
    if (val === "password") {
      api.open({
        message: 'Alert',
        description:"Passwords are not matching" 
      
      });
    }else{
      api.open({
        message: 'Alert',
        description:"Please enter all the fields" 
      
      });
    }
  };

  return (
    <div className="container">
       {contextHolder}
      {/* <Button onClick={openNotification}>Click</Button> */}
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
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Create User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setUsername(e.target.value)}
            />
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
          <div class="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <Button
              className={styles.button_login}
              onClick={(e) => {
                createUser(e);
              }}
            >
              Sign Up
            </Button>
          </div>
          <div className={`${styles.social_logins} mt-3`}>
            <div>Or Continue with</div>
            <div className={`${styles.icons} mt-2`}>
              <div className={styles.google}>
                <GoogleOutlined onClick={signUpWithGoogle} />
              </div>
              <div className={styles.facebook}>
                <FacebookOutlined onClick={signUpWithFacebook} />
              </div>
            </div>
          </div>
          <div
            className={`${styles.home} mt-3`}
            onClick={() => router.push("/")}
          >
            Go to Home
          </div>
        </div>
      </div>
    </div>
  );
}
