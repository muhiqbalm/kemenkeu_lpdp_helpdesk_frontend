import {React, useState} from "react";
import loginImg from '../assets/Login.png'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Cookies from "js-cookie";



export default function Login () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = async () => {
    const data = {
      username,
      password,
    };
    if (!username || !password) {
      toast.error("Username dan password wajib diisi!");
    } else {
      const response = await axios.post("http://localhost:5000/agent/login", data);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success("Login sukses!");
        const { token } = response.data;
        const tokenBase64 = btoa(token);
        Cookies.set("token", tokenBase64, { expires: 1 });
        navigate("/");
      }
    }
  };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className="hidden sm:block">
                <img className= 'h-screen w-full object-cover' src={loginImg} alt="" />
            </div>

            <div className='bg-white flex flex-col justify-center items-center'>
                <form className='max-w-[600px] w-full mx-auto p-4'>
                    <h2 className='text-4xl font-bold text-center py-6 font-montserrat'>Selamat Datang di Pusat Bantuan LPDP!</h2>
                    <div className='text-center text-gray font-montserrat'>
                        <p>Login dengan akun Anda</p>
                    </div>
                    <div className='flex flex-col py-2 font-montserrat'>
                        <label className="font-bold">Username</label>
                        <input className='border p-2 rounded-lg' 
                            placeholder='Masukkan username Anda' 
                            type="text" 
                            required 
                            value={username}
                            onChange={(event)=>setUsername(event.target.value)}/>
                    </div>
                    <div className='flex flex-col py-2 font-montserrat'>
                        <label className="font-bold">Password</label>
                        <input className='border p-2 rounded-lg'
                            placeholder= 'Masukkan password Anda' 
                            type="password" 
                            required
                            value={password}
                            onChange={(event)=>setPassword(event.target.value)}/>
                    </div>
                    <button className='w-2/5 my-5 py-2 bg-maroon hover:bg-darkred text-white rounded-full font-montserrat font-bold' 
                            onClick={onSubmit} type='button'> Login </button>
                </form> 
            </div>
        </div>
    )
}
    