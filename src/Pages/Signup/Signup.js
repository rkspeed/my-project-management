import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./../../Database/Firebase";
import { Alert, Button, FormGroup, Input, Row, Col, Form } from "reactstrap";
import "./../../assets/css/Signup.css";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <div className="auth-wrapper">
      <div className="auth-content">
        <div className="card">
          <div className="card-body text-center">
            <div className="mb-4">
              <i className="feather icon-user-plus auth-icon"></i>
            </div>
            <h3 className="mb-4">Sign up</h3>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
              />
            </div>
            <div className="input-group mb-4">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            <button
              className="btn btn-primary shadow-2 mb-4"
              onClick={register}
            >
              Sign up
            </button>
            <div>
            <p className="mb-0 text-muted">
              Allready have an account? <a href="/Login"> Log in</a>
            </p>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
