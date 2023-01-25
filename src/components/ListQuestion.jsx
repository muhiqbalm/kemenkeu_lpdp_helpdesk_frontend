import { React, useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateQuestion from "../pages/UpdateQuestion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function ListQuestion(props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [data, setData] = useState([]);

  function getData() {
    axios.get(`http://localhost:5000/question/${props.id}`).then((response) => {
      setData(response.data.response);
    });
    console.log(data);
  }

  function deleteData () {
  try {
      axios.delete(`http://localhost:5000/question/${props.id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-auth-token": token,
    },
    }).then((res) => {
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
  };

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
        <UpdateQuestion
          // id={props.id}
          // subjek_id={props.subjek_id}
          // beasiswa_id={props.beasiswa_id}
          // topik_id={props.topik_id}
          // subtopik_id={props.subtopik_id}
          isEditOpen={setIsEditOpen}
          item={data}
        />
      ) : (
        ""
      )}
      <div className="grid grid-cols-3">
        <p className="bg-white text-hitam p-5 text-justify border border-hitam">
          {data.pertanyaan}
        </p>
        <p className="bg-white text-hitam p-5 text-justify border border-hitam">
          {data.jawaban}
        </p>
        <div className="flex justify-center items-center gap-x-3 bg-white border border-hitam">
          <button
            onClick={() => setIsEditOpen(true)}
            className="inline-flex bg-[#11F26B] items-center px-3 py-1 text-black rounded-md"
          >
            <FaEdit />
            Edit
          </button>
          <button 
            onClick={()=> deleteData(props._id, props.pertanyaan)}
            className="inline-flex bg-red-700 items-center px-3 py-1 text-white rounded-md hover:bg-red-500">
            <FaTrash className="mr-[7px]" />
            Hapus
          </button>
        </div>
      </div>
    </>
  );
}
