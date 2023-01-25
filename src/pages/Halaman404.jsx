import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import img from "../assets/Layer 2.png";
import Navbar from "../components/Navbar";
export default function Halaman404() {
  return (
    <>
      <Navbar />

      <div className="hero container  mx-auto pb-10 py-20 flex justify-center">
        <div className="w-6/12 sm:w-6/12 px-8">
          <img
            src={img}
            alt=""
            class="mx-auto max-w-full h-auto align-middle border-none"
          />
        </div>
        <div className="w-6/12 sm:w-4/12 px-20 space-y-20">
          <p className="text-7xl font-extrabold text-red-700 width: 500px;">
            Halaman <br />
            Tidak Ditemukan
          </p>
          <div className="flex space-x-7">
            <Link to="/Dashboard">
              <button
                type="button"
                className="inline-block px-6 py-3 bg-red-700 text-white font-medium text-xl leading-tight uppercase rounded-full shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Kembali
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
