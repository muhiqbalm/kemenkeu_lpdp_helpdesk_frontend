import React, { useState } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="bg-white h-[5vh] w-full flex items-center justify-between px-20">
        <div className="space-x-14 flex text-hitam font-semibold">
          <a href="/dashboard" className="hover:text-merah">
            Dashboard
          </a>
          <a href="/dashboard" className="hover:text-merah">
            List Pertanyaan
          </a>
          <a href="/create-question" className="hover:text-merah">
            Tambah Pertanyaan
          </a>
        </div>
        <button className="bg-white border border-merah rounded-md px-5 py-1 font-semibold text-merah hover:bg-merah hover:text-white">
          Logout
        </button>
      </div>
    </>
  );
}
