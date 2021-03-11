import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext";
import Form from "./Form";

function SignUp() {
  const { setAlert } = useAlert();

  const signupUser = (user) => {
    // console.log(user);

    fetch("/sign-up", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setAlert(data.error);
        } else if (data.message) {
          setAlert(data.message);
          setAlert(data.message + " Refresh to continue...");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <motion.div
      variants={signUpVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="container"
    >
      <div className="row">
        <div className="col-md-5 card mx-2 my-5 p-0 mx-md-auto">
          <div className="card-header">
            <h4 className="text-danger text-center">Sign Up</h4>
          </div>
          <div className="card-content p-3">
            <Form type="signup" handleSubmit={signupUser} />
          </div>
          <p className="my-2 text-dark text-center">
            Already have an account?{" "}
            <Link to="/signIn" className="ml-1 text-danger">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default SignUp;

const signUpVariant = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: "0",
    transition: {
      delay: 0.2,
      durations: 1,
      type: "spring",
      stiffness: 100,
    },
  },
  exit: {
    y: "100vh",
    transition: { ease: "easeInOut" },
  },
};