import { React, useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateQuestion from "../pages/UpdateQuestion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ListQuestion(props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [data, setData] = useState([]);

  function getData() {
    axios.get(`http://localhost:5000/question/${props.id}`).then((response) => {
      setData(response.data.response);
    });
    console.log(data);
  }

  useEffect(() => {
    getData();
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
          <button className="inline-flex bg-red-700 items-center px-3 py-1 text-white rounded-md hover:bg-red-500">
            <FaTrash className="mr-[7px]" />
            Hapus
          </button>
        </div>
      </div>
    </>
  );
}
