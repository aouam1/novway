import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/userSlice";

export default function Register(props) {
  const status = useSelector((state) => state.user.status);
  const message = useSelector((state) => state.user.message);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const resultAction = await dispatch(registerUser(formData));

    // Check if the registration was successful
    if (registerUser.fulfilled.match(resultAction)) {
      // Wait for 2 seconds, then navigate to the login page
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
      <img className='w-full h-full object-cover' src ="assets/login.jpg"alt="" />
      </div>

      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          onSubmit={handleSubmit}
          className=" font-serif max-w-[400px] w-full mx-auto bg-white p-4 rounded-lg shadow-2xl"
          action=""
        >
          <h2 className="text-4xl font-bold text-center py-6">S'inscrire</h2>
          <div className="flex flex-col py-2">
            <label>Nom</label>
            <input
              className="border  rounded p-2"
              onChange={handleChange}
              value={formData.nom}
              name="nom"
              type="text"
              required
              autoComplete="off"
            />
            <label>Prénom</label>
            <input
              className="border  rounded p-2"
              onChange={handleChange}
              value={formData.prenom}
              name="prenom"
              type="text"
              required
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Email</label>
            <input
              className="border  rounded p-2"
              name="email"
              type="email"
              onChange={handleChange}
              value={formData.email}
              required
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Mot de passe </label>
            <input
              className="border  rounded p-2"
              name="password"
              type="password"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>
          {message && (
            <div className="mt-4 text-center">
              <p
                className={`${
                  status === "succeeded" ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            </div>
          )}
          <button className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white ">
            {status === "loading"
              ? "Loading.." // Replace with your loader component
              : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
}
