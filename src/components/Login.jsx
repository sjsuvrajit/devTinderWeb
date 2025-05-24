/* eslint-disable no-unused-vars */
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data);
      console.log(err);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data);
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          {!isLogin && (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-gray-800">First Name: </span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs text-white"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-gray-800">Last Name: </span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs text-white"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </label>
            </>
          )}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-gray-800">Email: </span>
            </div>
            <input
              type="text"
              value={email}
              className="input input-bordered w-full max-w-xs text-white"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text text-gray-800">Password</span>
            </div>
            <input
              type="password"
              value={password}
              className="input input-bordered w-full max-w-xs text-white"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <p className="text-red-900">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="m-auto py-2 cursor-pointer"
            onClick={() => setIsLogin((value) => !value)}
          >
            {isLogin ? "New User? Sign Up Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
