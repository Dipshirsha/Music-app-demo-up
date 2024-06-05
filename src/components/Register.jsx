import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, txtDB } from "./config/firebase.config";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Register() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      console.log(email);
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(txtDB, "Users", user.uid), {
          email: user.email,
          name: name,
          photo: "",
          playlist: [],
        });
      }
      history("/");
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
        color: "black",     });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-500">OR</p>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login Page
          </Link>
        </div>
      </div>
    </div>
  );
}
