import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { BsExclamationCircle } from "react-icons/bs";

export default function DeleteModal(props) {
  const token = atob(Cookies.get("token"));

  function deleteData() {
    try {
      axios
        .delete(
          `https://famous-bear-tiara.cyclic.app/question/${props.item._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Headers": "x-access-token",
              "x-auth-token": token,
            },
          }
        )
        .then((res) => {
          if (res.status < 400) {
            toast.success("Data pertanyaan berhasil dihapus!");
            console.log(res);
            props.isDeleteOpen(false);
          }
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.message);
          props.isDeleteOpen(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="absolute inset-0 flex justify-center">
      <div className="fixed bg-hitam/50 backdrop-blur-sm">
        <button className="w-screen h-screen"></button>
      </div>
      <div className="w-[25vw] h-[45vh] bg-white rounded-2xl p-9 absolute top-8 shadow-lg flex flex-col items-center justify-center">
        <BsExclamationCircle className="text-8xl text-kuning-tua mb-6" />
        <p className="font-bold text-2xl mb-2 text-hitam">Hapus Pertanyaan?</p>
        <p className="text-abu-gelap text-center mb-6">
          Apakah Anda yakin ingin menghapus pertanyaan dan jawaban ini?
          Pertanyaan dan jawaban yang sudah dihapus tidak dapat dimunculkan lagi
        </p>
        <div className="flex space-x-6">
          <button
            className="bg-abu py-1 px-8 text-white font-bold text-lg rounded-full hover:bg-abu-gelap"
            onClick={() => deleteData()}
          >
            HAPUS
          </button>
          <button
            className="bg-white border border-abu py-1 px-8 text-abu font-bold text-lg rounded-full hover:bg-gray-200"
            onClick={() => props.isDeleteOpen(false)}
          >
            BATAL
          </button>
        </div>
      </div>

      {/* <div className="absolute inset-0 z-10 overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="mt-3 sm:flex">
              <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <h4 className="text-lg  text-black font-montserrat font-bold">
                  Hapus Pertanyaan & Jawaban?
                </h4>
                <p className="mt-2 text-[15px] leading-relaxed text-black font-montserrat">
                  Apakah Anda yakin ingin menghapus pertanyaan dan jawaban ini?
                  Pertanyaan dan jawaban yang sudah dihapus tidak dapat
                  dimunculkan lagi
                </p>
                <div className="items-center gap-2 mt-3 sm:flex">
                  <button
                    className="w-full mt-2 p-2.5 flex-1 border text-black rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 font-montserrat"
                    onClick={props.isDeleteOpen(false)}
                  >
                    Urungkan
                  </button>
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none border ring-offset-2 ring-red-600 focus:ring-2 font-montserrat"
                    onClick={() => deleteData()}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
