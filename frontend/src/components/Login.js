import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

export default function Login() {
  const emailError = useSelector((state) => state.user.emailError);
  const passwordError = useSelector((state) => state.user.passwordError);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
  
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className=" relative hidden sm:block">
        <img className='w-full h-full object-cover' src ="assets/login.jpg"alt="" />
          
        </div>

        <div className="bg-gray-100 flex flex-col justify-center">
          <form
            className=" font-serif max-w-[400px] w-full mx-auto bg-white p-4 rounded-lg shadow-2xl "
            action=""
            onSubmit={(e) => submitHandler(e)}
          >
            <h2 className="text-4xl font-bold text-center py-6">Connexion</h2>
            <div className="flex flex-col py-2">
              <label>Email</label>
              <input
                className="border  rounded p-2"
                name="email"
                type="email"
                value={email} // Add value prop to use state
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />
              {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
            </div>
            <div className="flex flex-col py-2">
              <label>Mot de passe </label>
              <input
                className="border rounded p-2"
                name="password"
                type="password"
                value={password} // Add value prop to use state
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && (
                <p className="text-red-500 mt-2">{passwordError}</p>
              )}
            </div>
            <button className="border rounded  w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white">
              Connexion
            </button>
            <div className="flex justify-between">
             
              <Link to="/Register" className="hover:text-black-400 ">
                Créer un compte{" "}
              </Link>
            </div>
          </form>
        </div>
      </div>

    
  );
}
