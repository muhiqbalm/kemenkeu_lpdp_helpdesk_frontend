import React from "react";
import LogoPrime from "../assets/logo-prime.svg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function Navbar(props) {
  const navigate = useNavigate();

  const token = atob(Cookies.get("token"));

  const LogOut = async () => {
    try {
      //const tokenBase64 = btoa(token);
      Cookies.set("token", "", { expires: -1 });
      toast.success("Logout sukses!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white h-[6vh] w-full flex items-center justify-between pl-10 pr-20 shadow-md">
        <div className="flex text-hitam font-semibold items-center">
          <img src={LogoPrime} className="h-[4vh] w-auto mr-6" />
          <button
            onClick={() => navigate("/dashboard")}
            className={`${
              props.dashboard
                ? "text-hitam bg-gray-200 hover:text-biru hover:bg-gray-300/75"
                : "hover:text-biru"
            } px-8 h-[6vh]`}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/list")}
            className={`${
              props.listPertanyaan
                ? "text-hitam bg-gray-200 hover:text-biru hover:bg-gray-300/75"
                : "hover:text-biru"
            } px-8 h-[6vh]`}
          >
            List Pertanyaan
          </button>
          <button
            onClick={() => navigate("/create-question")}
            className={`${
              props.tambahPertanyaan
                ? "text-hitam bg-gray-200 hover:text-biru hover:bg-gray-300/75"
                : "hover:text-biru"
            } px-8 h-[6vh]`}
          >
            Tambah Pertanyaan
          </button>
        </div>
        <button
          onClick={LogOut}
          className="bg-white border border-biru rounded-md px-5 py-1 font-semibold text-biru hover:bg-biru hover:text-white"
        >
          Logout
        </button>
      </div>
    </>
  );
}
