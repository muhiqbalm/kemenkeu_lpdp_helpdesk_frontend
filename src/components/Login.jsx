import { React, useState, useEffect } from "react";
import loginImg from "../assets/Login.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setText("LOGIN");
  }, []);

  const onSubmit = async () => {
    if (username === "" || password === "") {
      toast.error("Username dan password akun wajib diisi!");
      console.log("Username dan password akun wajib diisi!");
    } else {
      setText("Loading...");
      fetch("https://ss-kemenkeuprime-backend.vercel.app/agent/login", {
        Method: "POST",
        Headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        Body: {
          username: username,
          password: password,
        },
        Cache: "default",
      })
        //   axios
        //     .post("https://ss-kemenkeuprime-backend.vercel.app/agent/login", {
        //       username: username,
        //       password: password,
        //     })
        .then((res) => {
          if (res.status < 400) {
            toast.success("Login sukses!");
            const { token } = res.data;
            const tokenBase64 = btoa(token);
            Cookies.set("token", tokenBase64, { expires: 1 });
            navigate("/dashboard");
          }
          console.log(res.headers);
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.message);
          setText("LOGIN");
        });
    }
  };

  return (
    <div className="flex">
      <img className="h-screen w-[40vw] object-cover" src={loginImg} alt="" />

      <div className="bg-white w-[60vw] flex justify-center items-center p-48">
        <form className="w-full flex flex-col">
          <p className="text-4xl font-bold mb-2">Selamat Datang di</p>
          <p className="text-4xl font-bold mb-4">
            Smart Script Kemenkeu Prime!
          </p>

          <p className="text-lg text-abu mb-20">Login dengan akun Anda</p>

          <label className="text-lg font-bold mb-2">Username</label>
          <input
            className="border border-abu h-[5vh] w-full px-4 rounded-md shadow-md mb-6"
            placeholder="Masukkan username Anda"
            type="text"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <label className="text-lg font-bold mb-2">Password</label>
          <input
            className="border border-abu h-[5vh] w-full px-4 rounded-md shadow-md mb-20"
            placeholder="Masukkan password Anda"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            className="w-[13vw] py-3 bg-kuning hover:bg-kuning-tua text-white rounded-full text-xl font-bold shadow-lg"
            onClick={onSubmit}
            type="button"
          >
            {text}
          </button>
        </form>
      </div>
    </div>
  );
}
