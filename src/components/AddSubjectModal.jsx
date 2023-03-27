import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function AddSubjectModal(props) {
  const token = atob(Cookies.get("token"));
  const [subject, setSubject] = useState("");

  function postData() {
    if (subject === "") {
      toast.error("Subjek tidak boleh kosong!");
    } else {
      try {
        axios
          .post(
            `https://ss-kemenkeuprime-backend.vercel.app/subject/`,
            { subjek: subject },
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
              toast.success("Subjek berhasil ditambahkan!");
              console.log(res);
              props.addSubject(false);
            }
          })
          .catch((err) => {
            console.log(err.response);
            toast.error(err.response.data.message);
            props.addSubject(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="absolute inset-0 flex justify-center z-10">
      <div className="fixed bg-hitam/50 backdrop-blur-sm">
        <button
          className="w-screen h-screen"
          onClick={() => props.addSubject(false)}
        ></button>
      </div>
      <div className="w-[30vw] h-[32vh] bg-white rounded-2xl absolute top-8 shadow-lg flex flex-col items-center justify-center py-10">
        <p className="font-bold text-2xl mb-10 text-hitam">Tambah Kategori</p>
        <div className="flex flex-col justify-start w-full mb-10 px-10">
          <p className="text-hitam mb-2 font-semibold">
            Subjek Pengguna Layanan
          </p>
          <input
            onChange={(e) => setSubject(e.target.value)}
            className="border w-full border-abu text-md py-2 px-4 rounded-md"
            placeholder="Ketik subjek pengguna layanan yang ingin ditambahkan"
          ></input>
        </div>

        <div className="w-full flex justify-between space-x-8 px-10">
          <button
            className="w-full bg-biru py-2 border border-biru  text-white font-bold text-md rounded-md hover:bg-biru-muda"
            onClick={() => postData()}
          >
            SUBMIT
          </button>
          <button
            className="w-full bg-white border border-abu py-2 text-abu font-bold text-md rounded-md hover:bg-gray-200"
            onClick={() => props.addSubject(false)}
          >
            BATAL
          </button>
        </div>
      </div>
    </div>
  );
}
