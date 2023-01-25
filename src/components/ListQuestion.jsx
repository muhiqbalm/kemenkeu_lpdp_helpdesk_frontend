import { React, useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import UpdateQuestion from "../pages/UpdateQuestion";
import DeleteModal from "./DeleteModal";

export default function ListQuestion(props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [data, setData] = useState([]);

  function getData() {
    axios.get(`http://localhost:5000/question/${props.id}`).then((response) => {
      setData(response.data.response);
    });
    console.log(data);
  }

  function deleteData() {
    try {
      axios
        .delete(`http://localhost:5000/question/${props.id}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "x-access-token",
            "x-auth-token": token,
          },
        })
        .then((res) => {
          if (res.status < 400) {
            toast.success("Data pertanyaan berhasil dihapus!");
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.message);
        });
      getData();
    } catch (error) {
      console.log(error);
    }
  }

  const token = atob(Cookies.get("token"));

  useEffect(() => {
    console.log(token);
    getData();
    //deleteData();
    console.log(data);
  }, []);

  return (
    <>
      {isEditOpen ? (
        <UpdateQuestion isEditOpen={setIsEditOpen} item={data} />
      ) : (
        ""
      )}
      {isDeleteOpen ? (
        <DeleteModal isDeleteOpen={setIsDeleteOpen} item={data} />
      ) : (
        ""
      )}
      <div className="grid grid-cols-3">
        <p className="bg-white text-hitam p-5 text-justify border border-biru-tua">
          {data.pertanyaan}
        </p>
        <p className="bg-white text-hitam p-5 text-justify border border-biru-tua">
          {data.jawaban}
        </p>
        <div className="flex justify-center items-center gap-x-3 bg-white border border-biru-tua">
          <button
            onClick={() => setIsEditOpen(true)}
            className="inline-flex bg-biru-tua items-center px-5 py-1 text-white rounded-md hover:bg-biru-muda"
          >
            <FaEdit className="mr-[7px]" />
            Edit
          </button>
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="inline-flex bg-red-700 items-center px-3 py-1 text-white rounded-md hover:bg-red-500"
          >
            <FaTrash className="mr-[7px]" />
            Hapus
          </button>
        </div>
      </div>
    </>
  );
}
